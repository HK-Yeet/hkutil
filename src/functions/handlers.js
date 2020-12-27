const { existsSync, lstatSync, readdirSync } = require("fs");
const { join } = require("path");
const checkProperties = require("hkutilities/src/functions/checkProperties");

function eventHandler(bot, dir) {
  if (existsSync(dir)) {
    const files = readdirSync(dir);
    for (const file of files) {
      const stat = lstatSync(join(dir, file));
      if (stat.isDirectory()) {
        eventHandler(bot, join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const event = require(join(dir, file));
          const eventName = file.split(".")[0];
          bot.on(eventName, event.bind(null, bot));
          console.log(`HKandler ❯ Loading event ❯ ${eventName}`);
        }
      }
    }
  }
}

function commandHandler(bot, dir) {
  if (existsSync(dir)) {
    const files = readdirSync(dir);
    for (const file of files) {
      const stat = lstatSync(join(dir, file));
      if (stat.isDirectory()) {
        commandHandler(bot, join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const command = require(join(dir, file));
          const commandName = file.split(".")[0];
          if (checkProperties(commandName, command)) {
            bot.commands.set(command.name, command);
            console.log(`HKandler ❯ Loading command ❯ ${commandName}`);
          }
        }
      }
    }
  }
  loadDefaultCommands(bot);
}

function featureHandler(bot, dir) {
  if (existsSync(dir)) {
    const files = readdirSync(dir);
    for (const file of files) {
      const stat = lstatSync(join(dir, file));
      if (stat.isDirectory()) {
        featureHandler(bot, join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const feature = require(join(dir, file));
          const featureName = file.split(".")[0];
          console.log(`HKandler ❯ Loading feature ❯ ${featureName}`);
          feature(bot);
        }
      }
    }
  }
}

function loadDefaultCommands(bot) {
  const dir = join(__dirname, "..", "defaults", "commands");
  const files = readdirSync(dir);
  for (const file of files) {
    const command = require(join(dir, file));
    const commandName = file.split(".")[0];
    if (bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)))
      return;
    console.log(`HKandler ❯ Loading default command ❯ ${commandName}`);
    bot.commands.set(command.name, command);
  }
}
module.exports = { eventHandler, commandHandler, featureHandler };
