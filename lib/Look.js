'use strict';
// -- Object ------------------------------------------------------
var Look, exports;

  Look = (function() {
    function Look() {
    }

    Look.prototype.create = function(object, container) {
      var element = document.createElement(object.tag);
      this._setAttributes(element, object.attr);
      if (object.content) this._setContent(element, object.content);
      container ? container.appendChild(element) : document.body.appendChild(element);
      return element;
    };

    Look.prototype._setAttributes = function(element, attributes) {
      for (var name in attributes) {
        element.setAttribute(name, attributes[name]);
      };
    };

    Look.prototype._setContent = function(element, content) {
      var look = this;
      content.forEach(function(object) {
        look.create(object,element);
      })
    };


  return Look;
})();

// -- Export ------------------------------------------------------
exports = module.exports = Look;
