'use strict';
// -- Object ------------------------------------------------------
var JsonCss, exports;
  JsonCss = (function() {
    function JsonCss() {
    }

  JsonCss.prototype.objectToJson = function(object) {
      var cssString = JSON.stringify(object).replace(/"/g,'');
      return cssString.substr(0, cssString.length -1).substr(1);
  };
  return JsonCss;
})();

// -- Export ------------------------------------------------------
exports = module.exports = JsonCss;
