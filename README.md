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

new HKutil.HKandler(bot, "commands", "events")
  .setPrefix(config.prefix) //set a prefix; ! is default
  .setFeatures("features"); //more about it below!
/*
optional: pass in your commands and events directory so that the handler will know where to which folders to go to
it is defaulted to "commands" and "events
*/

bot.login(config.token);
```

Inside config.json

```json
{
  "prefix": "!",
  "token": "Your bot token"
}
```

# Making Events

By default, there is a ready and message event. The message event is quite limitting, but I hopefully going to add a bunch more features into the message handler.

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
const config = require("../config.json");
module.exports = (bot, message) => {
  const { prefix } = config;
  /*
  let's use the cannon filter to check if message is from a bot or the message is in dm's
  filter takes 1 paramter; message
  */
  if (HKutil.filter(message)) return;
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
    HKutil.errorEmbed(message.channel, error);
  }
};
```

# Making Commands

There are currently two default commands, ping, and help. But this is an example on how you'd make a command.

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

# Features

Features are a cool feature that Worn Off Keys made. They are side functions, that run along side your bot. Instead of putting them in the main event files.

Example for a suggestions channel:

```js
const HKutil = require("hkutilities");
module.exports = (bot) => {

  bot.on("message", message => {

    if(HKutil.filter(message)) return
    if(message.channel.name == "suggestions"){
      message.react("✅");
      message.react("❌");
    }

  })

}
```
# Final Code

With all that done, your treefile should look somthing similar to this.

```

HKBot/
┣ commands/
┃ ┗ ping.js
┣ features/
┃ ┗ suggestions.js
┣ events/
┃ ┣ message.js
┃ ┗ ready.js
┣ config.json
┣ index.js
┗ package.json

```

```
