define(['backbone'], function (Backbone) {

	var Query = Backbone.Model.extend({

		defaults: {

			routeType: 'driving',

			stops: null
		}

	});

	return Query;

});