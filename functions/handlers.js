const {existsSync, lstatSync, readdirSync} = require("fs");
const {join} = require("path");
const checkProperties = require("hkutilities/functions/checkProperties");

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
          eventHandler(bot, join(dir, file));
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
}

module.exports = function featureHandler(bot, dir){
    if (existsSync(dir)) {
      const files = readdirSync(dir);
      for (const file of files) {
        const stat = lstatSync(join(dir, file));
        if (stat.isDirectory()) {
          featureHandler(bot, join(dir, file));
        } else {
          if (file.endsWith(".js")) {
            const feature = require(join(dir, file))
            const featureName = file.split(".")[0];
            console.log(`HKandler ❯ Loading feature ❯ ${featureName}`)
            feature(bot)
          }
        }
      }
    }
}
module.exports = { eventHandler, commandHandler, featureHandler };
