const { errorEmbed } = require("hkutilities/src/functions/utils");
const { getBotPrefix, getMentionPrefix } = require("../../functions/getSet");
const { Collection } = require("discord.js");
const humanize = require("humanize-duration");
const cooldowns = new Collection();
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
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;

  if (command.clientPerms) {
    let { clientPerms } = command;
    let hasPermission = true;
    if (typeof clientPerms === "string") {
      clientPerms = [clientPerms];
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
    if (typeof userPerms === "string") {
      userPerms = [userPerms];
    }

    for (const permission of userPerms) {
      if (!message.member.hasPermission(permission)) {
        hasPermission = false;
        return errorEmbed(
          message.channel,
          `You do not have permission to use this command! You need ${command.userPerms.join(', ')
            .toLowerCase()
            .split(/_| /g)
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}!`
        );
      }
      if (hasPermission) {
        continue;
      }
    }
  }

  if (command.minArgs) {
    if (args.length < command.minArgs) {
      return errorEmbed(
        message.channel,
        `Improper Syntax\nUse \`${
          command.usage
            ? `${prefix}${command.name} ${command.usage}`
            : `${prefix}help ${command.name}`
        }\``
      );
    }
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  //checks if user has cooldown
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const remaining = humanize(expirationTime - now, {
        delimiter: " and ",
        maxDecimalPoints: 1,
      });

      return errorEmbed(
        message.channel,
        `Slow down there buddy! Please wait \`${remaining}\` before using ${command.name}`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  if (command.execute) {
    try {
      command.execute(bot, message, args);
    } catch (error) {
      errorEmbed(message.channel, error);
    }
  } else if (command.callback) {
    try {
      command.execute(bot, message, args);
    } catch (error) {
      errorEmbed(message.channel, error);
    }
  } else if (command.run) {
    try {
      command.run(bot, message, args);
    } catch (error) {
      errorEmbed(message.channel, error);
    }
  }
};
