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
  }
  setEventsDir(eventsDir) {
      const {
          path
      } = require.main;
      const directory = join(path, eventsDir)
      eventHandler(this._bot, directory)
      this._eventsDir = eventsDir
      return
  }
  getEventsDir() {
      return this._eventsDir
  }
  setCommandsDir(commandsDir) {
      const {
          path
      } = require.main;
      const directory = join(path, eventsDir)
      commandHandler(this._bot, directory)
      this._commandsDir = commandsDir
      return
  }
  getCommandsDir() {
      return this._commandsDir
  }
  setFeaturesDir(featuresDir) {
      const {
          path
      } = require.main;
      const directory = join(path, featuresDir)
      commandHandler(this._bot, directory)
      this._featuresDir = featuresDir
      return
  }
  getFeaturesDir() {
      return this._featuresDir
  }
}
module.exports = HKandler;