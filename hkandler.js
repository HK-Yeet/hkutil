const {
    Collection
} = require("discord.js");
const {
    commandHandler,
    eventHandler,
    featureHandler
} = require("hkutilities/functions/handlers");
const {
    join
} = require("path")
class HKandler {
    _bot;
    _commandsDir = "commands";
    _eventsDir = "events";
    _featuresDir = "features"
    _setCmdPath = false
    _setEvtPath = false
    _setFeatPath = false
    constructor(bot) {
        this._bot = bot
        if (!bot) {
            throw new Error(
                "HKandler ❯ No Discord.JS Client provided ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord"
            );
        }
        if (bot.commands) {
            throw new Error(
                "HKandler ❯ Please remove the definition of <client>.commands ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord"
            );
        } else {
            bot.commands = new Collection();
        }
        if (module && require.main) {
            const {
                path
            } = require.main;
            if (path) {
                if(this._setEvtPath && this._setCmdPath && this._setFeatPath){
                    commandHandler(bot, join(path, this.getCommandsDir()))
                    eventHandler(bot, join(path, this.getEventsDir()))
                    featureHandler(bot, join(path, this.getFeaturesDir()))
                }
            }
        }
    }
    setEventsDir(eventsDir) {
        this._setEvtPath = true
        this._eventsDir = eventsDir
        this.init()
        return this
    }
    getEventsDir() {
        return this._eventsDir
    }
    setCommandsDir(commandsDir) {
        this._setCmdPath = true
        this._commandsDir = commandsDir
        this.init()
        return this
    }
    getCommandsDir() {
        return this._commandsDir
    }
    setFeaturesDir(featuresDir) {
        this._setFeatPath = true
        this._featuresDir = featuresDir
        this.init()
        return this
    }
    getFeaturesDir() {
        return this._featuresDir
    }
    init(){
        const {
            path
        } = require.main;
        if (path) {
        if(this._setEvtPath && this._setCmdPath && this._setFeatPath){
            commandHandler(this._bot, join(path, this.getCommandsDir()))
            eventHandler(this._bot, join(path, this.getEventsDir()))
            featureHandler(this._bot, join(path, this.getFeaturesDir()))
        }
    }
    }
}
module.exports = HKandler;