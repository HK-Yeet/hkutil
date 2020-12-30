const { errorEmbed } = require("hkutilities/src/functions/utils");
const { getBotPrefix, getMentionPrefix } = require("../../functions/getSet");

module.exports = (bot, message) => {
  let prefix = getBotPrefix();

  const mentionRegexPrefix = RegExp(`^<@!?${bot.user.id}>`);
  if (getMentionPrefix()) {
    prefix = message.content.toLowerCase().match(mentionRegexPrefix)
      ? message.content.match(mentionRegexPrefix)[0]
      : getBotPrefix();
  }

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  if (command.clientPerms) {
    let { clientPerms } = command;
    let hasPermission = true;
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    for (const permission of clientPerms) {
      if (!message.channel.permissionsFor(message.guild.me).has(permission)) {
        hasPermission = false;
        return;
      }
      if (hasPermission) {
        continue;
      }
    }
  }

  if (command.userPerms) {
    let { userPerms } = command;
    let hasPermission = true;
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    for (const permission of userPerms) {
      if (!message.member.hasPermission(permission)) {
        hasPermission = false;
        return errorEmbed(message.channel, "You do not have permission to use this command!");
      }
      if (hasPermission) {
        continue;
      }
    }
  }

  try {
    command.execute(bot, message, args);
  } catch (error) {
    try {
      command.callback(bot, message, args);
    } catch (error) {
      try {
        command.run(bot, message, args);
      } catch (error) {
        errorEmbed(message.channel, error);
      }
    }
  }
};
