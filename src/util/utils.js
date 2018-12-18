const getTopLines = function(contents, numberOfLines) {
  let data = contents.split("\n");
  return data.slice(0, numberOfLines).join("\n");
};

const getFirstCharacters = function(contents, numberOfCharacters) {
  let data = contents.split("");
  return data.slice(0, numberOfCharacters);
};

module.exports = { getTopLines, getFirstCharacters };
