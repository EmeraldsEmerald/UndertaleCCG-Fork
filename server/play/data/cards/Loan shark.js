const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    origHP: 4,
    origAttack: 4,
    baseKeywords: [],
    geoCost: 5,
    type: "character",
    baseText: [{ type: "plainText", value: "Play: the next card you play costs twice as much. You can go into debt to play it." }],
    imageLink: "",
    rarity: 0,
    factions: [2, 2],
    performSetup: function () {
        this.listenerReceiver.addEventHandler(
            "LoanSharkTriggerPlay",
            (event) => { this.play() },
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            this.listenerEmitter
        )
    },
    modifyCardPlayableListener: null,
    modifyCardGeoCostListener: null,
    modifyCardSoulCostListener: null,
    cardPlayedListener: null,
    play: function () {
        this.modifyCardPlayableListener = this.listenerReceiver.addEventHandler(
            "LoanSharkModifyCardPlayable",
            (event) => {
                if (event.data.card.team == this.team) {
                    return true
                }
                return null
            },
            ListenerReceiver.genEventFunction("modifyCardPlayable"),
            this.game.listenerEmitter
        )
        this.modifyCardGeoCostListener = this.listenerReceiver.addEventHandler(
            "LoanSharkModifyCardGeo",
            (event) => {
                if (event.data.card.team == this.team) {
                    return event.modifiable * 2
                }
                return null
            },
            ListenerReceiver.genEventFunction("modifyCardGeoCost"),
            this.game.listenerEmitter
        )
        this.modifyCardSoulCostListener = this.listenerReceiver.addEventHandler(
            "LoanSharkModifyCardSoul",
            (event) => {
                if (event.data.card.team == this.team) {
                    return event.modifiable * 2
                }
                return null
            },
            ListenerReceiver.genEventFunction("modifyCardSoulCost"),
            this.game.listenerEmitter
        )
        this.cardPlayedListener = this.listenerReceiver.addEventHandler(
            "LoanSharkCardPlayed",
            (event) => {
                if (event.data.card == this) {
                    return
                }
                this.player.listenerEmitter.removeListener(this.cardPlayedListener)
                this.game.listenerEmitter.removeListener(this.modifyCardSoulCostListener)
                this.game.listenerEmitter.removeListener(this.modifyCardPlayableListener)
                this.game.listenerEmitter.removeListener(this.modifyCardGeoCostListener)
                this.modifyCardSoulCostListener = null
                this.modifyCardGeoCostListener = null
                this.modifyCardPlayableListener = null
                this.cardPlayedListener = null
            },
            ListenerReceiver.genEventFunction("allyCardPlayed"),
            this.player.listenerEmitter
        )
    },
}
module.exports={card}