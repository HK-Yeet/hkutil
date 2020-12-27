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