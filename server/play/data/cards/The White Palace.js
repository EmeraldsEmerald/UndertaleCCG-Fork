const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    type: "Permanent",
    baseText: [{ type: "plainText", value: "Turn end: Deal 1 damage to each character. If this has killed 7 or more characters, add " },
    { type: "cardName", value: "The Pale King", name: "The Pale King" }, { type: "plainText", value: " to your hand and remove this effect." }],
    imageLink: "",
    geoCost: 10,
    rarity: -3,
    factions: [1, 2],
}
module.exports={card}