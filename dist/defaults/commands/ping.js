"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "ping",
    category: "utilities",
    ownerOnly: true,
    aliases: ["pong"],
    clientPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
    callback: async (bot, message, args, hkandler) => {
        const msg = await message.channel.send(`Pinging...`);
        const pingEmbed = {
            title: "🏓 Pong!",
            description: `Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`,
            color: "RED",
        };
        msg.edit({ embed: pingEmbed });
        msg.edit("\u200B");
    },
};
