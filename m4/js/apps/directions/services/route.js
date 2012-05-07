define(function() {

    /**
     * Our routing services.
     * @type {Object}
     */
    var route = {

        SEARCH_URL: 'http://open.mapquestapi.com/nominatim/v1/search',

        /**
         * Invokes the search service and set the result on the model object.
         * @param  {Object}         location the location of the object that is being resolved
         * @param  {Function}       (optional) callback when complete
         * @return {Promise}            
         */
        search: function(location, callback) {
            var input = location.get('input');

            return $.ajax({
                url: this.SEARCH_URL,
                data: {
                    format: 'json',
                    q: input
                },
                cache: true,
                dataType: 'jsonp',
                jsonp: 'json_callback'
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
            var stops = query.get('stops'),
                addresses = [],
                deferred = new $.Deferred();

            stops.each(function(stop, idx) {
                addresses.push({ latLng: { lat: stop.get('results')[0].lat, lng: stop.get('results')[0].lon }});
            });

            MQA.withModule('directions', function() {
                map.addRoute(addresses, {}, function(narrative) { deferred.resolve(narrative); });
            });

            return deferred.promise();
        }

    };

    return route;
});