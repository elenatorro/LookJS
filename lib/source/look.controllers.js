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
