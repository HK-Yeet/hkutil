const { Collection } = require("discord.js");
const { join } = require("path");
const { loadStuff } = require("hkutilities/src/functions/handlers");
class HKandler {
  _bot;
  _commandsDir = "commands";
  _eventsDir = "events";
  _featuresDir = null;
  _prefix = "!";
  _mentionPrefix = false;
  _defaultCooldown = 3;
  _owners = [""];
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
      console.warn(
        'HKUtilities ❯ No commands folder prvided, using "commands"'
      );
    }
    if (!eventsDir) {
      console.warn('HKUtilities ❯ No events folder provided, using "events"');
    }
    if (module && require.main) {
      const { path } = require.main;
      if (path) {
        loadStuff(
          bot,
          join(path, commandsDir || this._commandsDir),
          join(path, eventsDir || this._eventsDir),
          this
        );
      }
    }
  }
  setFeaturesDir(featuresDir) {
    this._featuresDir = featuresDir;
    return this;
  }
  get featuresDir() {
    return this._featuresDir;
  }
  setPrefix(prefix) {
    this._prefix = prefix;
    return this;
  }
  get prefix() {
    return this._prefix;
  }
  setMentionPrefix(mentionPrefix) {
    this._mentionPrefix = mentionPrefix;
    return this;
  }
  get mentionPrefix() {
    return this._mentionPrefix;
  }
  setDefaultCooldown(cooldown) {
    this._defaultCooldown = cooldown;
    return this;
  }
  get defaultCooldown() {
    return this._defaultCooldown;
  }
  setOwners(owners) {
    this._owners = owners;
    return this;
  }
  get owners() {
    return this._owners;
  }
}
module.exports = HKandler;
