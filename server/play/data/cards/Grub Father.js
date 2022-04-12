const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 5,
    origAttack: 5,
    baseKeywords: [],
    geoCost: 13,
    type: "character",
    baseText: [{ type: "plainText", value: "Other ally monsters have +1/+1 and Charge." }],
    imageLink: "",
    rarity: 1,
    factions: [2, 2],
    modifyCardAttackListener: null,
    modifyCardHPListener: null,
    modifyCardKeywordListener: null,
    removeAuraListener: null,
    performSetup: function () {

        this.modifyCardHPListener = this.listenerReceiver.addEventHandler(
            "GrubFatherHPListener",
            (event) => {
                if (event.data.card.team == this.team && event.data.card.zone == "board" && event.data.card != this) {
                    return event.modifiable + 1
                }
                return null
            },
            ListenerReceiver.genEventFunction("modifyCardHP"),
            this.game.listenerEmitter
        )
        this.modifyCardAttackListener = this.listenerReceiver.addEventHandler(
            "GrubFatherAttackListener",
            (event) => {
                if (event.data.card.team == this.team && event.data.card.zone == "board" && event.data.card != this) {
                    return event.modifiable + 1
                }
                return null
            },
            ListenerReceiver.genEventFunction("modifyCardAttack"),
            this.game.listenerEmitter
        )
        this.modifyCardKeywordListener = this.listenerReceiver.addEventHandler(
            "GrubFatherKeywordListener",
            (event) => {
                if (event.data.card.team == this.team && event.data.card.zone == "board" && event.data.card != this) {
                    return event.modifiable.concat(["Charge"])
                }
                return null
            },
            ListenerReceiver.genEventFunction("modifyCardKeywords"),
            this.game.listenerEmitter
        )
        this.removeAuraListener = this.listenerReceiver.addEventHandler(
            "GrubFatherRemoveAuras",
            (data) => {
                if (data.newZone != "board") {
                    this.game.listenerEmitter.removeListener(this.removeAuraListener)
                    this.game.listenerEmitter.removeListener(this.modifyCardAttackListener)
                    this.game.listenerEmitter.removeListener(this.modifyCardHPListener)
                    this.game.listenerEmitter.removeListener(this.modifyCardKeywordListener)
                    this.modifyCardKeywordListener = null
                    this.modifyCardHPListener = null
                    this.modifyCardAttackListener = null
                    this.removeAuraListener = null
                }
            },
            ListenerReceiver.genEventFunction("cardZoneChange"),
            this.listenerEmitter,
            true
        )
    },
}
module.exports={card}