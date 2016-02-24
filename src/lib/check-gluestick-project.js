const fs = require("fs-extra");
const path = require("path");

module.exports = function(directory) {
  try {
    fs.statSync(path.join(directory, ".gluestick"));
  }
  catch (e) {
    return false;
  }
  return true;
}
