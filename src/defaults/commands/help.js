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
        if (command.hidden) return;
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
      let embed = {
        color: "BLUE",
        author: { icon_url: bot.user.displayAvatarURL(), name: "Commands!" },
        description: content,
        footer: `Type ${bot.prefix}help <command> to get more help on a specific command`,
      };

      message.channel.send({ embed: embed });
    } else {
      let commandName = args.join();
      const command =
        bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
      if (!command) return;
      let content = [];
      for (var key in command) {
        var value = command[key];
        if (key == "name") continue;
        if (key == "hidden") continue;
        if (key == "execute" || key == "run" || key == "callback") continue;
        content.push(`**${key}**: ${value}`);
      }
      let embed = {
        color: "BLUE",
        author: { icon_url: bot.user.displayAvatarURL(), name: command.name },
        description: `${content.sort().join("\n") ? content.sort().join("\n") : "No Details Given"}`,
      };
      message.channel.send({ embed: embed });
    }
  },
};
