var Look = {
  // -- Private --------------------------------------------------------------
  _setAttributes: function (element, attributes) {
    for (var name in attributes) {
      element.setAttribute(name, attributes[name])
    }
  },

  _setContent: function (element, content) {
    content.forEach(function (object) {
      Look.create(object, element)
    })
  },

  _for: function (collection, attribute, content, position) {
    if (collection.length != 0) {
      for (var i in collection) {
        if (collection[i].getAttribute(attribute) === content) return collection[i]
      }
    }
    return false
  },

  _objectElements: function (object) {
    return Object.keys(object).length
  },
  // -- Public ---------------------------------------------------------------

  create: function (object, container) {
    var element = this.newElement(object.tag)
    if (object.attr) this._setAttributes(element, object.attr)
    if (object.text) this.setText.to.oneElement(element, object.text)
    if (object.content) this._setContent(element, object.content)
    container ? container.appendChild(element) : document.body.appendChild(element)
    return element
  },

  createMany: function (times, object, container) {
    var many = []
    var i = 0
    for (i; i < times; i++) {
      many.push(Look.create(object, container))
    }
    return many
  },

  copy: function (from, to) {
    return this.create(from.cloneNode(true), to)
  },

  // -- document operations substitution ---------------------------------

  newElement: function (tag) {
    return document.createElement(tag)
  },

  getBy: {
    id: function (id) {
      return document.getElementById(id)
    },
    className: function (name, at) {
      if (at) return document.getElementsByClassName(name)[at]
      return document.getElementsByClassName(name)
    },
    tagName: function (name, at) {
      if (at) return document.getElementsByTagName(name)[at]
      return document.getElementsByTagName(name)
    },
    href: function (link, at) {
      if (at) return Look._for(document.getElementsByTagName('a'), 'href', link, at)
      return Look._for(document.getElementsByTagName('a'), 'href', link)
    },
    src: function (link, at) {
      if (at) return Look._for(document.getElementsByTagName('img'), 'src', link, at)
      return Look._for(document.getElementsByTagName('img'), 'src', link)
    }
  },

  setText: {
    to: {
      oneElement: function (element, text) {
        element.textContent = text
      },
      manyElements: function (elements, texts, language) {
        var i = 0
        for (i; i < Look._objectElements(texts); i++) {
          elements[i].textContent = texts[i][language]
        }
      },
      allElements: function (elements, text) {
        var i = 0
        for (i; i < elements.length; i++) {
          if (elements[i]) elements[i].textContent = text
        }
      }
    }
  }
}
