const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 4,
    origAttack: 4,
    baseKeywords: ["Haste"],
    geoCost: 6,
    type: "character",
    baseText: [{ type: "plainText", value: "Play: If the monster in front of this has killed a monster, kill it." }],
    imageLink: "",
    rarity: 0,
    factions: [0, 2],
    //targetFunc returns a list of all valid board targets (slots, players).
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "FuriousVengeflyTriggerPlay",
            (event) => { this.play(event.data.target) },
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            this.listenerEmitter
        )
    },
    play: function () {
        let target = this.enemyPlayer.slots[this.slot]
        let relevantHistory = this.game.parseHistory((item) => { return item.type == "cardDied" && item.card.killerCardID == target.cardID })
        if (relevantHistory.length >= 1) {
            this.player.addAnimation("showTargeted", { targets: this.calcTargets(target) }, 0)
            this.player.addEnemyAnimation("showTargeted", { targets: this.player.flipTargets(this.calcTargets(target)) }, 0)
            this.player.addDualAnimation("triggerEffect", { card: this.getSendableCopy() }, 700)
            target.die(this)
        }
    },
    calcTargets: function (target) {
        return {
            allyPlayer: false, enemyPlayer: false,
            allySlots: target.team == this.team ? [target.slot] : [],
            enemySlots: target.team != this.team ? [target.slot] : [],
        }
    }
}
module.exports={card}