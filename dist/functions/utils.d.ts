import { Message } from "discord.js";
declare function filter(message: Message): boolean;
declare function quickEmbed(channel: any, content: string): any;
declare function successEmbed(channel: any, content: string): any;
declare function errorEmbed(channel: any, content: string): any;
export { filter, quickEmbed, errorEmbed, successEmbed };
