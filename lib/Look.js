'use strict';

/*
LookJS is under the MIT license.
Created by Elena Torro
https://elenatorro.com
*/

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
          if (collection[i].getAttribute(attribute) === content) return collection[i];
        }
      }
      return false;
    },

    // -- Public ---------------------------------------------------------------

  create :
    function(object, container) {
      var element = this.newElement(object.tag);
      if (object.attr) this._setAttributes(element, object.attr);
      if (object.text) this.setText.to.oneElement(element, object.text);
      if (object.content) this._setContent(element, object.content);
      container ? container.appendChild(element) : document.body.appendChild(element);
      return element;
    },

  createMany :
    function(times, object, container) {
      var i = 0;
      for (i; i < times; i++) {
        Look.create(object, container);
      }
    },

  copy :
    function(from, to) {
      return this.create(Look._clone(from), to);
    },

  _clone :
    function(object) {
      var newObject = object;
      newObject['id'] = newObject['id'] + '_copy';
      return newObject;
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
    tagName :
    function(name, at) {
      if (at) return document.getElementsByTagName(name)[at];
      return document.getElementsByTagName(name);
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

    // -- Localization ---------------------------------------------------------

setText : {
  to : {
    oneElement :
      function(element, text) {
        element.textContent = text;
      },
    manyElements :
      function(elements, texts, language) {
        var i = 0;
        for (i; i < elements.length; i++) {
          elements[i].textContent = texts[i][language];
        }
      },
    allElements :
      function(elements, text) {
        var i = 0;
        for (i; i < elements.length; i++) {
          if (elements[i]) elements[i].textContent = text;
        }
      }
    }
},

changeLanguage :
  function(language, localizer) {
    if (localizer['id']) {
      for (var element in localizer['id']) {
        Look.setText.to.oneElement(Look.getBy.id(element), localizer['id'][element][language]);
      }
    };

    if (localizer['class']) {
      for (var element in localizer['class']) {
        Look.setText.to.manyElements(Look.getBy.className(element), localizer['class'][element], language);
      }
    };

    if (localizer['tag']) {
      for (var element in localizer['tag']) {
        Look.setText.to.manyElements(Look.getBy.tagName(element), localizer['tag'][element], language);
      }
    };

    if (localizer['allClass']) {
      for (var element in localizer['allClass']) {
        Look.setText.to.allElements(Look.getBy.className(element), localizer['allClass'][element][language]);
      }
    };

    if (localizer['allTag']) {
      for (var element in localizer['allTag']) {
        Look.setText.to.allElements(Look.getBy.className(element), localizer['allTag'][element][language]);
      }
    };
  }
}
