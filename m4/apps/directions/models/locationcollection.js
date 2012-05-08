define(['backbone', 'directions/models/location'], function(Backbone, Location) {
	var Collection = Backbone.Collection.extend({
		
		model: Location

	});

	return Collection;
});