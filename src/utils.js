const getTopLines = function(contents, numberOfLines) {
  let data = contents.split("\n");
  return data.slice(0, numberOfLines).join("\n");
};

const getBotttomCharacters = function(contents, numberOfCharacters) {
  let data = contents.split("");
  return data
    .slice(data.length - Math.min(Math.abs(numberOfCharacters), data.length))
    .join("");
};

const getBottomLines = function(contents, numberOfLines) {
  let data = contents.split("\n");

  return data.slice(data.length - Math.abs(numberOfLines)).join("\n");
};

const getFirstCharacters = function(contents, numberOfCharacters) {
  let data = contents.split("");
  return data.slice(0, numberOfCharacters).join("");
};

module.exports = {
  getTopLines,
  getFirstCharacters,
  getBotttomCharacters,
  getBottomLines
};
