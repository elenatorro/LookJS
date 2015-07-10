Look.style = {
	setProperty: function(element, property, value) {
		element.style[property] = value;
	},

	setStyle: function(element, properties) {
		properties.keys.forEach(function(property) {
			Look.style.setProperty(element, property, properties[property]);
		})
	}
}