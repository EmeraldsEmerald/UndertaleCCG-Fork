const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 7,
    origAttack: 0,
    baseKeywords: [],
    geoCost: 5,
    type: "character",
    baseText: [{ type: "plainText", value: "Turn start: summon two " },
    { type: "cardName", value: "Flukelings", name: "Flukeling" },
    { type: "plainText", value: ". Ally " },
    { type: "cardName", value: "Flukelings", name: "Flukeling" },
    { type: "plainText", value: " have +1/+1." }],
    imageLink: "",
    rarity: 2,
    factions: [2, 2],
}
module.exports={card}