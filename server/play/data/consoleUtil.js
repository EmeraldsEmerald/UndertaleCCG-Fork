
const fs = require('fs')
const cardList = require('./cardListEdited.js').cardList
for (const [key, value] of Object.entries(cardList)) {
    fs.writeFileSync('cards\\' + key + '.js',`const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver\ncard=${value}\nmodule.exports={card}`)
}