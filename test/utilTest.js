const assert = require("assert");
const {
  getTopLines,
  getFirstCharacters,
  getBotttomCharacters,
  getBottomLines
} = require("../src/utils.js");

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

describe("getBottomCharacters", function() {
  it("should return the 3 bottom characters when given count as 3", function() {
    let contents = "ab\ncd \n123\nas";
    let numberOfCharacters = "3";
    let actualOutput = getBotttomCharacters(contents, numberOfCharacters);
    let expectedOutput = "\nas";

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return empty string when given count as 0", function() {
    let contents = "ab\ncd \n123\nas";
    let numberOfCharacters = "0";
    let actualOutput = getBotttomCharacters(contents, numberOfCharacters);
    let expectedOutput = "";

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return whole content when given count greater than the length of the contents", function() {
    let contents = "ab\ncd \n123\nas";
    let numberOfCharacters = "22";
    let actualOutput = getBotttomCharacters(contents, numberOfCharacters);
    let expectedOutput = "ab\ncd \n123\nas";

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return bottom 3 characters of the content when given count -3", function() {
    let contents = "ab\ncd \n123\nas";
    let numberOfCharacters = "-3";
    let actualOutput = getBotttomCharacters(contents, numberOfCharacters);
    let expectedOutput = "\nas";

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getBottomLines", function() {
  it("should return 1 line from the bottom when given count as 1", function() {
    let contents = "1\n2\n3\n4\n5\n6\n7\n8";
    let actualOutput = getBottomLines(contents, 1);

    assert.deepEqual(actualOutput, "8");
  });

  it("should return empty when given count as 0", function() {
    let contents = "1\n2\n3\n4\n5\n6\n7\n8";
    let actualOutput = getBottomLines(contents, 0);

    assert.deepEqual(actualOutput, "");
  });
});
