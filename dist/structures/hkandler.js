"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const path_1 = require("path");
const handlers_1 = __importDefault(require("../functions/handlers"));
class HKandler {
    constructor(bot, directories) {
        this._commandsDir = "commands";
        this._eventsDir = "events";
        this._featuresDir = "features";
        this._prefix = "!";
        this._mentionPreix = false;
        this._defaultCooldown = 3;
        this._owners = [""];
        this._commands = new discord_js_1.Collection();
        this._helpDescription = null;
        if (!bot) {
            throw new Error("HKUtilities ❯ No Discord.JS Client provided ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord");
        }
        if (directories) {
            if (directories.commandsDir) {
                this._commandsDir = directories.commandsDir;
            }
            else {
                console.warn('HKUtilities ❯ No commands directory provided ❯ Using "commands"');
            }
            if (directories.eventsDir) {
                this._eventsDir = directories.eventsDir;
            }
            else {
                console.warn('HKUtilities ❯ No events directory provided ❯ Using "cevents"');
            }
            if (directories.featuresDir) {
                this._featuresDir = directories.featuresDir;
            }
            else {
                console.warn('HKUtilities ❯ No features directory provided ❯ Using "features"');
            }
        }
        else {
            console.warn("HKUtilities ❯ No directories given ❯ Using defaults");
        }
        if (module && require.main) {
            const { path } = require.main;
            if (path) {
                handlers_1.default(bot, path_1.join(path, this._commandsDir), path_1.join(path, this._eventsDir), path_1.join(path, this._featuresDir), this);
            }
        }
    }
    get commands() {
        return this._commands;
    }
    setOwners(owners) {
        this._owners = owners;
        return this;
    }
    get owners() {
        return this._owners;
    }
    setPrefix(prefix) {
        this._prefix = prefix;
        return this;
    }
    get prefix() {
        return this._prefix;
    }
    setMentionPrefix(mentionPrefix) {
        this._mentionPreix = mentionPrefix;
        return this;
    }
    get mentionPrefix() {
        return this._mentionPreix;
    }
    setDefaultCooldown(cooldown) {
        this._defaultCooldown = cooldown;
        return this;
    }
    get defaultCooldown() {
        return this._defaultCooldown;
    }
    setHelpDescription(helpDescription) {
        this._helpDescription = helpDescription;
        return this;
    }
    get helpDescription() {
        return this._helpDescription;
    }
}
module.exports = HKandler;
