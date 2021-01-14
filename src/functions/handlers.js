const { lstatSync, readdirSync, existsSync } = require("fs");
const { join } = require("path");
const {
  checkProperties,
  checkPermissions,
  checkEvent,
} = require("hkutilities/src/functions/validate");
let loadedEvents = [];

function eventHandler(bot, dir) {
  if (!existsSync(dir))
    return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
  const files = readdirSync(dir);
  for (const file of files) {
    const stat = lstatSync(join(dir, file));
    if (stat.isDirectory()) {
      eventHandler(bot, join(dir, file));
    } else {
      if (file.endsWith(".js")) {
        const event = require(join(dir, file));
        const eventName = file.split(".")[0];
        if (checkEvent(eventName)) {
          bot.on(eventName, event.bind(null, bot));
          console.log(`HKUtilities ❯ Loading event ❯ ${eventName}`);
          loadedEvents.push(eventName);
        }
      }
    }
  }
}

function commandHandler(bot, dir) {
  if (!existsSync(dir))
    return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
  const files = readdirSync(dir);
  for (const file of files) {
    const stat = lstatSync(join(dir, file));
    if (stat.isDirectory()) {
      commandHandler(bot, join(dir, file));
    } else {
      if (file.endsWith(".js")) {
        const command = require(join(dir, file));
        const commandName = command.name;
        if (checkProperties(file, command)) {
          if (command.userPerms) checkPermissions(file, command.userPerms);
          if (command.clientPerms) checkPermissions(file, command.clientPerms);

          bot.commands.set(command.name, command);
          console.log(`HKUtilities ❯ Loading command ❯ ${commandName}`);
        }
      }
    }
  }
}

function featureHandler(bot, dir) {
  if (!dir) return;
  if (!existsSync(dir))
    return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
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

function loadStuff(bot, commands, events, hkandler) {
  commandHandler(bot, commands);
  eventHandler(bot, events);
  featureHandler(bot, hkandler.featuresDir);
  loadDefaults(bot, hkandler);
}

function loadDefaults(bot, hkandler) {
  loadDefaultEvents(bot, hkandler);
  loadDefaultCommands(bot);
}

function loadDefaultEvents(bot, hkandler) {
  if (!loadedEvents.includes("message")) {
    const message = require(join(
      __dirname,
      "..",
      "defaults",
      "events",
      "message"
    ));
    console.log("HKUtilities ❯ Loading default event ❯ message");
    message(bot, hkandler);
  }
  if (!loadedEvents.includes("ready")) {
    const ready = require(join(__dirname, "..", "defaults", "events", "ready"));
    console.log("HKUtilities ❯ Loading default event ❯ readt");
    ready(bot, hkandler);
  }
}

function loadDefaultCommands(bot) {
  const dir = join(__dirname, "..", "defaults", "commands");
  const files = readdirSync(dir);
  for (const file of files) {
    const command = require(join(dir, file));
    const commandName = command.name;
    if (
      bot.commands.get(commandName) ||
      bot.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      )
    )
      return;
    console.log(`HKUtilities ❯ Loading default command ❯ ${commandName}`);
    bot.commands.set(command.name, command);
  }
}

module.exports = {
  loadStuff,
  featureHandler,
};
