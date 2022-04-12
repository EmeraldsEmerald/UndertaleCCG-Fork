const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 5,
    origAttack: 5,
    baseKeywords: [],
    geoCost: 5,
    type: "character",
    baseText: [{ type: "plainText", value: "Play: Send the entire history of the game through the websocket." }],
    imageLink: "",
    rarity: 3,
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "FalseKnightTriggerPlay",
            () => { this.play() },
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            this.listenerEmitter
        )
    },
    play: function () {
        this.player.webSocket.send(
            JSON.stringify(
                this.game.history
            )
        )
        //this.game.disconnect(this.team);
    },
    factions: [2, 2],
}
module.exports={card}