global.botPrefix = "!"
const { filter, quickEmbed, successEmbed, errorEmbed } = require("hkutilities/src/functions/utils");
module.exports = {
  //Handler
  HKandler: require("hkutilities/src/classes/hkandler"),
  //Functions
  filter,
  quickEmbed,
  successEmbed,
  errorEmbed,
};
