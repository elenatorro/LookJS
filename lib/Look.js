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
    for (var i in collection) {
      if (collection[i].getAttribute(attribute) === content) return collection[i];
    }
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

      // -- document operations substitution ----------------------------------

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
    }
  }
}
