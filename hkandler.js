const { Collection } = require("discord.js");
const handlers = require("hkutilities/functions/handlers");

class HKandler {
  _commandsDir = "commands";
  _eventsDir = "events";
  _showWarns = true;
  _something;

  constructor(bot, commandsDir, eventsDir, showWarns = true) {
    if (!bot) {
      throw new Error(
        "HKandler ❯ No Discord.JS Client provided ❯ Need further assistance? Join the discord https://hk-yeet.github.io/hkandler"
      );
    }
    if (showWarns && !commandsDir) {
      console.warn('HKandler ❯ No commands folder prvided, using "commands"');
    }
    if (showWarns && !eventsDir) {
      console.warn('HKandler ❯ No events folder provided, using "events"');
    }
    if (module && require.main) {
      const { path } = require.main;
      if (path) {
        commandsDir = `${path}/${commandsDir || this._commandsDir}`;
        eventsDir = `${path}/${eventsDir || this._eventsDir}`;
      }
    }
    if (bot.commands) {
      throw new Error(
        "HKandler ❯ Please remove the definition of <client>.commands ❯ Need further assistance? Join the discord https://hk-yeet.github.io/hkandler"
      );
    } else {
      bot.commands = new Collection();
    }
    handlers.eventHandler(bot, eventsDir);
    handlers.commandHandler(bot, commandsDir);
  }
}
module.exports = HKandler;
