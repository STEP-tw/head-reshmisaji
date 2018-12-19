const assert = require("assert");
const {
  getHeading,
  getErrorMessage,
  addHeading,
  getContents,
  head,
  fileHandler,
  getUsage,
  getIllegalCountError,
  isValidCount,
  isValidOption,
  classifyInput
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

describe("fileHandler", function() {
  it("should return an error message when given a non existing file", function() {
    let userInputs = { option: "n", count: "3", fileNames: ["sample.js"] };
    let expectedOutput = ["head: sample.js: No such file or directory"];
    let actualOutput = fileHandler(userInputs, fsFalse);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return the contents of the file when given an existing file", function() {
    let sample = "1\n2\n3\n4";
    let userInputs = { option: "n", count: "3", fileNames: [sample] };
    let expectedOutput = ["1\n2\n3"];
    let actualOutput = fileHandler(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return the bytes of the file when given the option as "c" ', function() {
    let sample = "ab\ncd\nddf";
    let userInputs = { option: "c", count: "3", fileNames: [sample] };
    let expectedOutput = ["ab\n"];
    let actualOutput = fileHandler(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getUsage", function() {
  it("should return the invalid option error and usage of head", function() {
    let userInputs = { option: "v", count: "3", fileNames: ["sample.txt"] };
    let expectedOutput = [
      "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]"
    ];
    let actualOutput = getUsage(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getIllegalCountError", function() {
  it("should return return the error message with the count", function() {
    let userInputs = { option: "n", count: "0", fileNames: ["sample.js"] };
    let expectedOutput = ["head: illegal line count -- 0"];
    let actualOutput = getIllegalCountError(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("isValidCount", function() {
  it('should return false when given given "-" ', function() {
    assert.deepEqual(isValidCount("-"), false);
  });

  it("should return false when given 0", function() {
    assert.deepEqual(isValidCount(0), false);
  });

  it("should return true when given 3", function() {
    assert.deepEqual(isValidCount(3), true);
  });
});

describe("isValidOption", function() {
  it("should return false when given 'r'", function() {
    assert.deepEqual(isValidOption("r"), false);
  });

  it('should return false when given "-"', function() {
    assert.deepEqual(isValidOption("-"), false);
  });

  it('should return true when given "c"', function() {
    assert.deepEqual(isValidOption("c"), true);
  });

  it('should return true when given "n"', function() {
    assert.deepEqual(isValidOption("n"), true);
  });
});

describe("classifyInput", function() {
  it("should return 'illegalOption' when given '-' as option", function() {
    let userInputs = { option: "-", count: "3", fileNames: ["sample.txt"] };
    let expectedOutput = "illegalOption";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return "illegalOption" when given "v" as option', function() {
    let userInputs = { option: "v", count: "3", fileNames: ["sample.js"] };
    let expectedOutput = "illegalOption";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return "illegalCount" when given given "0" as count ', function() {
    let userInputs = { option: "n", count: "0", fileNames: ["sample.js"] };
    let expectedOutput = "illegalCount";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return "validInput" when given count:"3" and option:"n"', function() {
    let userInputs = { option: "n", count: "3", fileNames: ["sample.js"] };
    let expectedOutput = "validInput";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("head", function() {
  it("should return an error message when given a non existing fileName", function() {
    let userInputs = { option: "n", count: "2", fileNames: ["sample.js"] };
    let expectedOutput = ["head: sample.js: No such file or directory"];
    let actualOutput = head(userInputs, fsFalse);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an error message when given option as 'v' ", function() {
    let sample = "ab\nac\ndd\nfg";
    let userInputs = { option: "v", count: "2", fileNames: ["sample"] };
    let expectedOutput = [
      "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]"
    ];
    let actualOutput = head(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return an error message when given count as "0"', function() {
    let sample = "a\nac\ngg\nvr";
    let userInputs = { option: "n", count: "0", fileNames: ["sample"] };
    let expectedOutput = ["head: illegal line count -- 0"];
    let actualOutput = head(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return the first 3 lines of the file when option:"n" and count:"3"', function() {
    let sample = "a\nac\ngg\nvr";
    let userInputs = { option: "n", count: "3", fileNames: [sample] };
    let expectedOutput = ["a\nac\ngg"];
    let actualOutput = head(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
