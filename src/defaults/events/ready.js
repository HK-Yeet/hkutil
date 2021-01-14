module.exports = (bot, hkandler) => {
  console.log(`Logged in as ${bot.user.tag}`);
  setInterval(function () {
    bot.user.setActivity(
      `${bot.guilds.cache.size} server | ${hkandler.prefix}help`,
      { type: "WATCHING" }
    );
  }, 20000);
};
