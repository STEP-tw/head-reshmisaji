const assert = require("assert");
const { parseInput } = require("../src/inputHandler/handleInput.js");

describe("parseInput", function() {
  describe("With no options", function() {
    it('should return an object { option: "n", count: "10", fileNames: ["fileName"] } when we give only one file name', function() {
      let userInput = ["sample.txt"];
      let expectedOutput = {
        option: "n",
        count: "10",
        fileNames: ["sample.txt"]
      };
      let actualOutput = parseInput(userInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return an object { option: "n", count: "10", fileNames: ["fileName1","fileName2"] } when given more than one file name', function() {
      let userInput = ["sample1.txt", "sample2.txt"];
      let expectedOutput = {
        option: "n",
        count: "10",
        fileNames: ["sample1.txt", "sample2.txt"]
      };
      let actualOutput = parseInput(userInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("With options", function() {
    it('should return an object with option:"n",count:"1" and filenames when given option as -n1 ', function() {
      let userInput = ["-n1", "sample.js"];
      let expectedOutput = {
        option: "n",
        count: "1",
        fileNames: ["sample.js"]
      };
      let actualOutput = parseInput(userInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
