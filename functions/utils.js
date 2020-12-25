const Discord = require("discord.js");

function filter(message) {
  if (message.author.bot) {
    return true;
  } else if (!message.guild) {
    return true;
  } else {
    return false;
  }
}

function quickEmbed(channel, content) {
  let embed = new Discord.MessageEmbed().setColor("BLUE").setDescription(`${content}`);
  if (!channel.permissionsFor(channel.guild.me).has(["SEND_MESSAGES", "EMBED_LINKS"])) return;
  return channel.send(embed);
}

function successEmbed(channel, content) {
  let embed = new Discord.MessageEmbed().setColor("GREEN").setDescription(`✅・ ${content}`);
  if (!channel.permissionsFor(channel.guild.me).has(["SEND_MESSAGES", "EMBED_LINKS"])) return;
  return channel.send(embed);
}

function errorEmbed(channel, content) {
  let embed = new Discord.MessageEmbed().setColor("RED").setDescription(`❌・ ${content}`);
  if (!channel.permissionsFor(channel.guild.me).has(["SEND_MESSAGES", "EMBED_LINKS"])) return;
  return channel.send(embed);
}

module.exports = { cannon, quickEmbed, successEmbed, errorEmbed };
