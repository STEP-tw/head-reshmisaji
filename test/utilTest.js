const assert = require("assert");
const { getTopLines, getFirstCharacters } = require("../src/utils.js");

describe("getTopLines", function() {
  it("should return an empty array when the number of lines is 0", function() {
    let contents = "a";
    let expectedOutput = "";
    let actualOutput = getTopLines(contents, 0);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an empty string when the content is an empty string", function() {
    assert.deepEqual(getTopLines("", 2), "");
  });

  it("should return a string with 1 elements when the number of lines is 1", function() {
    let contents = "1\n2\n3";
    assert.deepEqual(getTopLines(contents, 1), "1");
  });

  it("should return a stringa with 2 elements when the number of lines is 2", function() {
    let contents = "1\n2\n3\n4";
    assert.deepEqual(getTopLines(contents, 2), "1\n2");
  });
});

describe("getFirstCharacters", function() {
  it("should return empty string when contents is an empty string", function() {
    let contents = "";
    assert.deepEqual(getFirstCharacters(contents, 1), "");
  });

  it("should return an empty string when the number of characters is 0", function() {
    let contents = "a";
    assert.deepEqual(getFirstCharacters(contents, 0), "");
  });

  it("should return a string with 1 element when the number of characters is 1", function() {
    let contents = "ab";
    assert.deepEqual(getFirstCharacters(contents, 1), "a");
  });

  it("should return a string with 2 elements when the number of characters is 3 and the conten has a length of 2 only", function() {
    let contents = "ab";
    assert.deepEqual(getFirstCharacters(contents, 3), "ab");
  });
});
