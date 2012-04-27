define(['backbone'], function(Backbone) {

	var Router = Backbone.Router.extend({

		routes: {
			"": "index", 
			"signin": "signin",
			"directions": "directions"
		},

		index: function() {
			console.log('index');
		},

		signIn: function() {
			console.log('signing in');
		},

		directions: function() {
			console.log('directions');
		}

	});

	return new Router;

});