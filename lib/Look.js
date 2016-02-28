/****************************************************

- LookJS - 

@module: dom
@requires: 
@author: Elena Torro
@description: Basic module of LookJS. DOM interactions.

*****************************************************/

var Look = {
    _setAttributes: function(element, attributes) {
        for (var name in attributes) {
            element.setAttribute(name, attributes[name])
        }
    },

    _setContent: function(element, content) {
        content.forEach(function(object) {
            Look.create(object, element)
        })
    },

    _for: function(collection, attribute, content, position) {
        if (collection.length != 0) {
            for (var i in collection) {
                if (collection[i].getAttribute(attribute) === content) return collection[i]
            }
        }
        return false
    },

    _objectElements: function(object) {
        return Object.keys(object).length
    },
    // -- Public ---------------------------------------------------------------

    create: function(object, container) {
        var element = this.newElement(object.tag)
        if (object.attr) this._setAttributes(element, object.attr)
        if (object.text) this.setText.to.oneElement(element, object.text)
        if (object.content) this._setContent(element, object.content)
        container ? container.appendChild(element) : document.body.appendChild(element)
        return element
    },

    remove: function(object, container) {
        if (object) {
            container = container || document.body
            container.removeChild(object)
        }
    },

    createMany: function(times, object, container) {
        var many = []
        var i = 0
        for (i; i < times; i++) {
            many.push(Look.create(object, container))
        }
        return many
    },

    copy: function(from, to) {
        return this.create(from.cloneNode(true), to)
    },

    newElement: function(tag) {
        return document.createElement(tag)
    },

    getBy: {
        id: function(id) {
            return document.getElementById(id)
        },
        className: function(name, at) {
            if (at) return document.getElementsByClassName(name)[at]
            return document.getElementsByClassName(name)
        },
        tagName: function(name, at) {
            if (at) return document.getElementsByTagName(name)[at]
            return document.getElementsByTagName(name)
        },
        href: function(link, at) {
            if (at) return Look._for(document.getElementsByTagName('a'), 'href', link, at)
            return Look._for(document.getElementsByTagName('a'), 'href', link)
        },
        src: function(link, at) {
            if (at) return Look._for(document.getElementsByTagName('img'), 'src', link, at)
            return Look._for(document.getElementsByTagName('img'), 'src', link)
        }
    },

    head: document.head,
    body: document.body,

    setText: {
        to: {
            oneElement: function(element, text) {
                if (element) element.textContent = text
            },
            manyElements: function(elements, texts, language) {
                if (elements) {
                    var i = 0
                    for (i; i < Look._objectElements(texts); i++) {
                        elements[i].textContent = texts[i][language]
                    }
                }
            },
            allElements: function(elements, text) {
                if (elements) {
                    var i = 0
                    for (i; i < elements.length; i++) {
                        if (elements[i]) elements[i].textContent = text
                    }

                }
            }
        }
    }
}
/****************************************************

- LookJS - 

@module: components
@requires: look.dom, look.operations 
@author: Elena Torro
Description: This modules let you save, merge and 
operate a list of components. Each component is 
snipet of HTML and JS that is going to be reused in 
your project.
****************************************************/

Look.components = {
  list: {},
  add: function (id, component) {
    if (!Look.components.checkId(component)) {
      Look.components.list[id] = component
    }
    return component
  },
  checkId: function (id) {
    return ((id !== '')
    && (id !== null)
    && (Look.components.list.hasOwnProperty(id)))
  },
  get: function (id) {
    return Look.components.list[id]
  },
  extend: function (componentId, newId, newProperties) {
    var oldComponent = Look.components.get(componentId)
    var newComponent = Look.mergeJson(oldComponent, newProperties)
    return Look.components.add(newId, newComponent)
  },
  extendAttribute: function (componentId, newId, newProperties) {
    var oldComponent = Look.components.get(componentId)
    var newComponent = Look.extendKey(oldComponent, newProperties)
    return Look.components.add(newId, newComponent)
  },
  merge: function (component1, component2, newId) {
    return Look.components.add(
      newId,
      Look.extendKey(
        Look.components.get(component1),
        Look.components.get(component2))
    )
  }
}

/****************************************************

- LookJS - 

@module: controllers
@requires: look.operations, look.components
@author: Elena Torro
@description: A controller lets you set operations and
events to look components.

*****************************************************/

