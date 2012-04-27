define(['backbone', 'router'], function (Backbone, router) {

	/**
	 * Our directory listing.
	 * @type {Backbone.View}
	 */
	var Directory = Backbone.View.extend({

		el: '#directory',

		events: {
			"click a": "open"
		},

		open: function(event) {
			var tgt = event.target,
				listing = tgt.id
				idx = listing.lastIndexOf('#');

			event.preventDefault();

			listing = listing.substring(idx + 1);

			router.navigate('directions', { trigger: true, replace: true });
		}

	});

	return new Directory;
});