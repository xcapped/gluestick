import { expect } from "chai";
import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import glob from "glob";
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
      expect(fs.statSync(path.join(process.cwd(), 'coverage')).isDirectory()).to.be.true;
      done();
    });
  });

  it("should generate an html report if requested", () => {
    fs.closeSync(fs.openSync(".gluestick", "w"));
    coverage({html: true}, err => {
      expect(err).to.be.undefined;
      expect(fs.statSync(path.join(process.cwd(), 'coverage/html/index.html')).isFile()).to.be.true;
      done();
    });
  });

});
