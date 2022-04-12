const Player = require('./Player.js').Player
const ListenerReceiver = require('./ListenerReceiver.js').ListenerReceiver
const ListenerEmitter = require('./ListenerEmitter.js').ListenerEmitter
class Game {
    constructor(gameID, decks, names, deleteFunc) {
        this.effectStack = []
        this._stackClosed = true
        this.players = [new Player(0, this, decks[0], names[0]), new Player(1, this, decks[1], names[1])]
        this.whosTurnNext = 1
        this.whosTurnCurrent = 0
        this.turnNum = 0
        this.listenerEmitter = new ListenerEmitter(this)
        this.started = false
        this._nextCardID = 0
        this.ended = false
        this.gameID = gameID
        this.deleteFunc = deleteFunc
        this.players[0].beginGame()
        this.players[1].beginGame()
        this.stackClosed = false
        this.listenerReceiver = new ListenerReceiver()
        this.listenerReceiver.addEventHandler(
            "gameStoreEvent",
            (event) => {
                switch (event.name) {
                    case "allyCardPlayed":
                        this.history.push({ turn: this.turnNum, player: 0, card: event.data.card.getSendableCopy(), type: "cardPlayed" })
                        break
                    case "allyDied":
                        this.history.push({ turn: this.turnNum, player: 0, card: event.data.card.getSendableCopy(), type: "cardDied" })
                        break
                    default:
                        this.history.push({ turn: this.turnNum, player:0, event })
                        break;
                }
            },
            (data) => {
                return [
                    "allyCardPlayed",
                    "allyDied"
                ].includes(data.name)
            },
            this.players[0].listenerEmitter,
            true
        )
        this.listenerReceiver.addEventHandler(
            "gameStoreEvent",
            (event) => {
                switch (event.name) {
                    case "allyCardPlayed":
                        this.history.push({ turn: this.turnNum, player: 1, card: event.data.card.getSendableCopy(),type:"cardPlayed" })
                        break
                    case "allyDied":
                        this.history.push({ turn: this.turnNum, player: 1, card: event.data.card.getSendableCopy(), type: "cardDied" })
                        break
                    default:
                        this.history.push({ turn: this.turnNum, player: 1, event })
                        break;
                }
            },
            (data) => {
                return [
                    "allyCardPlayed",
                    "allyDied"
                ].includes(data.name)
            },
            this.players[1].listenerEmitter,
            true
        )
        this.listenerReceiver.addEventHandler(
            "gameStoreEvent",
            (data) => { this.history.push({ turn: this.turnNum, event: data }) },
            (data) => { return [].includes(data.name) },
            this.listenerEmitter,
            true
        )
        this.listenerEmitter.emitPassiveEvent({}, "triggerGameStartEvents");
        this.history = []
    }
    get stackClosed() {
        return this._stackClosed
    }
    set stackClosed(value) {
        this._stackClosed = value
        if (value == false) {
            if (this.started) {
                this.players[0].addAnimation("fake", {})
                this.players[1].addAnimation("fake", {})
                this.checkCardsForUpdates()
            }
            this.evalNextStackEntry()
        }
    }
    get nextCardID() {
        this._nextCardID += 1
        return this._nextCardID-1
    }
    parseHistory(validEvent) {
        let events = []
        for (let i = 0; i < this.history.length; i++) {
            if (validEvent(this.history[i])) {
                events.push(this.history[i])
            }
        }
        return events
    }
    checkCardsForUpdates() {
        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < this.players[i].slots.length; j++) {
                if (this.players[i].slots[j] != null) {
                    this.players[i].slots[j].checkUpdates()
                }
            }
            for (let j = 0; j < this.players[i].hand.length; j++) {
                this.players[i].hand[j].checkUpdates()
            }
        }
    }
    sendAnimations() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].sendAnimations()
        }
    }
    addSocket(socket, name) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].name == name) {
                if (this.players[i].webSocket) {
                    this.players[i].webSocket.close()
                    this.players[i].engageWebsocket(socket)
                    this.players[i].sendFullGamestate()
                } else {
                    this.players[i].engageWebsocket(socket)
                }
                break
            }
            socket.added = true
        }
        if (this.players[1].webSocket && this.players[0].webSocket && !this.started) {
            this.started = true
            this.players[0].addDataAnimations()
            this.players[1].addDataAnimations()
            this.players[0].startTurn()
            this.sendAnimations()
        } else {
            return
        }
    }
    checkActive(player) {
        if (player.webSocket.readyState != 1) {
            this.onDisconnect(player)
        }
    }
    onDisconnect(player) {
        if (this.players[+!player.id].webSocket) {
            this.win(+!player.id)
        } else {
            clearInterval(player.pingInterval)
            this.players[0].webSocket = undefined
            this.players[0].deck = []
            this.players[0].hand = []
            this.players[0].animationsToSend = []
        }
    }
    disconnect(player) {
        this.players[player].webSocket.close()
    }
    nextTurn() {
        this.players[this.whosTurnCurrent].endTurn(this)
        this.players[this.whosTurnNext].startTurn(this)
        let save = this.whosTurnNext
        this.whosTurnNext = this.whosTurnCurrent
        this.whosTurnCurrent = save
        this.turnNum+=1
    }
    win(team) {
        //Win code here
        this.ended = true
        this.players[team].addAnimation("win", {}, 1000)
        this.players[team].animationsLocked = true
        this.players[+!team].addAnimation("lose", {}, 1000)
        this.players[+!team].animationsLocked = true
        this.sendAnimations()
        this.players[0].webSocket.close()
        this.players[1].webSocket.close()
        this.deleteFunc(this.gameID)
    }
    addToStack(func,desc) {
        if (!this.stackClosed) {
            console.log("Executing: "+desc)
            this.stackClosed = true
            if (!func()) {
                this.stackClosed = false
            }
        } else {
            console.log("Stack closed. Adding to stack. "+desc)
            this.effectStack.push(func)
        }
    }
    evalNextStackEntry() {
        if (this.effectStack.length == 0) {
            return
        }
        this.stackClosed = true
        if (!this.effectStack[this.effectStack.length - 1]()) {
            this.effectStack.splice(this.effectStack.length - 1, 1)
            this.stackClosed = false
        } else {
            this.effectStack.splice(this.effectStack.length - 1, 1)
        }
    }
}
module.exports = { Game }
