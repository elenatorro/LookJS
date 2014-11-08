'use strict';
// -- Object ------------------------------------------------------
var Look, exports;
  Look = (function() {
    function Look() {
  }

  Look.prototype.createDiv = function(father) {
    return father.appendChild(document.createElement('div'));
  };

  Look.prototype.cssOptions = function(element, options) {
    for(var k in options) {
      element.style[k] = options[k];
    }
  }

  return Look;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Look;
