var botPrefix = "!";
var mentionPrefix = false;

function setBotPrefix(prefix) {
  botPrefix = prefix;
}

function getBotPrefix() {
  return botPrefix;
}

function setMentionPrefix(mention) {
  mentionPrefix = mention;
}

function getMentionPrefix() {
  return mentionPrefix;
}

module.exports = { setBotPrefix, getBotPrefix, setMentionPrefix, getMentionPrefix };
