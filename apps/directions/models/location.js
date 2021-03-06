define(['backbone'], function (Backbone) {

	var Stop = Backbone.Model.extend({

		defaults: {

			type: 'stop',

			/**
			 * The user entered location.
			 * @type {String}
			 */
			input: null,

			/**
			 * The geocoded/search results
			 * @type {Array}
			 */
			results: null

		}

	});

	return Stop;

});