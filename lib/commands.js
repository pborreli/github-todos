"use strict";

var debug = require("debug")("github-todos");


module.exports = {
  "load": load,
  "run":  run
};


// Safe-require command module
function load (commandName) {
  var command;

  try {
    command = require("./cli/" + commandName);
  } catch (e) {
    debug("Error loading command", commandName, e);
    command = null;
  }

  return command;
}

// Safe-fun command
function run (command, opts, conf, onError) {
  require("domain").create().on("error", onError).run(function () {
    if (command.config) {
      opts = command.config(opts, conf);
    }
    command.run(opts.argv, opts, conf);
  });
}
