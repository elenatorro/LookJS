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
