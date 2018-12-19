const { getTopLines, getFirstCharacters } = require("../util/utils.js");
const getHeading = function(file) {
  return "==> " + file + " <==\n";
};

const getErrorMessage = function(file) {
  return "head: " + file + ": No such file or directory";
};

const addHeading = function(fileNames, fileContents, heading) {
  if (fileNames.length > 1) {
    fileContents = heading + fileContents;
  }
  return fileContents;
};

const getContents = function(file, userInputs, fs) {
  let filterOptions = { c: getFirstCharacters, n: getTopLines };
  let heading = getHeading(file);
  let contents = fs.readFileSync(file, "utf8");
  let fileContents = filterOptions[userInputs.option](
    contents,
    userInputs.count
  );
  return addHeading(userInputs.fileNames, fileContents, heading);
};

const fileHandler = function(userInputs, fs) {
  return userInputs.fileNames.map(function(file) {
    let result = { true: getContents, false: getErrorMessage };
    let fileStatus = fs.existsSync(file);

    return result[fileStatus](file, userInputs, fs);
  });
};

const head = function(userInputs, fs) {
  return fileHandler(userInputs, fs);
};

module.exports = {
  head,
  getHeading,
  getErrorMessage,
  addHeading,
  getContents,
  fileHandler
};
