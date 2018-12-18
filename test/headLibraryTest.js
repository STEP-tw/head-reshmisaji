const assert = require("assert");
const {
  getHeading,
  getErrorMessage
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
