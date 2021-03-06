const hasOption = function(userInputs) {
  return userInputs[0].length > 1 && userInputs[0].startsWith("-");
};

const getOption = function(userOption) {
  let option = userOption.slice(1, 2);

  if (!isNaN(option)) {
    option = "n";
  }
  return option;
};

const isLengthTwo = function(string) {
  return string.length == 2;
};

const hasOnlyOption = function(option) {
  return isLengthTwo(option) && isNaN(option.slice(1, 2));
};

const getLineCount = function(userInputs) {
  let option = userInputs[0];

  if (hasOnlyOption(option)) {
    return userInputs[1];
  }

  if (isLengthTwo(option)) {
    return option.slice(1);
  }
  if (!isNaN(option.slice(1, 2))) {
    return option.slice(1);
  }
  return option.slice(2);
};

const getFileNames = function(userInputs) {
  if (hasOnlyOption(userInputs[0])) {
    return userInputs.slice(2);
  }
  return userInputs.slice(1);
};

const parseInput = function(userInputs, filter) {
  let parsedInput = {
    option: "n",
    count: "10",
    fileNames: userInputs,
    filter: filter
  };

  if (hasOption(userInputs)) {
    parsedInput.option = getOption(userInputs[0]);
    parsedInput.count = getLineCount(userInputs);
    parsedInput.fileNames = getFileNames(userInputs);
  }

  return parsedInput;
};

module.exports = {
  parseInput,
  hasOption,
  getOption,
  isLengthTwo,
  hasOnlyOption,
  getLineCount,
  getFileNames
};
