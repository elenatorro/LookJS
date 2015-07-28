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