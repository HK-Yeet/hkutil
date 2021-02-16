import { Client, Message } from "discord.js";
import HKandler from "../../structures/hkandler";

module.exports = {
  name: "ping",
  category: "utilities",
  aliases: ["pong"],
  clientPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  description: "Returns bot latency",
  callback: async ({ bot, message }: { bot: Client; message: Message }) => {
    const msg = await message.channel.send(`Pinging...`);
    const pingEmbed = {
      title: "🏓 Pong!",
      description: `Edit Latency is ${Math.floor(
        msg.createdTimestamp - message.createdTimestamp
      )}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`,
      color: "RED",
    };

    msg.edit("\u200B", { embed: pingEmbed });
  },
};
