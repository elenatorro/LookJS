/**
 * Dependencies
 */
var CoffeeScript= require("coffee-script");

// Register CoffeeScript if exits
if(CoffeeScript.register) CoffeeScript.register();

var board = require('./lib/Board');

/**
 * Exports
 */
module.exports = board;
