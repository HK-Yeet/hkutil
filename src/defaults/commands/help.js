const Discord = require("discord.js");
module.exports = {
  name: "help",
  aliases: ["commands"],
  category: "utilities",
  clientPerms: ["EMBED_LINKS", "SEND_MESSAGES"],
  callback: (bot, message, args) => {
    if (!args.length) {
      const categories = new Discord.Collection();

      bot.commands.forEach((command) => {
        const category = categories.get(`${command.category ? command.category : "misc"}`);
        if (category) {
          category.set(command.name, command);
        } else {
          categories.set(
            `${command.category ? command.category : "misc"}`,
            new Discord.Collection().set(command.name, command)
          );
        }
      });
      const lines = categories.map(
        (category, name) => `**${name}:**\n${category.map((command) => `\`${command.name}\``)}`
      );
      let content = lines.join("\n");
      let helpEmbed = new Discord.MessageEmbed().setColor("BLUE").setTitle("Commands!").setDescription(content);

      message.channel.send(helpEmbed);
    } else {
      let commandName = args.join();
      const command =
        bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
      if (!command) return;
      let content = [];
      for (var key in command) {
        var value = command[key];
        if (key == "name") continue;
        if (key == "execute" || key == "run" || key == "callback") continue;
        content.push(`**${key}**: ${value}`);
      }
      let helpEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(command.name)
        .setDescription(content.join("\n"));
      message.channel.send(helpEmbed);
    }
  },
};
