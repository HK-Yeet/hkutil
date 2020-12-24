function cannon(message) {
  if (message.author.bot) {
    return true;
  } else if (!message.guild) {
    return true;
  } else {
    return false;
  }
}

module.exports = cannon;
