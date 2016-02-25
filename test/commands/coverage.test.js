import { expect } from "chai";
import fs from "fs";
import path from "path";
import temp from "temp";
import rimraf from "rimraf";
import coverage from "../../src/commands/coverage";

describe("cli: gluestick coverage", function () {

  let originalCwd, tmpDir;

  beforeEach(() => {
    originalCwd = process.cwd();
    tmpDir = temp.mkdirSync("gluestick-coverage");
    process.chdir(tmpDir);
  });

  afterEach(done => {
    process.chdir(originalCwd);
    rimraf(tmpDir, done);
  });

  it("should report an error if a .gluestick file is not found in the current directory", () => { 
    coverage(null, err => {
      expect(err).to.contain("commands must be run from the root of a gluestick project");
    });
  });

  it("should generate a `coverage` directory", (done) => {
    fs.closeSync(fs.openSync(".gluestick", "w"));
    coverage(null, err => {
      expect(err).to.be.undefined;
      const stat = () => {
        const dir = fs.statSync(path.join(process.cwd(), 'coverage'));
        expect(dir.isDirectory()).to.be.true;
      };
      expect(stat).to.not.throw(Error);
      done();
    });
  });

  it("should generate an html report if requested", () => {
    fs.closeSync(fs.openSync(".gluestick", "w"));
    coverage({html: true}, err => {
      expect(err).to.be.undefined;
      const stat = () => {
        const file = fs.statSync(path.join(process.cwd(), 'coverage/html/index.html'));
        expect(file.isFile()).to.be.true;
      };
      expect(stat).to.not.throw(Error);
      done();
    });
  });

});
