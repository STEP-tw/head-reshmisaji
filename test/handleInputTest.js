const assert = require("assert");
const {
  parseInput,
  hasOption,
  getOption,
  isLengthTwo,
  hasOnlyOption,
  getLineCount,
  getFileNames
} = require("../src/inputHandler/handleInput.js");

describe("parseInput", function() {
  describe("Head", function() {
    describe("With no options", function() {
      it('should return {option:"n",count:"3",fileNames:["sample.txt"],filter:"head"} when given a file', function() {
        let userInput = ["sample.txt"];
        let expectedOutput = {
          option: "n",
          count: "10",
          fileNames: ["sample.txt"],
          filter: "head"
        };
        let actualOutput = parseInput(userInput, "head");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return {option:"n",count:"10",fileNames:["file Name1","fileName2"],filter:"head"} when given more than one file', function() {
        let userInput = ["sample1.txt", "sample2.txt"];
        let expectedOutput = {
          option: "n",
          count: "10",
          fileNames: ["sample1.txt", "sample2.txt"],
          filter: "head"
        };
        let actualOutput = parseInput(userInput, "head");

        assert.deepEqual(actualOutput, expectedOutput);
      });
    });

    describe("With options", function() {
      it('should return an object with option:"n",count:"1",filter:"head" and filenames when given option as -n1', function() {
        let userInput = ["-n1", "sample.js"];
        let expectedOutput = {
          option: "n",
          count: "1",
          fileNames: ["sample.js"],
          filter: "head"
        };
        let actualOutput = parseInput(userInput, "head");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"n",count 1,filter:"head" and fileNames when given the option as "-n 1"', function() {
        let userInput = ["-n", "1", "sample.js"];
        let expectedOutput = {
          option: "n",
          count: "1",
          fileNames: ["sample.js"],
          filter: "head"
        };
        let actualOutput = parseInput(userInput, "head");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"n",count:"1",filter:"head" and fileNames, when given option as "-1"', function() {
        let userInput = ["-1", "sample.js"];
        let expectedOutput = {
          option: "n",
          count: "1",
          fileNames: ["sample.js"],
          filter: "head"
        };
        let actualOutput = parseInput(userInput, "head");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"c",count:"1",filter:"head" and fileNames when given the option as"-c1"', function() {
        let userInput = ["-c1", "sample.js"];
        let expectedOutput = {
          option: "c",
          count: "1",
          fileNames: ["sample.js"],
          filter: "head"
        };
        let actualOutput = parseInput(userInput, "head");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"c",count:"1",filter:"head" and fileNames when given the option "-c 1"', function() {
        let userInput = ["-c", "1", "sample.js"];
        let expectedOutput = {
          option: "c",
          count: "1",
          fileNames: ["sample.js"],
          filter: "head"
        };
        let actualOutput = parseInput(userInput, "head");

        assert.deepEqual(actualOutput, expectedOutput);
      });
    });
  });

  describe("Tail", function() {
    describe("With no options", function() {
      it('should return {option:"n",count:"3",fileNames:["sample.txt"],filter:"tail"} when given a file', function() {
        let userInput = ["sample.txt"];
        let expectedOutput = {
          option: "n",
          count: "10",
          fileNames: ["sample.txt"],
          filter: "tail"
        };
        let actualOutput = parseInput(userInput, "tail");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return {option:"n",count:"10",fileNames:["file Name1","fileName2"],filter:"tail"} when given more than one file', function() {
        let userInput = ["sample1.txt", "sample2.txt"];
        let expectedOutput = {
          option: "n",
          count: "10",
          fileNames: ["sample1.txt", "sample2.txt"],
          filter: "tail"
        };
        let actualOutput = parseInput(userInput, "tail");

        assert.deepEqual(actualOutput, expectedOutput);
      });
    });

    describe("With options", function() {
      it('should return an object with option:"n",count:"1",filter:"tail" and filenames when given option as -n1', function() {
        let userInput = ["-n1", "sample.js"];
        let expectedOutput = {
          option: "n",
          count: "1",
          fileNames: ["sample.js"],
          filter: "tail"
        };
        let actualOutput = parseInput(userInput, "tail");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"n",count 1,filter:"tail" and fileNames when given the option as "-n 1"', function() {
        let userInput = ["-n", "1", "sample.js"];
        let expectedOutput = {
          option: "n",
          count: "1",
          fileNames: ["sample.js"],
          filter: "tail"
        };
        let actualOutput = parseInput(userInput, "tail");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"n",count:"1",filter:"tail" and fileNames, when given option as "-1"', function() {
        let userInput = ["-1", "sample.js"];
        let expectedOutput = {
          option: "n",
          count: "1",
          fileNames: ["sample.js"],
          filter: "tail"
        };
        let actualOutput = parseInput(userInput, "tail");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"c",count:"1",filter:"tail" and fileNames when given the option as"-c1"', function() {
        let userInput = ["-c1", "sample.js"];
        let expectedOutput = {
          option: "c",
          count: "1",
          fileNames: ["sample.js"],
          filter: "tail"
        };
        let actualOutput = parseInput(userInput, "tail");

        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return an object with option:"c",count:"1",filter:"tail" and fileNames when given the option "-c 1"', function() {
        let userInput = ["-c", "1", "sample.js"];
        let expectedOutput = {
          option: "c",
          count: "1",
          fileNames: ["sample.js"],
          filter: "tail"
        };
        let actualOutput = parseInput(userInput, "tail");

        assert.deepEqual(actualOutput, expectedOutput);
      });
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

describe("getOption", function() {
  it('should return "n" when we give "-1"', function() {
    assert.deepEqual(getOption("-1"), "n");
  });

  it('should return "n" when we give "-n"', function() {
    assert.deepEqual(getOption("-n"), "n");
  });

  it('should return "c" when we give "-c"', function() {
    assert.deepEqual(getOption("-c"), "c");
  });

  it('should return "v" when we give "-v"', function() {
    assert.deepEqual(getOption("-v"), "v");
  });
});

describe("isLengthTwo", function() {
  it("should return false when we give an empty string", function() {
    assert.deepEqual(isLengthTwo(""), false);
  });

  it("should return false when we give a string of length 1", function() {
    assert.deepEqual(isLengthTwo("a"), false);
  });

  it("should return false when we give string of length greater than 2", function() {
    assert.deepEqual(isLengthTwo("abc"), false);
  });

  it("should return true when given a string of length", function() {
    assert.deepEqual(isLengthTwo("ab"), true);
  });
});

describe("hasOnlyOption", function() {
  it("should return false when we give empty string", function() {
    assert.deepEqual(hasOnlyOption(""), false);
  });

  it("should return false when we give string with numbers", function() {
    assert.deepEqual(hasOnlyOption("-n5"), false);
  });

  it("should return true when we give '-n'", function() {
    assert.deepEqual(hasOnlyOption("-n"), true);
  });

  it('should return true when we give "-c"', function() {
    assert.deepEqual(hasOnlyOption("-c"), true);
  });
});

describe("getLineCount", function() {
  it("should return 0 when we give an empty string as first parameter", function() {
    assert.deepEqual(getLineCount([""]), 0);
  });

  it("should return the second parameter when we give only option in first parameter", function() {
    assert.deepEqual(getLineCount(["-n", "1", "sample.txt"]), 1);
  });

  it('should return 1 when we give the first parameter as "-n1"', function() {
    assert.deepEqual(getLineCount(["-n1", "sample.txt"]), 1);
  });

  it('should return 1 when given "-1" as first parameter', function() {
    assert.deepEqual(getLineCount(["-1", "sample.txt"]), 1);
  });
});

describe("getFileNames", function() {
  it("should return array with empty string when given an empty string as the file name", function() {
    let userInput = ["-1", ""];
    let expectedOutput = [""];
    let actualOutput = getFileNames(userInput);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array of empty strings when given all filenames as empty strings", function() {
    let userInput = ["-1", "", ""];
    let expectedOutput = ["", ""];
    let actualOutput = getFileNames(userInput);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return array with only one element when given only one file name", function() {
    let userInput = ["-1", "sample.js"];
    let expectedOutput = ["sample.js"];
    let actualOutput = getFileNames(userInput);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array with more than one element when given more than one file name", function() {
    let userInput = ["-1", "sample.js", "example.js"];
    let expectedOutput = ["sample.js", "example.js"];
    let actualOutput = getFileNames(userInput);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
