const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 3,
    origAttack: 3,
    baseKeywords: [],
    geoCost: 3,
    type: "character",
    //this effect is just to test how the stack works - if it works correctly.
    baseText: [{ type: "plainText", value: "Die: draw a card if there are other ally monsters." }],
    imageLink: "",
    rarity: 0,
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "DreamNailTriggerDie",
            () => { this.onDie() },
            ListenerReceiver.genEventFunction("triggerDieEvents"),
            this.listenerEmitter
        )
    },
    onDie: function () {
        for (let i = 0; i < this.player.slots.length; i++) {
            if (this.player.slots[i] != null) {
                this.player.addDualAnimation("triggerEffect", { card: this.getSendableCopy() }, 700)
                this.player.draw(1)
                return
            }
        }
    },
    factions: [2, 2],
}
module.exports={card}