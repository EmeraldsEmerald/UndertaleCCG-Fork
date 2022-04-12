const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 4,
    origAttack: 4,
    baseKeywords: [],
    geoCost: 5,
    type: "character",
    text: "{{kw:act:Act}}(3): Give the target +2/+2. Play: Heal 4HP to a buffed monster. {{conditional:acted:true:{{conditional:zone:'hand':'This card has already acted.'}}}}",
    imageLink: "",
    hasAct: true,
    actCost:3,
    rarity: -2,
    factions: [0, 2],
    requiresTarget: true,
    onCardCreation: function () {
        this.listenerReceiver.addEventHandler(
            "LostKinTriggerAct",
            (event) => { this.act(event.data.target) },
            ListenerReceiver.genEventFunction("triggerActEvents"),
            this.listenerEmitter
        )
    },
    act: function (target) {
        target.applyBuff({ hp: 2, attack: 2 })
    },
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "LostKinTriggerPlay",
            (event) => { this.play(event.data.target) },
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            this.listenerEmitter
        )
    },
    play: function (target) {
        if (target != null) {
            console.log("targeting something.")
            this.player.addAnimation("showTargeted", { targets: this.calcTargets(target) }, 0)
            this.player.addEnemyAnimation("showTargeted", { targets: this.player.flipTargets(this.calcTargets(target)) }, 0)
            this.player.addAnimation("triggerEffect", { card: this.getSendableCopy() }, 700)
            this.player.addEnemyAnimation("triggerEffect", { card: this.getSendableCopy() }, 700)
            target.heal(4)
        } else {
            console.log("sadge")
        }
    },
    calcTargets: function (target) {
        return {
            allyPlayer: false, enemyPlayer: false,
            allySlots: target.team == this.team ? [target.slot] : [],
            enemySlots: target.team != this.team ? [target.slot] : [],
        }
    },
    getValidTargets: function () {
        let allySlots = []
        let enemySlots = []
        for (let i = 0; i < this.game.players[this.team].slots.length; i++) {
            curSlot = this.game.players[this.team].slots[i]
            if (curSlot != null && (curSlot.curBaseHP != curSlot.origHP || curSlot.curAttack != curSlot.origAttack)) {
                allySlots.push(i)
            }
        }
        for (let i = 0; i < this.game.players[+!this.team].slots.length; i++) {
            curSlot = this.game.players[+!this.team].slots[i]
            if (curSlot != null && (curSlot.curBaseHP != curSlot.origHP || curSlot.curAttack != curSlot.origAttack)) {
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
}
module.exports={card}