const assert = require("assert");
const { parseInput, hasOption } = require("../src/inputHandler/handleInput.js");

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

    it('should return an object with option:"n",count 1,and fileNames when given the option as "-n 1"', function() {
      let userInput = ["-n", "1", "sample.js"];
      let expectedOutput = {
        option: "n",
        count: "1",
        fileNames: ["sample.js"]
      };
      let actualOutput = parseInput(userInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return an object with option:"n",count:"1" and fileNames, when given option as "-1"', function() {
      let userInput = ["-1", "sample.js"];
      let expectedOutput = {
        option: "n",
        count: "1",
        fileNames: ["sample.js"]
      };
      let actualOutput = parseInput(userInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return an object with option:"c",count:"1" and fileNames when given the option as"-c1"', function() {
      let userInput = ["-c1", "sample.js"];
      let expectedOutput = {
        option: "c",
        count: "1",
        fileNames: ["sample.js"]
      };
      let actualOutput = parseInput(userInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return an object with option:"c",count:"1" and fileNames when given the option "-c 1" ', function() {
      let userInput = ["-c", "1", "sample.js"];
      let expectedOutput = {
        option: "c",
        count: "1",
        fileNames: ["sample.js"]
      };
      let actualOutput = parseInput(userInput);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("hasOption", function() {
  it("should return false when given an empty string", function() {
    assert.deepEqual(hasOption([""]), false);
  });

  it("should return false when given a string with only space", function() {
    assert.deepEqual(hasOption([" "]), false);
  });

  it("should return false when given a string with '-' and has a length less than 1", function() {
    assert.deepEqual(hasOption(["-"]), false);
  });

  it("should return false when given a string starts with space and has a length greater than 1", function() {
    assert.deepEqual(hasOption([" 1"]), false);
  });

  it('should return true when given a string starts with "-" and has a length greater than 1', function() {
    assert.deepEqual(hasOption(["-1"]), true);
  });
});
