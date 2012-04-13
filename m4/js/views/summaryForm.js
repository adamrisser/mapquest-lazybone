/**
 * Summary Form
 * 
 * The summary form is the main driver for the core directions/search 
 * app.  Locations from the user get geocoded (or routed) and then
 * placed into the model.
 * @description
 */
define(['nodes', 'location', 'css!summaryformcss'], function (nodes, Location) {
    
    var _SEARCH_URL = 'http://open.mapquestapi.com/nominatim/v1/search/?addressdetails=1&format=json&q=',
    
    /**
     * Summary form widget
     * @namespace
     */
    SummaryForm = Backbone.View.extend({
        
        /**
         * Parent element
         * @type {HTMLElement}
         */
        el: '#summaryForm',
        
        /**
         * Delegated events
         * @type {Object}
         */
        events: {
            'click #summaryFormBtn' : 'submit'
        },
        
        /**
         * init the summary form
         * @method
         */
        initialize: function () {
            _.bindAll(this, 'handleResponse', 'fetch');
        },
        
        /**
         * Fetch the data based off of the query
         * @param {Object} config query
         */
        fetch: function (query) {
            return $.ajax({
                dataType: 'json',
                url: _SEARCH_URL + query
            });
        },
        
        /**
         * Submit the Summary Form. Load the service util if not present
         * @method
         */
        submit: function () {
            var self = this,
                query = nodes.summaryFormTin.val();
            
            if (query) {
                require(['services', 'results'], function (service) {
                    
                    // got a query and js to back it? make the request
                    // and process results into the model
                    $.when(
                        self.fetch(query)
                    ).pipe(
                        self.convertToLocs
                    ).done(
                        self.handleResponse
                    );
                });
            }
        },
        
        /**
         * Convert reponse object into models
         * @param {Object} response
         * @method
         * @return {Array<Model>}
         */
        convertToLocs: function (response) {
            return _(response).map(function (loc) {
                return new Location(loc);
            });
        },
        
        /**
         * Injest a response into the site
         * @param {Array<Model>} models
         * @method
         */
        handleResponse: function (models) {
            var model = m4.model.Core;
            
            model.get('activeTab').get('locations').reset(models);
            
            // save the new mapState
            model.setActiveState();
        }
        
    });
    
    // export
    return new SummaryForm();
    
});