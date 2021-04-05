const path = require("path");

module.exports.getID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const root = path.dirname(
  require.main.filename || process.require.main.filename
);

module.exports.root = root;
