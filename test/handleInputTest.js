const assert = require("assert");
const { parseInput } = require("../src/inputHandler/handleInput.js");

describe("parseInput", function() {
  describe("With no options", function() {
    it('should return an object { option: "n", count: "10", fileNames: ["fileName"] } when we give only one file name', function() {
      actualInput = ["sample.txt"];
      expectedOutput = { option: "n", count: "10", fileNames: ["sample.txt"] };
      actualOutput = parseInput(actualInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return an object { option: "n", count: "10", fileNames: ["fileName1","fileName2"] } when given more than one file name', function() {
      actualInput = ["sample1.txt", "sample2.txt"];
      expectedOutput = {
        option: "n",
        count: "10",
        fileNames: ["sample1.txt", "sample2.txt"]
      };
      actualOutput = parseInput(actualInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
