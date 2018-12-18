const getHeading = function(file) {
  return "\n==> " + file + " <==\n";
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
      return "head: " + file + ": No such file or directory";
    }
  });
};

module.exports = { head, getHeading };
