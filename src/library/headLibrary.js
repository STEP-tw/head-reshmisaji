const getHeading = function(file) {
  return "\n==> " + file + " <==\n";
};

const getErrorMessage = function(file) {
  return "head: " + file + ": No such file or directory";
};

const head = function(userInputs, filterOptions, fs) {
  return userInputs.fileNames.map(function(file) {
    if (fs.existsSync(file)) {
      let heading = getHeading(file);
      let fileContents;
      let contents = fs.readFileSync(file, "utf8");

      fileContents = filterOptions[userInputs.option](
        contents,
        userInputs.count
      );
      if (userInputs.fileNames.length > 1) {
        fileContents = heading + fileContents;
      }
      return fileContents;
    } else {
      return getErrorMessage(file);
    }
  });
};

module.exports = { head, getHeading, getErrorMessage };
