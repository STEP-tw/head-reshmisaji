const assert = require("assert");
const { getTopLines } = require("../src/util/utils.js");

describe("getTopLines", function() {
  it("should return an empty array when the number of lines is 0", function() {
    let contents = "a";
    let expectedOutput = [];
    let actualOutput = getTopLines(contents, 0);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array of empty string when the content is an empty string", function() {
    assert.deepEqual(getTopLines("", 2), [""]);
  });

  it("should return an array with 1 elements when the number of lines is 1", function() {
    let contents = "1\n2\n3";

    assert.deepEqual(getTopLines(contents, 1), ["1"]);
  });

  it("should return an array with 2 elements when the number of lines is 2", function() {
    let contents = "1\n2\n3\n4";

    assert.deepEqual(getTopLines(contents, 2), ["1", "2"]);
  });
});
