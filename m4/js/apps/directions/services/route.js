define(function() {

	/**
	 * Our routing services.
	 * @type {Object}
	 */
	var route = {

		SEARCH_URL: 'http://open.mapquestapi.com/nominatim/v1/search',

		/**
		 * Invokes the search service and set the result on the model object.
		 * @param  {Object}   		location the location of the object that is being resolved
		 * @param  {Function} 		(optional) callback when complete
		 * @return {Promise}            
		 */
		resolve: function(location, callback) {
			var input = location.input;

			return $.ajax({
                url: SEARCH_URL,
                data: {
                    format: 'json',
                    q: input
                },
                cache: true,
                dataType: 'jsonp',
                jsonp: 'json_callback',
                success: function(data) { location.set('stops'); }
            });
		},

		/**
		 * Give a route query executes the route and calls the appropriate callback.
		 * @param  {Object}   map      the current map
		 * @param  {Object}   query    model object representing the query
		 * @param  {Function} callback to execute when complete
		 * @return {Promise}           
		 */
		route: function(map, query, callback) {
			var locs = [],
				promises = [],
				stops = query.get('stops'),
				promise;

			stops.each(function(stop, idx) {
				promise = this.resolve(stop.input);
				promises.push(promise);
			});

			$.when(promises).done(function() {
				stops.each(function(stop, idx) {
					locs.push({ latLng: { lat: stop.lat, lng: stop.lon }});
				});
			});
		}

	};

	return route;
});