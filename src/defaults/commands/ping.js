const Discord = require("discord.js");
module.exports = {
  name: "ping",
  category: "utilities",
  hidden: true,
  aliases: ["pong"], // Optional
  callback: (bot, message, args) =>{
    message.channel.send(`Pinging...`).then((msg) => {
      const pingEmbed = new Discord.MessageEmbed()
          .setTitle("🏓 Pong!")
          .setDescription(
              `Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`
          )
          .setColor("RED");
      msg.edit(pingEmbed);
      msg.edit("\u200B");
  });
  },
};