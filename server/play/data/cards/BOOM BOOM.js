const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    geoCost: 4,
    soulCost: 4,
    type: "spell",
    baseText: [{ type: "plainText", value: "Deal 3 damage to each character." }],
    imageLink: "",
    rarity: 0,
    factions: [2, 2],
    requiresTarget: false,
    triggerEffect: function () {
        for (let i = 0; i < 7; i++) {
            if (this.player.slots[i] != null) {
                this.player.slots[i].takeDamage(this, 3)
            }
            if (this.enemyPlayer.slots[i] != null) {
                this.enemyPlayer.slots[i].takeDamage(this, 3)
            }
        }
    },
    calcTargets: function () {
        let highlightedTargets = {
            allyPlayer: false,
            enemyPlayer: false,
            allySlots: [],
            enemySlots: []
        }
        for (let i = 0; i < 7; i++) {
            if (this.player.slots[i] != null) {
                highlightedTargets.allySlots.push(i)
            }
            if (this.enemyPlayer.slots[i] != null) {
                highlightedTargets.enemySlots.push(i)
            }
        }
        return highlightedTargets
    },
}
module.exports={card}