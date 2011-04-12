/**
 * A utility for calling out to services, such as search, geocode, reverse
 * geocode, routing, etc.
 * @fileoverview
 */
define(function () {
    
    var _SEARCH_URL = 'http://open.mapquestapi.com/nominatim/v1/search/?addressdetails=1&format=json&q=',
    
    /**
     * @namespace
     */
    Service = {
        
        /**
         * Call search service
         * @param {Object} config query and callback
         */
        search: function (config) {
            $.ajax({
                dataType: 'json',
                url: _SEARCH_URL + config.query,
                success: config.callback
            });
        }
        
    };
    
    // Export
    return Service;
    
});