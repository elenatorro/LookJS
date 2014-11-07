'use strict';
// -- Object ------------------------------------------------------
var Look, exports;
  Look = (function() {
    function Look() {
  }

  Look.prototype.createDiv = function(fatherId) {
    var sonDiv = document.createElement('div');
    var fatherDiv = document.getElementById(fatherId);
    father.appendChild(sonDiv);
    return sonDiv;
  };

  return Look;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Look;
