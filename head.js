const { parseInput } = require("./src/inputHandler/handleInput.js");
const { getTopLines, getFirstCharacters } = require("./src/util/utils.js");
const { readFileSync } = require("fs");

const main = function(args) {
  let userInputs = parseInput(args.slice(2));
  let filterOptions = { c: getFirstCharacters, n: getTopLines };
  let result;

  result = userInputs.fileNames.map(function(file) {
    let heading = "==>" + file + "<==";
    let fileContents;
    let contents = readFileSync(file, "utf8");

    fileContents = filterOptions[userInputs.option](contents, userInputs.count);
    if (userInputs.fileNames.length > 1) {
      fileContents = heading + fileContents;
    }
    return fileContents;
  });
  result.map(x => console.log(x));
};
main(process.argv);
