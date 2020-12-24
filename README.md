# HKUtilities
Sicko mode utilities for command, event, and functions.

# Installation

```bash
npm install hkutilities
```

Inital Setup

Inside your main file
```js
const { Client } = require("discord.js");
const HKutil = require("hkutilities");
const config = require("./config.json");
const bot = new Client();
bot.config = config;

new HKutil.HKandler(bot);

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

  console.log(`Logged in as ${bot.user.tag}`)

}
```

Example of a message event

```js
//inside your events directory

module.exports = (bot, message) => {
  const { prefix } = bot;
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  try {
      command.execute(bot, message, args)
  } catch (error) {
      message.channel.send(`There was an error running the command **${command.name}**`)
      console.log(error)
  }
};
```

# Making Commands

This is a simple ping command. Using `ping`, `pong`, and `p` will all run this command.

```js
//inside your command directory
const Discord = require("discord.js")
module.exports = {
  name: "ping",
  aliases: ['pong', "p"], // Optional
  execute(bot, message, args){
    let pingEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Pong!")
      .setDescription(`API Latency: ${bot.ws.ping}ms!`)
     message.channel.send(pingEmbed)
  }
}
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