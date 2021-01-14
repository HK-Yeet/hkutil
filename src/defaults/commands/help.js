const Discord = require("discord.js");
module.exports = {
  name: "help",
  aliases: ["commands"],
  category: "utilities",
  hidden: true,
  clientPerms: ["EMBED_LINKS", "SEND_MESSAGES", "ADD_REACTIONS"],
  callback: async (bot, message, args, hkandler) => {
    if (!args.length) {
      const categories = new Discord.Collection();

      bot.commands.forEach((command) => {
        if (command.hidden && !message.member.hasPermission("ADMINISTRATOR"))
          return;
        if (command.ownerOnly && !hkandler.owners.includes(message.author.id))
          return;
        const category = categories.get(
          `${command.category ? command.category.toLowerCase() : "misc"}`
        );
        if (category) {
          category.set(command.name, command);
        } else {
          categories.set(
            `${command.category ? command.category.toLowerCase() : "misc"}`,
            new Discord.Collection().set(command.name, command)
          );
        }
      });
      let pageTitle = Array.from(categories.map((category, name) => name));
      let pages = Array.from(
        categories.map((category, name) =>
          category.map((command) => `\`${command.name}\``)
        )
      );
      let page = 0;

      const embed = new Discord.MessageEmbed()
        .setAuthor("Commands!")
        .setColor(message.guild.me.displayHexColor)
        .setDescription(
          `Welcome to the help menu. Here, you will find all the commands that I have. Use the reactions to get your way around the menu. If you need help on one specific command, type ${hkandler.prefix}help <command>`
        );

      let msg = await message.channel.send(embed);
      msg.react("◀️");
      msg.react("⏹");
      msg.react("▶️");

      reactionCollector = msg.createReactionCollector(
        (reaction, user) => user.id == message.author.id,
        {
          time: 180000,
        }
      );

      reactionCollector.on("collect", (reaction, user) => {
        let direction = reaction.emoji.name;
        reaction.users.remove(user).catch((err) => {});
        switch (direction) {
          case "◀️":
            if (page > 1) {
              page--;
              embed.setAuthor(
                pageTitle[page - 1].charAt(0).toUpperCase() +
                  pageTitle[page - 1].slice(1),
                bot.user.displayAvatarURL()
              );
              embed.setDescription(pages[page - 1].sort().join(", "));
              embed.setFooter(`Page ${page} of ${pages.length}`);
              embed.setColor(message.guild.me.displayHexColor);
              msg.edit(embed);
            }
            break;
          case "▶️":
            if (page < pages.length) {
              page++;
              embed.setAuthor(
                pageTitle[page - 1].charAt(0).toUpperCase() +
                  pageTitle[page - 1].slice(1),
                bot.user.displayAvatarURL()
              );
              embed.setDescription(pages[page - 1].sort().join(", "));
              embed.setFooter(`Page ${page} of ${pages.length}`);
              embed.setColor(message.guild.me.displayHexColor);
              msg.edit(embed);
            }
            break;
          case "⏹":
            reactionCollector.stop();
            msg.delete();
            message.delete().catch((o_O) => {});
            break;
        }
      });
    } else {
      let commandName = args.join();
      const command =
        bot.commands.get(commandName) ||
        bot.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
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
        color: message.guild.me.displayHexColor,
        author: { icon_url: bot.user.displayAvatarURL(), name: command.name },
        description: `${
          content.sort().join("\n")
            ? content.sort().join("\n")
            : "No Details Given"
        }`,
      };
      message.channel.send({ embed: embed });
    }
  },
};
