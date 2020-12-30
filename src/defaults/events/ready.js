module.exports = (bot) => {
    console.log(`Logged in as ${bot.user.tag}`);
    setInterval(function () {
      bot.user.setActivity(`${bot.guilds.cache.size} server | ${botPrefix}help`, { type: "WATCHING" });
    }, 20000);
  };
  