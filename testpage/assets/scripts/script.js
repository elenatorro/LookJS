'use strict';
// -- Object ------------------------------------------------------
var Look, exports;


Look = (function() {
  function Look() {
    this._defaultVariable = 'default';
  }

  Look.prototype.defaultVariable = function() {
    return this._defaultVariable;
  };

  Look.prototype.defaultFunction = function(obj) {};

  return Look;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Look;
