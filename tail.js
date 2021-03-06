const fs = require("fs");
const { parseInput } = require("./src/handleInput.js");
const { filter } = require("./src/library.js");

const main = function(args) {
  let userInputs = parseInput(args.slice(2), "tail");
  let result = filter(userInputs, fs);

  result.map(x => console.log(x.trim()));
};
main(process.argv);
