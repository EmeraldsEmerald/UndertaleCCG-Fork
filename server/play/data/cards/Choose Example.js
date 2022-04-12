const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
const util = require('../../../util.js').util
card={
    origHP: 5,
    origAttack: 5,
    baseKeywords: [],
    geoCost: 5,
    type: "character",
    baseText: [{ type: "plainText", value: "Play: Look at two random cards and choose one to add to your hand." }],
    imageLink: "",
    rarity: 3,
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "ChooseExampleTriggerPlay",
            () => { this.play() },
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            this.listenerEmitter
        )
    },
    play: function () {
        //let cardsToChoose = this.getRandomCards(2, (card) => { return card.rarity >= 0 && card.rarity <= 3 })
        let cardsToChoose = Object.keys(process.mainModule.exports.cardList)
        for (let i = 0; i < cardsToChoose.length; i++) {
            cardsToChoose[i] = { "type": "fake", card: cardsToChoose[i] }
        }
        this.player.waitForChoose(cardsToChoose, (choice, cards) => {
            this.player.conjureNewCard(cards[choice].card)
        })
    },
    factions: [2, 2],
}
module.exports={card}