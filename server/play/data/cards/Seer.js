const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 4,
    origAttack: 5,
    baseKeywords: [],
    geoCost: 5,
    type: "character",
    baseText: [{ type: "plainText", value: "Play: Kill a character" },],
    imageLink: "",
    rarity: 3,
    factions: [2, 2],
    requiresTarget: true,
    //targetFunc returns a list of all valid board targets (slots, players).
    //If your card should interact with stuff in hand / discover things, use the look at template instead.
    getValidTargets: function () {
        allySlots = []
        enemySlots = []
        for (let i = 0; i < this.game.players[this.team].slots.length; i++) {
            if (this.game.players[this.team].slots[i] != null) {
                allySlots.push(i)
            }
        }
        for (let i = 0; i < this.game.players[+!this.team].slots.length; i++) {
            if (this.game.players[+!this.team].slots[i] != null) {
                enemySlots.push(i)
            }
        }
        validTargets = {
            allySlots,
            enemySlots,
            allyPlayer: false,
            enemyPlayer: false
        }
        return validTargets
    },
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "SeerTriggerPlay",
            (event) => { this.play(event.data.target) },
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            this.listenerEmitter
        )
    },
    play: function (target) {
        if (target != null) {
            this.player.addAnimation("showTargeted", { targets: this.calcTargets(target) }, 0)
            this.player.addEnemyAnimation("showTargeted", { targets: this.player.flipTargets(this.calcTargets(target)) }, 0)
            this.player.addAnimation("triggerEffect", { card: this.getSendableCopy() }, 700)
            this.player.addEnemyAnimation("triggerEffect", { card: this.getSendableCopy() }, 700)
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