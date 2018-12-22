const {
  getTopLines,
  getFirstCharacters,
  getBotttomCharacters,
  getBottomLines
} = require("./utils.js");

const getHeading = function(file) {
  return "==> " + file + " <==\n";
};

const getErrorMessage = function(file, userInputs) {
  return userInputs.filter + ": " + file + ": No such file or directory";
};

const isGreaterThanOne = function(length) {
  return length > 1;
};

const addHeading = function(fileNames, fileContents, heading) {
  let returnValue = { true: heading + fileContents, false: fileContents };

  return returnValue[isGreaterThanOne(fileNames.length)];
};

const getContents = function(file, userInputs, fs) {
  let heading = getHeading(file);
  let contents = fs.readFileSync(file, "utf8");
  let headFilter = { c: getFirstCharacters, n: getTopLines };
  let tailFilter = { c: getBotttomCharacters, n: getBottomLines };
  let filteredContents = {
    head: function(contents, count) {
      return headFilter[userInputs.option](contents, count);
    },
    tail: function(contents, count) {
      return tailFilter[userInputs.option](contents, count);
    }
  };
  contents = filteredContents[userInputs.filter](contents, userInputs.count);

  return addHeading(userInputs.fileNames, contents, heading);
};

const getResult = function(userInputs, fs) {
  return [
    userInputs.fileNames
      .map(function(file) {
        let result = { true: getContents, false: getErrorMessage };
        let fileStatus = fs.existsSync(file);
        let returnValue = result[fileStatus](file, userInputs, fs);

        return returnValue;
      })
      .join("\n\n")
  ];
};

const isValidOption = function(option) {
  return option == "c" || option == "n";
};

const isValidCount = function(userInputs) {
  let count = userInputs.count;

  let validCount = {
    head: count > 0,
    tail: typeof Math.abs(count) == "number"
  };

  return validCount[userInputs.filter];
};

const getUsage = function(userInputs) {
  let usage = {
    head: "usage: head [-n lines | -c bytes] [file ...]",
    tail: "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  };
  let message = userInputs.filter + ": illegal option -- ";
  message += userInputs.option + "\n";

  message += usage[userInputs.filter];
  return [message];
};

const getIllegalCountError = function(userInputs) {
  let message = {
    n: (lineCountError =
      userInputs.filter + ": illegal line count -- " + userInputs.count),
    c: (byteCountError =
      userInputs.filter + ": illegal byte count -- " + userInputs.count)
  };
  return [message[userInputs.option]];
};

const classifyInput = function(userInputs) {
  if (!isValidOption(userInputs.option)) {
    return "illegalOption";
  }
  if (!isValidCount(userInputs)) {
    return "illegalCount";
  }
  return "validInput";
};

const filter = function(userInputs, fs) {
  let returnValue = {
    validInput: getResult,
    illegalOption: getUsage,
    illegalCount: getIllegalCountError
  };
  return returnValue[classifyInput(userInputs)](userInputs, fs);
};

module.exports = {
  filter,
  getHeading,
  getErrorMessage,
  addHeading,
  getContents,
  getResult,
  isValidCount,
  isValidOption,
  getUsage,
  getIllegalCountError,
  classifyInput,
  isGreaterThanOne
};
