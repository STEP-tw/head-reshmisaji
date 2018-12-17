const assert = require("assert");
const { parseInput } = require("../src/inputHandler/handleInput.js");

describe("parseInput", function() {
  describe("With no options", function() {
    it('should return an object with option as "n", count as "10", and fileNames as an array of file names', function() {
      actualInput = ["sample.txt"];
      expectedOutput = { option: "n", count: "10", fileNames: ["sample.txt"] };
      actualOutput = parseInput(actualInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
