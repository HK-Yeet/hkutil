# HKUtilities

Sicko mode utilities for command, event, and functions.

# Installation

Inital Setup

```bash
npm install hkutilities
```

Inside your main file

```js
const { Client } = require("discord.js");
const HKutil = require("hkutilities");
const config = require("./config.json");
const bot = new Client();
bot.config = config;

new HKutil.HKandler(bot); 
/*
optional: pass in your commands and events directory so that the handler will know where to which folders to go to
it is defaulted to "commands" and "events
*/

bot.login(bot.config.token);
```

Inside config.json

```json
{
  "prefix": "!",
  "token": "Your bot token"
}
```

# Making Events

Example of a ready event

```js
//inside your events directory
module.exports = (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);
};
```

Example of a message event

```js
//inside your events directory

const HKutil = require("hkutilities");
module.exports = (bot, message) => {
  const { prefix } = bot.config;
  /*
  let's use the cannon filter to check if message is from a bot or the message is in dm's
  filter takes 1 paramter; message
  */
  if (HKutil.utils.filter(message)) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  try {
    command.execute(bot, message, args);
  } catch (error) {
    /*
    let's use the error embed function
    errorEmbed takes in 2 parameters; the channel, and the "error"
    */
    HKutil.utils.errorEmbed(message.channel, error);
  }
};
```

# Making Commands

This is a simple ping command. Using `ping`, `pong`, and `p` will all run this command.

```js
//inside your command directory
const Discord = require("discord.js");
module.exports = {
  name: "ping",
  aliases: ["pong", "p"], // Optional
  execute(bot, message, args) {
    let pingEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Pong!")
      .setDescription(`API Latency: ${bot.ws.ping}ms!`);
    message.channel.send(pingEmbed);
  },
};
```

# Final Code

With all that done, your treefile should look somthing similar to this.

```
HKBot/
┣ commands/
┃ ┗ ping.js
┣ events/
┃ ┣ message.js
┃ ┗ ready.js
┣ config.json
┣ index.js
┗ package.json
```
