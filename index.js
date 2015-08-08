#!/usr/bin/env node

var path = require('path');

var Parse = require("parse-cloud").Parse;
global.Parse = Parse;


exports.run = function(appName) {
  var appPath = path.resolve("./");
  var modulesPath = path.join(__dirname, "node_modules");

// Node environment
  process.env.NODE_PATH = [appPath, modulesPath, process.env.NODE_PATH].join(path.delimiter);
  process.env.PARSERUN_APP_PATH = appPath;
  process.env.PARSERUN_PORT = process.env.PORT || 3000;
// Silent connect deprecations
  process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// hack module require to include app scripts
  require('module').Module._initPaths();


  var keys = require("./lib/utils").getConfiguration(appName);

  Parse.initialize(keys.applicationId, keys.javascriptKey, keys.masterKey);

  require("cloud/main");

  console.log("[%s] Running on http://localhost:%s/", process.pid, process.env.PARSERUN_PORT);
};