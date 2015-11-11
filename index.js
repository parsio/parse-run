#!/usr/bin/env node

var path = require('path');

var Parse = require("parse-cloud").Parse;
global.Parse = Parse;


exports.run = function(appName, options) {
  var appPath = path.resolve("./");
  return exports.runPath(appName, appPath, options);
};

exports.runPath = function(appName, appPath, options) {
  var modulesPath = path.join(__dirname, "node_modules");
  options = options || {};

// Node environment
  process.env.NODE_PATH = [appPath, modulesPath, process.env.NODE_PATH].join(path.delimiter);
  process.env.PARSERUN_APP_PATH = appPath;
  process.env.PARSERUN_PORT = options.port || process.env.PORT || 3000;
// Silent connect deprecations
  process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// hack module require to include app scripts
  require('module').Module._initPaths();


  var keys = require("./lib/utils").getConfiguration(appPath, appName);

  if (keys && keys.applicationId && keys.javascriptKey && keys.masterKey) {
    Parse.initialize(keys.applicationId, keys.javascriptKey, keys.masterKey);
  } else {
    console.error('Parse can not be initialized. Please verify application keys!');
  }

  var app = require("cloud/app");

  console.log("[%s] Running on http://localhost:%s/", process.pid, process.env.PARSERUN_PORT);

  return app;
};

exports.vhost = function vhost(hostname, server) {
  if (!hostname) throw new Error('vhost hostname required');
  if (!server) throw new Error('vhost server required');
  var regexp = new RegExp('^' + hostname.replace(/[^*\w]/g, '\\$&').replace(/[*]/g, '(?:.*?)')  + '$', 'i');
  if (server.onvhost) server.onvhost(hostname);
  return function vhost(req, res, next){
    if (!req.headers.host) return next();
    var host = req.headers.host.split(':')[0];
    if (!regexp.test(host)) return next();
    if ('function' == typeof server) return server(req, res, next);
    server.emit('request', req, res);
  };
};