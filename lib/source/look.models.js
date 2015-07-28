Look.models = {
	list: {},
	add: function(id, model) {
		if (!Look.models.checkId(model)) {
			Look.models.list[id] = model;
		}
		return model
	},
	checkId: function(id) {
		return ((id !== "") 
			&& (id !== null) 
			&& (Look.models.list.hasOwnProperty(id)))
	},
	get: function(id) {
		return Look.models.list[id];
	}
}

Look.createFromModel = function(id, container) {
	return Look.create(Look.models.get(id), container);
}