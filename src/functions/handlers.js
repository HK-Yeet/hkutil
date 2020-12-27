const {
  lstatSync,
  readdirSync
} = require("fs");
const {
  join
} = require("path");
const checkProperties = require("hkutilities/src/functions/checkProperties");
let loadedEvents = [];
let setEvt = false,
  setCmd = false;

function eventHandler(bot, dir) {
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
              console.log(`HKUtilities ❯ Loading event ❯ ${eventName}`);
              loadedEvents.push(eventName);
              setEvt = true
          }
      }
  }
  loadDefaults(bot);
}

function commandHandler(bot, dir) {
  const files = readdirSync(dir);
  for (const file of files) {
      const stat = lstatSync(join(dir, file));
      if (stat.isDirectory()) {
          commandHandler(bot, join(dir, file));
      } else {
          if (file.endsWith(".js")) {
              const command = require(join(dir, file));
              const commandName = command.name;
              if (checkProperties(commandName, command)) {
                  bot.commands.set(command.name, command);
                  console.log(`HKUtilities ❯ Loading command ❯ ${commandName}`);
              }
          }
      }
  }
  setCmd = true
  loadDefaults(bot);
}

function featureHandler(bot, dir) {
  const files = readdirSync(dir);
  for (const file of files) {
      const stat = lstatSync(join(dir, file));
      if (stat.isDirectory()) {
          featureHandler(bot, join(dir, file));
      } else {
          if (file.endsWith(".js")) {
              const feature = require(join(dir, file));
              const featureName = file.split(".")[0];
              console.log(`HKUtilities ❯ Loading feature ❯ ${featureName}`);
              feature(bot);
          }
      }
  }
}

function loadDefaults(bot) {
  if (!setCmd || !setEvt) return
  loadDefaultEvents(bot)
  loadDefaultCommands(bot)
}

function loadDefaultEvents(bot) {
  const dir = join(__dirname, "..", "defaults", "events");
  const files = readdirSync(dir);
  for (const file of files) {
      const event = require(join(dir, file));
      const eventName = file.split(".")[0];
      if (loadedEvents.includes(eventName)) return;
      console.log(`HKUtilities ❯ Loading default event ❯ ${eventName}`);
      bot.on(eventName, event.bind(null, bot));
  }
}

function loadDefaultCommands(bot) {
  const dir = join(__dirname, "..", "defaults", "commands");
  const files = readdirSync(dir);
  for (const file of files) {
      const command = require(join(dir, file));
      const commandName = command.name;
      if (bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)))
          return;
      console.log(`HKUtilities ❯ Loading default command ❯ ${commandName}`);
      bot.commands.set(command.name, command);
  }
}

module.exports = {
  eventHandler,
  commandHandler,
  featureHandler
};
