class Listener {
    constructor(func,isProperEvent,skipStack,name) {
        //Handlers must be named.
        this.func = func
        this.isProperEvent = isProperEvent
        this.skipStack = skipStack
        this.name=name
    }
    handleEvent(eventData) {
        return this.func(eventData)
    }
}
module.exports = { Listener }
