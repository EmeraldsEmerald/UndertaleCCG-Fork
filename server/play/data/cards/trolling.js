const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card = {
    geoCost: 0,
    soulCost: 0,
    type: "spell",
    baseText: [{ type: "plainText", value: "Game start: draw this. When played: Set your geo and soul to 1000. Add " },
    { type: "cardName", name: "Vengeful Spirit", value: "Vengeful Spirit" },
    { type: "plainText", value: " to your hand." },
    ],
    imageLink: "",
    rarity: 0,
    factions: [2, 2],
    requiresTarget: false,
    triggerEffect: function () {
        this.game.players[this.team].geo = 1000
        this.game.players[this.team].soul = 1000
        this.game.players[this.team].conjureNewCard("Vengeful Spirit")
    },
    onCardCreation: function () {
        this.listenerReceiver.addEventHandler(
            "TrollingGameStart",
            () => {
                //if we've been drawn already, skip.
                if (this.zone != "deck") {
                    return
                }
                //remove ourselves from deck and add to the top
                this.game.players[this.team].deck.splice(this.game.players[this.team].deck.indexOf(this), 1)
                this.game.players[this.team].deck.splice(0, 0, this)
                //draw a card.
                this.game.players[this.team].draw(1)
            },
            ListenerReceiver.genEventFunction("triggerGameStartEvents"),
            this.game.listenerEmitter
        )
    },
    calcTargets: () => { return null },
}
module.exports = { card }