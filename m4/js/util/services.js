(function () {
    
    /**
     * A utility for calling out to services, such as search, geocode, reverse
     * geocode, routing, etc.
     * @fileoverview
     */
    
    var _SEARCH_URL = 'http://open.mapquestapi.com/nominatim/v1/search/?addressdetails=1&format=json&q=';
    
    /**
     * @namespace
     */
    var Service = {
        
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
    
    /**
     * Export into public namespace. Assign the new widget into the namespace
     * to prevent it from being lazy loaded on each new instantiation
     */
    __util.service = Service;
    
}());