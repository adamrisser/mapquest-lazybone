/**
 * Search Form
 * 
 * The search form is the main driver for the core directions/search 
 * app.  Locations from the user get geocoded (or routed) and then
 * placed into the model.
 * @description
 */
define([
    'backbone',
    'core/models/location', 
    'less!core/css/searchform',
    'css!twittercss'
], function (Backbone, Location) {
    
    /**
     * Search controller url
     * @type {String}
     * @private
     */
    var _SEARCH_URL = 'http://www.mapquest.com/_svc/searchio?',
    
    /**
     * Summary form widget
     * @namespace
     */
    SearchForm = Backbone.View.extend({
        
        /**
         * Delegated events
         * @type {Object}
         */
        events: {
            'click #searchFormBtn' : 'submit'
        },
        
        /**
         * init the summary form
         * @param {Backbone.View} options.core winston application
         * @constructor
         */
        initialize: function (options) {
            var self = this,
            
            router = self.router = options.core.router;
            
            self.map   = options.core.map;
            self.model = options.core.model;
            
            _.bindAll(self, 'handleResponse', 'setRoute');
            
            router.on('route:map',    self.handleRouting, self);
            router.on('route:search', self.handleRouting, self);
        },
        
        /**
         * Handle a new page load.
         * @param {String|Backbone.View} query search query or *this* 
         * @method
         */
        handleRouting: function (query) {
            $('#searchFormTin').val(query.replace(/\+/g, ' '));
            this.submit();
        },
        
        /**
         * Submit the Summary Form. Load the service util if not present
         * @method
         */
        submit: function () {
            var query = $('#searchFormTin').val();
            
            if (query) {
                $.when(
                    this.fetch(query)
                // is 
                ).done(
                    this.handleResponse,
                    this.setRoute
                );
            }
        },
        
        /**
         * Fetch the data based off of the query
         * @param {Object} query
         */
        fetch: function (query) {
            var ll = this.map.mqa.getCenter();

            return $.ajax({
                url: _SEARCH_URL,
                data: {
                    query0: query,
                    mapSearchArea: '(' + ll.lat + ', ' + ll.lng + ', 27734002, 1247, 756, 1.0, 1.0)',
                    key: 'mjtd%7Clu6t2hu725%2Cr5%3Do5-la7x5'
                },
                dataType: 'json'
            });
        },
        
        /**
         * Injest a response into the site
         * @param {Object} response ajax response
         * @method
         */
        handleResponse: function (response) {
            this.model.set({
                location: new Location(response[0]) 
            });
        },
        
        /**
         * Record the route in history
         * @method
         */
        setRoute: function () {
            var query = $('#searchFormTin').val().replace(/\s/g, '+'),
                state = this.model.get('state');
            
            this.router.navigate('#/' + state + '/' + query, {
                trigger: true
            });
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            var self = this,
                router = self.router;
                
            router.off('route:map',    self.handleRouting);
            router.off('route:search', self.handleRouting);
            
            self.off();
        }
        
    });
    
    // export
    return SearchForm;
    
});