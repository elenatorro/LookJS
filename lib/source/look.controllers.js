var lc = Look.controllers;

Look.controllers = {
	create:
	function(model, operations) {
		return Look.controllers.extend(model, operations);
	},
	extend:
	function(model, operations) {
		var operation;
		operations['model'] = model;
		model['operations'] = operations;
		return model;
	}
}