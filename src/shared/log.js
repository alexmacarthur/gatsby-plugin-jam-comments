const chalk = require("chalk");

module.exports = message => {
  console.log(`${chalk.magenta("JamComments:")} ${message}`);
};
