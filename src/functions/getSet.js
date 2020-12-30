var botPrefix = "!"

function setBotPrefix(prefix){
    botPrefix = prefix
}

function getBotPrefix(){
    return botPrefix
}

module.exports = { setBotPrefix, getBotPrefix}