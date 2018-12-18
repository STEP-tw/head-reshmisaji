const assert = require("assert");
const {
  getHeading,
  getErrorMessage,
  addHeading
} = require("../src/library/headLibrary.js");

describe("getHeading", function() {
  it("should return the heading with the given file name", function() {
    assert.deepEqual(getHeading("sample.js"), "\n==> sample.js <==\n");
  });
});

describe("getErrorMessage", function() {
  it("should return the error message with the given file name", function() {
    assert.deepEqual(
      getErrorMessage("sample.js"),
      "head: sample.js: No such file or directory"
    );
  });
});

describe("addHeading", function() {
  it("should return the file contents as it is when there is only one file", function() {
    let fileNames = ["sample.js"];
    let fileContents = "ab\ncd";
    let heading = "\n==> sample.js <==\n";
    let expectedOutput = "ab\ncd";
    let actualOutput = addHeading(fileNames, fileContents, heading);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return the contents with the heading when there is more than one file", function() {
    let fileNames = ["sample.js", "example.js"];
    let fileContents = "ab\ncd";
    heading = "\n==> sample.js <==\n";
    let expectedOutput = heading + "ab\ncd";
    let actualOutput = addHeading(fileNames, fileContents, heading);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
