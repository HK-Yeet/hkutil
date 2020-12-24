const fs = require("fs");
const path = require("path");

function eventHandler(bot, dir) {
  if (dir) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const stat = fs.lstatSync(path.join(dir, file));
        if (stat.isDirectory()) {
          eventHandler(bot, path.join(dir, file));
        } else {
          if (file.endsWith(".js")) {
            const event = require(path.join(dir, file));
            const eventName = file.split(".")[0];
            bot.on(eventName, event.bind(null, bot));
            console.log(`HKandler ❯ Loading event ❯ ${eventName}`);
          }
        }
      }
    }
  }
}

function commandHandler(bot, dir) {
  if (dir) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const stat = fs.lstatSync(path.join(dir, file));
        if (stat.isDirectory()) {
          commandHandler(bot, path.join(dir, file));
        } else {
          if (file.endsWith(".js")) {
            const command = require(path.join(dir, file));
            const commandName = file.split(".")[0];
            bot.commands.set(command.name, command);
            console.log(`HKandler ❯ Loading command ❯ ${commandName}`);
          }
        }
      }
    }
  }
}
module.exports = { eventHandler, commandHandler };
