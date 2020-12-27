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

module.exports = checkProperties;
