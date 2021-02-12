import { Client } from "discord.js";
declare type Directories = {
    commandsDir?: string;
    eventsDir?: string;
    featuresDir?: string;
};
declare class HKandler {
    private _commandsDir;
    private _eventsDir;
    private _featuresDir;
    private _prefix;
    private _mentionPreix;
    private _defaultCooldown;
    private _owners;
    private _commands;
    private _helpDescription;
    constructor(bot: Client, directories: Directories);
    get commands(): any;
    setOwners(owners: String[]): this;
    get owners(): String[];
    setPrefix(prefix: string): this;
    get prefix(): string;
    setMentionPrefix(mentionPrefix: boolean): this;
    get mentionPrefix(): boolean;
    setDefaultCooldown(cooldown: number): this;
    get defaultCooldown(): number;
    setHelpDescription(helpDescription: string): this;
    get helpDescription(): any;
}
export = HKandler;
