const assert = require("assert");
const {
  getHeading,
  getErrorMessage,
  addHeading,
  getContents
} = require("../src/library/headLibrary.js");

const fs = {
  readFileSync: function(x) {
    return x;
  },
  existsSync: function(x) {
    return true;
  }
};

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

describe("getContents", function() {
  it("should return the contents of the file according to option when given only one file", function() {
    let sampleFile = "a\nb\nc";
    let userInputs = { option: "n", count: "2", fileNames: ["sampleFile"] };
    let expectedOutput = "a\nb";
    let actualOutput = getContents(sampleFile, userInputs, fs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return the contents of the file with heading when we give more than one file", function() {
    let sampleFile = "sampleFile";
    let userInputs = {
      option: "n",
      count: "3",
      fileNames: ["sampleFile", "example"]
    };
    let expectedOutput = "\n==> sampleFile <==\nsampleFile";
    let actualOutput = getContents(sampleFile, userInputs, fs);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
