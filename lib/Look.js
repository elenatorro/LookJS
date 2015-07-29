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

  _objectElements :
  function(object) {
    return Object.keys(object).length;
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
    var many = [];
    var i = 0;
    for (i; i < times; i++) {
      many.push(Look.create(object, container));
    }
    return many;
  },

  copy :
  function(from, to) {
    return this.create(from.cloneNode(true), to);
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

  setText : {
    to : {
      oneElement :
      function(element, text) {
        element.textContent = text;
      },
      manyElements :
      function(elements, texts, language) {
        var i = 0;
        for (i; i < Look._objectElements(texts); i++) {
          elements[i].textContent = texts[i][language];
        }
      },
      allElements :
      function(elements, text) {
        var i = 0;
        console.log(elements);
        for (i; i < elements.length; i++) {
          if (elements[i]) elements[i].textContent = text;
        }
      }
    }
  }
}

Look.components = {
	list: {},
	add: 
	function(id, component) {
		if (!Look.components.checkId(component)) {
			Look.components.list[id] = component;
		}
		return component
	},
	checkId: 
	function(id) {
		return ((id !== "") 
			&& (id !== null) 
			&& (Look.components.list.hasOwnProperty(id)))
	},
	get: 
	function(id) {
		return Look.components.list[id];
	},
	extend:
	function(componentId, newId, newProperties) {
		var oldComponent = Look.components.get(componentId);
		var newComponent = Look.mergeJson(oldComponent, newProperties);
		return Look.components.add(newId, newComponent);
	},
	extendAttribute:
	function(componentId, newId, newProperties) {
		var oldComponent = Look.components.get(componentId);
		var newComponent = Look.extendKey(oldComponent, newProperties);
		return Look.components.add(newId, newComponent);
	},
	merge:
	function(component1, component2, newId) {
		return Look.components.add(
					newId,
					Look.extendKey(
						Look.components.get(component1), 
						Look.components.get(component2))
				);
	}
}

Look.createFromComponent = 
	function(id, container) {
		return Look.create(Look.components.get(id), container);
	}
function Controller(id) {
	
}
Look.language = {
  change :
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

Look.copyJson = function(object1, object2) {
	
}

Look.mergeJson = function(object1, object2) {
	var key;
	var newObject = object2;
	for (key in object1) {
		if (typeof object1[key] === "object") {
			newObject[key] = Look.mergeJson(object1[key], newObject[key])
		} else {
			newObject[key] = object1[key];
		} 
	}
	return newObject;
}

Look.extendKey = function(object1, object2) {
	var key;
	var newObject = object2;
	for (key in object1) {
		if (typeof object1[key] === "object") {
			Look.extendKey(object1[key], newObject[key])
		} else {
			if (Look.differentKey(object1, newObject, key)) {
				newObject[key] += ' ' + object1[key];
			}
		} 
	}
	return newObject;
}

Look.differentKey = function(object1, object2, key) {
	return ((object1[key]) &&  (object2[key]) &&  (object1[key] !== object2[key]));
}
Look.style = {
	setProperty: 
	function(element, property, value) {
		element.style[property] = value;
	},

	setStyle: 
	function(element, properties) {
		for (property in properties) {
			Look.style.setProperty(element, property, properties[property]);
		}
	}
}