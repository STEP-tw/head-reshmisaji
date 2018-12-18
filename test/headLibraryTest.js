const assert = require("assert");
const { getHeading } = require("../src/library/headLibrary.js");

describe("getHeading", function() {
  it("should return the heading with the given file name", function() {
    assert.deepEqual(getHeading("sample.js"), "\n==> sample.js <==\n");
  });
});
