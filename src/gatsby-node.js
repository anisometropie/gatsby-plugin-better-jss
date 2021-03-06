"use strict";

var fs = require("fs");

var path = require("path");

var os = require("os"); // Write out a jss module to .cache.


exports.onPreBootstrap = function (_ref, pluginOptions) {
  var store = _ref.store;
  var program = store.getState().program;
  var module;

  if (pluginOptions.pathToConfigModule) {
    module = `module.exports = require("${path.join(program.directory, pluginOptions.pathToConfigModule)}")`;

    if (os.platform() == "win32") {
      module = module.split("\\").join("\\\\");
    }
  } else {
    module = "const preset = require('jss-preset-default').default;module.exports = function(jss){return jss.setup(preset());};";
  }

  var dir = __dirname + "/.cache";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(dir + "/jss.js", module);
};