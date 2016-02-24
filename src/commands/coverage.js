const process = require("process");
const isGluestickProject = require("../lib/check-gluestick-project");

module.exports = function (options, cb) {
  if (!isGluestickProject(process.cwd())) 
    return cb("`coverage` commands must be run from the root of a gluestick project.");

  cb();
}
