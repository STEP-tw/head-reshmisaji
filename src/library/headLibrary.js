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

const getResult = function(userInputs, fs) {
  return userInputs.fileNames.map(function(file) {
    let result = { true: getContents, false: getErrorMessage };
    let fileStatus = fs.existsSync(file);

    return result[fileStatus](file, userInputs, fs);
  });
};

const isValidOption = function(option) {
  return option == "c" || option == "n";
};

const isValidCount = function(count) {
  return count != -0 && count > 0;
};

const getUsage = function(userInputs) {
  let message = "head: illegal option -- ";
  message += userInputs.option + "\n";
  message += "usage: head [-n lines | -c bytes] [file ...]";

  return [message];
};

const getIllegalCountError = function(userInputs) {
  let message = {
    n: (lineCountError = "head: illegal line count -- " + userInputs.count),
    c: (byteCountError = "head: illegal byte count -- " + userInputs.count)
  };
  return [message[userInputs.option]];
};

const classifyInput = function(userInputs) {
  if (!isValidOption(userInputs.option)) {
    return "illegalOption";
  }
  if (!isValidCount(userInputs.count)) {
    return "illegalCount";
  }
  return "validInput";
};

const head = function(userInputs, fs) {
  let returnValue = {
    validInput: getResult,
    illegalOption: getUsage,
    illegalCount: getIllegalCountError
  };
  return returnValue[classifyInput(userInputs)](userInputs, fs);
};

module.exports = {
  head,
  getHeading,
  getErrorMessage,
  addHeading,
  getContents,
  getResult,
  isValidCount,
  isValidOption,
  getUsage,
  getIllegalCountError,
  classifyInput
};
