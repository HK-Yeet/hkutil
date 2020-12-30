const { getBotPrefix } = require("../../functions/getSet");

module.exports = (bot) => {
    console.log(`Logged in as ${bot.user.tag}`);
    setInterval(function () {
      bot.user.setActivity(`${bot.guilds.cache.size} server | ${getBotPrefix()}help`, { type: "WATCHING" });
    }, 20000);
  };
  