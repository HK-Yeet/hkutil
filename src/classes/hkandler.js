const {
    Collection
} = require("discord.js");
const {
    commandHandler,
    eventHandler,
    featureHandler
} = require("hkutilities/src/functions/handlers");
const {
    join
} = require("path")
class HKandler {
    _bot;
    _commandsDir = "commands";
    _eventsDir = "events";
    constructor(bot, commandsDir, eventsDir) {
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
                commandHandler(bot, join(path, (commandsDir || this._commandsDir)))
                eventHandler(bot, join(path, (eventsDir || this._eventsDir)))
            }
        }
    }
    setFeaturesDir(featuresDir) {
        this.loadFeatures(featuresDir)
        return this
    }
    getFeaturesDir() {
        return this._featuresDir
    }
    loadFeatures(dir) {
        const {
            path
        } = require.main;
        if (path) {
            featureHandler(this._bot, join(path, dir))
        }
    }
}
module.exports = HKandler;