function checkProperties(commandName, command) {
  //check for name
  if (!command.hasOwnProperty("name")) {
    throw new Error(
      `HKUtilities ❯ ${commandName} ❯ Does not have property "name" ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
    );
  }
  if (typeof command.name != "string") {
    throw new Error(
      `HKUtilities ❯ ${commandName} ❯ Name provided isn't a string ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
    );
  }
  //categories
  if (command.hasOwnProperty("category")) {
    if (typeof command.category != "string") {
      throw new Error(
        `HKUtilities ❯ ${commandName} ❯ Category provided isn't a string ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
      );
    }
  }
  //check for aliases
  if (command.hasOwnProperty("aliases")) {
    if (!Array.isArray(command.aliases)) {
      throw new Error(
        `HKUtilities ❯ ${commandName} ❯ Aliases is not an array ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
      );
    }
  }
  //check for function
  if (
    typeof command.run != "function" &&
    typeof command.execute != "function" &&
    typeof command.callback != "function"
  ) {
    throw new Error(
      `HKUtilities ❯ ${commandName} does not have a function ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`
    );
  }
  return true;
}

function checkPermissions(commandName, permissions) {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];
  if (typeof permissions === "string") {
    permissions = [permissions];
  }
  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`
      HKUtilities ❯ ${commandName} ❯ Unknown Permission "${permission}" ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord`);
    }
  }
}

module.exports = { checkProperties, checkPermissions };
