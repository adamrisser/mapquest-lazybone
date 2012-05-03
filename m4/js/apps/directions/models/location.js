define(['backbone'], function (Backbone) {

	Backbone.View.extend({

		default: {

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
			stops: []

		}

	});

});