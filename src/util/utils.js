const getTopLines = function(contents, numberOfLines) {
  let data = contents.split("\n");
  return data.slice(0, numberOfLines);
};

module.exports = { getTopLines };
