'use strict';

var Look = {

  // -- Private --------------------------------------------------------------
  _setAttributes :
    function(element, attributes) {
      for (var name in attributes) {
        element.setAttribute(name, attributes[name]);
      }
    },

 _setContent :
  function(element, content) {
    content.forEach(function(object) {
      Look.create(object,element);
    });
  },

  _for :
    function(collection, attribute, content, position) {
      if (collection.length != 0) {
        for (var i in collection) {
          console.log(collection[i].hasAttribute(attribute));
          if (collection[i].getAttribute(attribute) === content) return collection[i];
        }
      }
      return false;
    },

    // -- Public ---------------------------------------------------------------

  create :
    function(object, container) {
      var element = this.newElement(object.tag);
      this._setAttributes(element, object.attr);
      if (object.content) this._setContent(element, object.content);
      container ? container.appendChild(element) : document.body.appendChild(element);
      return element;
    },

  copy :
    function(from, to, remove) {
      this.create({'tag':'div', 'id': to});
      this.getBy.id(to).innerHTML = this.getBy.id(from).innerHTML;
    },

    // -- document operations substitution ---------------------------------

  newElement :
    function(tag) {
      return document.createElement(tag);
    },

  getBy : {
    id :
      function(id) {
        return document.getElementById(id);
      },
    className :
      function(name, at) {
        if (at) return document.getElementsByClassName(name)[at];
        return document.getElementsByClassName(name);
      },
    href :
      function(link, at) {
        if (at) return Look._for(document.getElementsByTagName('a'), 'href', link, at);
        return Look._for(document.getElementsByTagName('a'), 'href', link);
      },
    src :
      function(link, at) {
        if (at) return Look._for(document.getElementsByTagName('img'), 'src', link, at);
        return Look._for(document.getElementsByTagName('img'), 'src', link);
      }
    },

    // -- Translation functions

setText :
  function(element, text) {
    element.innerHTML = text;
  },

changeLanguage :
  function(language, localizer) {
    for (var element in localizer) {
      Look.setText(Look.getBy.id(element), localizer[element][language]);
    }
  }
}
