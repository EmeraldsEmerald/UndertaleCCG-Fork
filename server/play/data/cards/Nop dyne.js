const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 3,
    origAttack: 5,
    baseKeywords: ["Charge"],
    geoCost: 5,
    type: "character",
    baseText: [{ type: "plainText", value: "Charge. Turn end: if this is in your deck and you have enough geo, spend 5 to summon this from your deck." }],
    imageLink: "",
    rarity: 3,
    factions: [2, 2],
    playFromDeckListener: null,
    onCardCreation: function () {
        this.playFromDeckListener = this.listenerReceiver.addEventHandler(
            "NopDynePlayFromDeck",
            () => {
                if (this.zone != "deck") {
                    return
                }
                let emptySlot = false
                for (let i = 0; i < this.player.slots.length; i++) {
                    if (this.player.slots[i] == null) {
                        emptySlot = true
                        break
                    }
                }
                if (this.player.geo >= 5 && emptySlot) {
                    this.player.addDualAnimation("triggerEffect", { card: this.getSendableCopy() }, 700)
                    this.player.summonCharacter(this)
                    this.player.deck.splice(this.player.deck.indexOf(this), 1)
                    this.player.geo -= 5
                }
            },
            ListenerReceiver.genEventFunction("triggerTurnEndEvents"),
            this.player.listenerEmitter
        )
    },
}
module.exports={card}