Look.controllers = {
  operations: {
    addClass: function (model, className) {
      model.classList.add(className)
    },
    removeClass: function (model, className) {
      model.classList.remove(className)
    }
  },
  create: function (model, operations) {
    return Look.controllers.extend(model, operations)
  },
  extend: function (model, operations) {
    operations['model'] = model
    model['operations'] = Look.mergeJson(Look.controllers.operations, operations || {})
    return model
  }
}


/****************************************************

- LookJS - 

@module: language
@requires: look.dom
@author: Elena Torro
@description: Set up multilanguage sites

*****************************************************/

Look.language = {
  'id': function (localizer, language) {
    for (var element in localizer) {
      Look.setText.to.oneElement(Look.getBy.id(element), localizer[element][language])
    }
  },
  'class': function (localizer, language) {
    for (var element in localizer) {
      Look.setText.to.manyElements(Look.getBy.className(element), localizer[element], language)
    }
  },
  'tag': function (localizer, language) {
    for (var element in localizer) {
      Look.setText.to.manyElements(Look.getBy.tagName(element), localizer[element], language)
    }
  },
  'allClass': function (localizer, language) {
    for (var element in localizer) {
      Look.setText.to.allElements(Look.getBy.className(element), localizer[element][language])
    }
  },
  'allTag': function (localizer, language) {
    for (var element in localizer) {
      Look.setText.to.allElements(Look.getBy.className(element), localizer[element][language])
    }
  },
  change: function (language, localizer) {
    for (var key in localizer) {
      Look.language[key](localizer[key], language)
    }
  }
}

/****************************************************

- LookJS - 

@module: operations
@requires: look.dom
@author: Elena Torro
@description: Set of object operations

*****************************************************/

Look.mergeJson = function (object1, object2) {
  var key
  var newObject = object2
  for (key in object1) {
    if (typeof object1[key] === 'object') {
      newObject[key] = Look.mergeJson(object1[key], newObject[key])
    } else {
      newObject[key] = object1[key]
    }
  }
  return newObject
}

Look.extendKey = function (object1, object2) {
  var key
  var newObject = object2
  for (key in object1) {
    if (typeof object1[key] === 'object') {
      Look.extendKey(object1[key], newObject[key])
    } else {
      if (Look.differentKey(object1, newObject, key)) {
        newObject[key] += ' ' + object1[key]
      }
    }
  }
  return newObject
}

Look.differentKey = function (object1, object2, key) {
  return ((object1[key]) && (object2[key]) && (object1[key] !== object2[key]))
}

Look.createFromComponent = function (id, container) {
  return Look.create(Look.components.get(id), container)
}

/****************************************************

- LookJS - 

@module: style
@requires: 
@author: Elena Torro
@description: Modify element styles

*****************************************************/

Look.style = {
  set: function (element, property, value) {
    element.style[property] = value
  },

  setStyle: function (element, properties) {
    for (property in properties) {
      Look.style.set(element, property, properties[property])
    }
  }
}

/****************************************************

- LookJS - 

@module: template
@requires: look.dom
@author: Elena Torro
@description: Creates defaults HTML5 templates with
different settings

*****************************************************/
Look.templates = {
	default: {
		styles: [],
		preScripts: [],
		postScripts: []
	},
	pushStyleFile: function(template, href) {
		Look.templates[template].styles.push(
			{
				tag: 'link',
				attr: {
					rel: 'stylesheet',
					href: href
				}
			}
		)
	},
	pushScriptFile: function(template, src, type) {
		Look.templates[template].postScripts.push(
			{
				tag: 'script',
				attr: {
					type: type || 'text/javascript',
					src: src
				}
			}
		)
	},
	addStyle: function(style) {
		Look.create(style, Look.head)
	},
	addScript: function(script) {
		Look.create(script)
	},
	style: function(templates) {
		templates.forEach(function(template) {
			Look.templates[template].styles.forEach(function(style) {
				Look.templates.addStyle(style)
			})
		})
	},
	script: function(templates) {
		templates.forEach(function(template) {
			Look.templates[template].scripts.forEach(function(script) {
				Look.templates.addScript(script)
			})
		})
	},
	all: function(templates) {
		Look.templates.style(templates)
		Look.templates.script(templates)
	},
	add: function(templates, type) {
		type = type || 'all'
		Look.templates[type](templates)
	}
}