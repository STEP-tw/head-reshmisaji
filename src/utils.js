const getTopLines = function(contents, numberOfLines) {
  let data = contents.split("\n");
  return data.slice(0, numberOfLines).join("\n");
};

const getBotttomCharacters = function(contents, numberOfCharacters) {
  let data = contents.split("");
  return data.slice(data.length - Math.max(numberOfCharacters, 0)).join("");
};

const getFirstCharacters = function(contents, numberOfCharacters) {
  let data = contents.split("");
  return data.slice(0, numberOfCharacters).join("");
};

module.exports = { getTopLines, getFirstCharacters, getBotttomCharacters };
