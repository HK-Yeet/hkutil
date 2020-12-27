const Discord = require("discord.js");
module.exports = {
    name: "help",
    category: "utilities",
    execute(bot, message, args) {
        const categories = new Discord.Collection()

        bot.commands.forEach(command => {
            const category = categories.get(command.category)
            if (category) {
                category.set(command.name, command)
            } else {
                categories.set(command.category, new Discord.Collection().set(command.name, command))
            }
        })
        const lines = categories.map((category, name) => `**${name}**: ${category.map(command => `\`${command.name}\``)}`)
        let content = lines.join("\n")
        let helpEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Commands!")
            .setDescription(content)
        message.channel.send(helpEmbed)
    },
};
