const ListenerReceiver = require('../../classes/ListenerReceiver.js').ListenerReceiver
card={
    //How much HP does the card have?
    origHP: 5,
    //How much Attack?
    origAttack: 5,
    //What keywords?
    baseKeywords: [],
    //How much soul does it cost?
    //soulCost: 7,
    //How much does it cost?
    geoCost: 5,
    //Is it a character or a spell?
    type: "character",
    //What is its text?
    //baseText is an array of text components.
    //These are type baseText for displaying text normally, and type cardName for text that should show a card on hover.
    baseText: [{ type: "plainText", value: "This text will show " },
    { type: "cardName", name: "Demo Card", value: "Demo Card" },
    { type: "plainText", value: " when you hover over it." }],
    //Where is the image for this card found?
    imageLink: "",
    //What rarity is this card? -1 means token so it can't be added to decks.
    rarity: -1,
    //What are the factions of this card?
    //0 = faction0, 1 = faction1, 2 = either
    factions: [2, 2],
    //And now, the most important part of any card: The body of it.
    //Anything your card does will be setup using this function, even if the main code is done elsewhere.
    //This is where your card should register any listeners it needs: onMagic, onMonsterDie, literally everything.
    performSetup: function () {

        this.listenerReceiver.addEventHandler(
            //the name of your event handler.
            //eventhandler name
            //All event handlers have unique names, so I recommened a format of CardName EffectDesc to keep them unique
            "DemoCardTriggerPlay",
            //this.play is a dummy function defined later to keep performSetup from being cluttered. 
            //This says to run it when our event is triggered
            //"this" normally refers to the listener calling it. By wrapping it in an arrow function we can use this to refer to the card.
            () => { this.play },
            //a function that determines if the event is relevant.
            //Here we aren't doing anything fancy so we can just use the inbuilt function to generate it.
            ListenerReceiver.genEventFunction("triggerPlayEvents"),
            //And finally, where should we listen for this?
            //Here we just want to listen to our own emitter.
            this.listenerEmitter
        )
        //The end result of that is to attatch a listener so that when this cards ListenerEmitter emits a "triggerPlayEvents",
        //we call this.play
    },
    play: function () {
        //multiply geo by 4.
        this.game.players[this.team].geo *= 4;
    }
}
module.exports={card}