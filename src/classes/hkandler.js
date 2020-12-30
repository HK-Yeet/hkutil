const { Collection } = require("discord.js");
const { loadStuff, featureHandler } = require("hkutilities/src/functions/handlers");
const { join } = require("path");
class HKandler {
  _bot;
  _commandsDir = "commands";
  _eventsDir = "events";
  _prefix = "!";
  constructor(bot, commandsDir, eventsDir) {
    this._bot = bot;
    if (!bot) {
      throw new Error(
        "HKUtilities ❯ No Discord.JS Client provided ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord"
      );
    }
    if (bot.commands) {
      throw new Error(
        "HKUtilities ❯ Please remove the definition of <client>.commands ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord"
      );
    } else {
      bot.commands = new Collection();
    }
    if (!commandsDir) {
      console.warn('HKUtilities ❯ No commands folder prvided, using "commands"');
    }
    if (!eventsDir) {
      console.warn('HKUtilities ❯ No events folder provided, using "events"');
    }
    if (module && require.main) {
      const { path } = require.main;
      if (path) {
        loadStuff(bot, join(path, commandsDir || this._commandsDir), join(path, eventsDir || this._eventsDir));
      }
    }
  }
  setFeaturesDir(featuresDir) {
    this.loadFeatures(featuresDir);
    return this;
  }
  getFeaturesDir() {
    return this._featuresDir;
  }
  setPrefix(prefix) {
    this._prefix = prefix;
    botPrefix = prefix
    return this;
  }
  getPrefix() {
    return this._prefix;
  }
  loadFeatures(dir) {
    const { path } = require.main;
    if (path) {
      featureHandler(this._bot, join(path, dir));
    }
  }
}
module.exports = HKandler;
