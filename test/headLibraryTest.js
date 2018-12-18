const assert = require("assert");
const {
  getHeading,
  getErrorMessage,
  addHeading,
  getContents,
  head
} = require("../src/library/headLibrary.js");

const fsTrue = {
  readFileSync: function(x) {
    return x;
  },
  existsSync: function(x) {
    return true;
  }
};

const fsFalse = {
  readFileSync: function(x) {
    return x;
  },
  existsSync: function(x) {
    return false;
  }
};

describe("getHeading", function() {
  it("should return the heading with the given file name", function() {
    assert.deepEqual(getHeading("sample.js"), "==> sample.js <==\n");
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
    let heading = "==> sample.js <==\n";
    let expectedOutput = "ab\ncd";
    let actualOutput = addHeading(fileNames, fileContents, heading);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return the contents with the heading when there is more than one file", function() {
    let fileNames = ["sample.js", "example.js"];
    let fileContents = "ab\ncd";
    heading = "==> sample.js <==\n";
    let expectedOutput = heading + "ab\ncd";
    let actualOutput = addHeading(fileNames, fileContents, heading);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getContents", function() {
  it("should return the contents of the file according to option when given only one file", function() {
    let sampleFile = "a\nb\nc";
    let userInputs = { option: "n", count: "2", fileNames: [sampleFile] };
    let expectedOutput = "a\nb";
    let actualOutput = getContents(sampleFile, userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return the contents of the file with heading when we give more than one file", function() {
    let sampleFile = "sampleFile";
    let userInputs = {
      option: "n",
      count: "3",
      fileNames: ["sampleFile", "example"]
    };
    let expectedOutput = "==> sampleFile <==\nsampleFile";
    let actualOutput = getContents(sampleFile, userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("head", function() {
  it("should return an error message when given a non existing file", function() {
    let userInputs = { option: "n", count: "3", fileNames: ["sample.js"] };
    let expectedOutput = ["head: sample.js: No such file or directory"];
    let actualOutput = head(userInputs, fsFalse);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return the contents of the file when given an existing file", function() {
    let sample = "1\n2\n3\n4";
    let userInputs = { option: "n", count: "3", fileNames: [sample] };
    let expectedOutput = ["1\n2\n3"];
    let actualOutput = head(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return the bytes of the file when given the option as "c" ', function() {
    let sample = "ab\ncd\nddf";
    let userInputs = { option: "c", count: "3", fileNames: [sample] };
    let expectedOutput = ["ab\n"];
    let actualOutput = head(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
