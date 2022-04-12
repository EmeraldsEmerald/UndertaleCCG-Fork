const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    geoCost: 4,
    soulCost: 0,
    type: "spell",
    baseText: [{ type: "plainText", value: "Deal 3 dmg to a monster. Gain 4 soul." }],
    imageLink: "",
    rarity: 0,
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
    setTarget: function (target) {
        this.target = target
    },
    calcTargets: function (target) {
        highlightedTargets = {
            allyPlayer: false,
            enemyPlayer: false,
            allySlots: [],
            enemySlots: []
        }
        if (target.webSocket != null) {
            if (target.id == this.team) {
                //allyPlayer 
                highlightedTargets.allyPlayer = true
            } else if (target.id == +!this.team) {
                //enemyPlayer
                highlightedTargets.enemyPlayer = true
            }
        } else {
            if (target.team == this.team) {
                highlightedTargets.allySlots.push(target.slot)
            } else if (target.team == +!this.team) {
                highlightedTargets.enemySlots.push(target.slot)
            }
        }
        return highlightedTargets
    },
    triggerEffect: function (target) {
        this.game.players[this.team].soul += 4;
        target.takeDamage(this, 3)
    },
}
module.exports={card}