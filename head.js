const fs = require("fs");
const { parseInput } = require("./src/inputHandler/handleInput.js");
const { head } = require("./src/library/headLibrary.js");

const main = function(args) {
  let userInputs = parseInput(args.slice(2), "head");
  let result = head(userInputs, fs);

  result.map(x => console.log(x));
};
main(process.argv);
