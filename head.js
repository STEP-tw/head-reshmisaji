const fs = require("fs");
const { parseInput } = require("./src/inputHandler/handleInput.js");
const { getTopLines, getFirstCharacters } = require("./src/util/utils.js");
const { head } = require("./src/library/headLibrary.js");

const main = function(args) {
  let userInputs = parseInput(args.slice(2));
  let filterOptions = { c: getFirstCharacters, n: getTopLines };
  let result = head(userInputs, filterOptions, fs);

  result.map(x => console.log(x));
};
main(process.argv);
