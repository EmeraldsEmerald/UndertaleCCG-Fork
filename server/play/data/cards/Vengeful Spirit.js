const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    geoCost: 0,
    soulCost: 3,
    type: "spell",
    baseText: [{ type: "plainText", value: "Draw a card. Gain 1 geo. Add Vengeful Spirit to your hand." }],
    imageLink: "",
    rarity: 0,
    factions: [2, 2],
    requiresTarget: false,
    triggerEffect: function () {
        this.player.geo += 1
        this.player.draw(1)
        this.player.conjureNewCard("Vengeful Spirit")
    },
    calcTargets: () => { return null },
}
module.exports={card}