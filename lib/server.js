// Load Parse

require('./require-parse');

var Parse = require("parse-cloud").Parse;
global.Parse = Parse;


var appName = process.argv[3];
if (appName && appName !== "undefined") {
  console.log("Starting app " + appName);
}

var start = function(config) {
  'use strict';

  console.log("[%s] Running on http://localhost:%s/", process.pid, process.env.PARSERUN_PORT);

  Parse.initialize(config.applicationId, config.javascriptKey, config.masterKey);

  process.chdir(process.env.PARSERUN_APP_PATH);

  require(path.join(process.env.PARSERUN_APP_PATH, "/cloud/main"));
};


var keys = require("./utils").getConfiguration(appName);
if(!keys){
  system.exit(1);
}
start(keys);