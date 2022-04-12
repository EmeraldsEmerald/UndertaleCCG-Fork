const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 5,
    origAttack: 5,
    baseKeywords: [],
    geoCost: 5,
    type: "character",
    baseText: [{ type: "plainText", value: "Play: " },
    { type: "keyword", keyword: "Invoke" },
    { type: "plainText", value: " a " },
    { type: "cardName", value: "Token", name: "Token" },
    { type: "plainText", value: "." }],
    imageLink: "",
    rarity: 3,
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "TokenSourceTriggerPlay",
            () => { this.play() },
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            this.listenerEmitter
        )
    },
    play: function () {
        this.player.invokeCharacter("Token");
    },
    factions: [2, 2],
}
module.exports={card}