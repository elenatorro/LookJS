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
