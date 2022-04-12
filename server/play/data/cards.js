const ListenerReceiver = require('../classes/ListenerReceiver.js').ListenerReceiver
const ListenerEmitter = require('../classes/ListenerEmitter.js').ListenerEmitter
const Listener = require('../classes/Listener.js').Listener
const fs = require('fs')
//DO NOT USE ARROW FUNCTIONS
console.log("module loaded")
const cardList = {}
cardNames = fs.readdirSync('server/play/data/cards', 'utf-8')
for (let i = 0; i < cardNames.length; i++) {
    cardName = cardNames[i].slice(0, cardNames[i].length - 3)
    cardList[cardName] = require('./cards/'+cardName+'.js').card
}
//console.log(cardList)
module.exports = {cardList: cardList }
