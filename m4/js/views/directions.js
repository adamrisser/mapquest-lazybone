define(['underscore', 'backbone', 'text!/m4/html/directions.html'], function (_, Backbone, template) {

	var Directions = Backbone.View.extend({

		/**
		 * Our events
		 * @type {Object}
		 */	
		events: {
			"click #getDir": "getDirections"
		},

		/**
		 * Initialize our template.
		 * @return {void} 
		 */
		initialize: function() {
			this.html = _.template(template);
		},

		/**
		 * Render our search form.
		 * @return {Directions} *this*
		 */
		render: function() {
			this.el.innerHTML = this.html();
			return this;
		},

		/**
		 * Run our route
		 * @return {Directions} *this*
		 */
		getDirections: function() {

		}

	});

	return Directions;

});