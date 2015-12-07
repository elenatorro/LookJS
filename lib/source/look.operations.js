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
