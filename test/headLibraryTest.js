const assert = require("assert");
const {
  getHeading,
  getErrorMessage,
  addHeading,
  getContents,
  filter,
  getResult,
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
  it("should return the error message with the given file name and filter as head", function() {
    let userInputs = {
      option: "n",
      count: "3",
      fileNames: ["sample.js"],
      filter: "head"
    };
    assert.deepEqual(
      getErrorMessage("sample.js", userInputs),
      userInputs.filter + ": sample.js: No such file or directory"
    );
  });

  it("should return the error message with the given file name and filter as tail", function() {
    let userInputs = {
      option: "n",
      count: "3",
      fileNames: ["sample.js"],
      filter: "tail"
    };
    assert.deepEqual(
      getErrorMessage("sample.js", userInputs),
      userInputs.filter + ": sample.js: No such file or directory"
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
  describe("Head", function() {
    it("should return the contents of the file according to option when given only one file", function() {
      let sampleFile = "a\nb\nc";
      let userInputs = {
        option: "n",
        count: "2",
        fileNames: [sampleFile],
        filter: "head"
      };
      let expectedOutput = "a\nb";
      let actualOutput = getContents(sampleFile, userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the contents of the file with heading when we give more than one file", function() {
      let sampleFile = "sampleFile";
      let userInputs = {
        option: "n",
        count: "3",
        fileNames: ["sampleFile", "example"],
        filter: "head"
      };
      let expectedOutput = "==> sampleFile <==\nsampleFile";
      let actualOutput = getContents(sampleFile, userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("Tail", function() {
    it("should return the contents of the file according to option when given only one file", function() {
      let sampleFile = "a\nb\nc";
      let userInputs = {
        option: "n",
        count: "2",
        fileNames: [sampleFile],
        filter: "tail"
      };
      let expectedOutput = "b\nc";
      let actualOutput = getContents(sampleFile, userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the contents of the file with heading when we give more than one file", function() {
      let sampleFile = "sampleFile";
      let userInputs = {
        option: "n",
        count: "3",
        fileNames: ["sampleFile", "example"],
        filter: "tail"
      };
      let expectedOutput = "==> sampleFile <==\nsampleFile";
      let actualOutput = getContents(sampleFile, userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("getResult", function() {
  describe("Head", function() {
    it("should return an error message when given a non existing file", function() {
      let userInputs = {
        option: "n",
        count: "3",
        fileNames: ["sample.js"],
        filter: "head"
      };
      let expectedOutput = ["head: sample.js: No such file or directory"];
      let actualOutput = getResult(userInputs, fsFalse);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the contents of the file when given an existing file", function() {
      let sample = "1\n2\n3\n4";
      let userInputs = {
        option: "n",
        count: "3",
        fileNames: [sample],
        filter: "head"
      };
      let expectedOutput = ["1\n2\n3"];
      let actualOutput = getResult(userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return the bytes of the file when given the option as "c" ', function() {
      let sample = "ab\ncd\nddf";
      let userInputs = {
        option: "c",
        count: "3",
        fileNames: [sample],
        filter: "head"
      };
      let expectedOutput = ["ab\n"];
      let actualOutput = getResult(userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("Tail", function() {
    it("should return an error message when given a non existing file", function() {
      let userInputs = {
        option: "n",
        count: "3",
        fileNames: ["sample.js"],
        filter: "tail"
      };
      let expectedOutput = ["tail: sample.js: No such file or directory"];
      let actualOutput = getResult(userInputs, fsFalse);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should return the contents of the file when given an existing file", function() {
      let sample = "1\n2\n3\n4";
      let userInputs = {
        option: "n",
        count: "3",
        fileNames: [sample],
        filter: "tail"
      };
      let expectedOutput = ["2\n3\n4"];
      let actualOutput = getResult(userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return the bytes of the file when given the option as "c" ', function() {
      let sample = "ab\ncd\nddf";
      let userInputs = {
        option: "c",
        count: "3",
        fileNames: [sample],
        filter: "tail"
      };
      let expectedOutput = ["ddf"];
      let actualOutput = getResult(userInputs, fsTrue);

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("getUsage", function() {
  it("should return the invalid option error and usage of head", function() {
    let userInputs = {
      option: "v",
      count: "3",
      fileNames: ["sample.txt"],
      filter: "head"
    };
    let expectedOutput = [
      "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]"
    ];
    let actualOutput = getUsage(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return the invalid option error and usage of head", function() {
    let userInputs = {
      option: "v",
      count: "3",
      fileNames: ["sample.txt"],
      filter: "tail"
    };
    let expectedOutput = [
      "tail: illegal option -- v\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    ];
    let actualOutput = getUsage(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("getIllegalCountError", function() {
  it("should return return the error message with the count with filter head", function() {
    let userInputs = {
      option: "n",
      count: "0",
      fileNames: ["sample.js"],
      filter: "head"
    };
    let expectedOutput = ["head: illegal line count -- 0"];
    let actualOutput = getIllegalCountError(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return return the error message with the count with filter tail", function() {
    let userInputs = {
      option: "n",
      count: "0",
      fileNames: ["sample.js"],
      filter: "tail"
    };
    let expectedOutput = ["tail: illegal line count -- 0"];
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
    let userInputs = {
      option: "-",
      count: "3",
      fileNames: ["sample.txt"],
      filter: undefined
    };
    let expectedOutput = "illegalOption";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return "illegalOption" when given "v" as option', function() {
    let userInputs = {
      option: "v",
      count: "3",
      fileNames: ["sample.js"],
      filter: undefined
    };
    let expectedOutput = "illegalOption";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return "illegalCount" when given given "0" as count ', function() {
    let userInputs = {
      option: "n",
      count: "0",
      fileNames: ["sample.js"],
      filter: undefined
    };
    let expectedOutput = "illegalCount";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return "validInput" when given count:"3" and option:"n"', function() {
    let userInputs = {
      option: "n",
      count: "3",
      fileNames: ["sample.js"],
      filter: undefined
    };
    let expectedOutput = "validInput";
    let actualOutput = classifyInput(userInputs);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("filter", function() {
  it("should return an error message when given a non existing fileName", function() {
    let userInputs = {
      option: "n",
      count: "2",
      fileNames: ["sample.js"],
      filter: "head"
    };
    let expectedOutput = ["head: sample.js: No such file or directory"];
    let actualOutput = filter(userInputs, fsFalse);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an error message when given option as 'v' ", function() {
    let sample = "ab\nac\ndd\nfg";
    let userInputs = {
      option: "v",
      count: "2",
      fileNames: ["sample"],
      filter: "head"
    };
    let expectedOutput = [
      "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]"
    ];
    let actualOutput = filter(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return an error message when given count as "0"', function() {
    let sample = "a\nac\ngg\nvr";
    let userInputs = {
      option: "n",
      count: "0",
      fileNames: ["sample"],
      filter: "head"
    };
    let expectedOutput = ["head: illegal line count -- 0"];
    let actualOutput = filter(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return the first 3 lines of the file when option:"n" and count:"3"', function() {
    let sample = "a\nac\ngg\nvr";
    let userInputs = {
      option: "n",
      count: "3",
      fileNames: [sample],
      filter: "head"
    };
    let expectedOutput = ["a\nac\ngg"];
    let actualOutput = filter(userInputs, fsTrue);

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
