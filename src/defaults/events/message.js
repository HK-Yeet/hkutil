const { errorEmbed } = require("hkutilities/src/functions/utils");

module.exports = (bot, message) => {
  const prefix = bot.prefix;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

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
