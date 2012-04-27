/**
 * Summary Form
 * 
 * The summary form is the main driver for the core directions/search 
 * app.  Locations from the user get geocoded (or routed) and then
 * placed into the model.
 * @description
 */
define(['nodes', 'location', 'core', 'css!summaryformcss'], function (nodes, Location, coreModel) {
    
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
            
            var ll = m4.map.mqa.getCenter();

            return $.ajax({
                url: _SEARCH_URL,
                data: {
                    query0: query,
                    mapSearchArea: '(' + ll.lat + ', ' + ll.lng + ', 27734002, 1247, 756, 1.0, 1.0)',
                    key: 'mjtd%7Clu6t2hu725%2Cr5%3Do5-la7x5',
                },
                dataType: 'json'
            });
        },
        
        /**
         * Submit the Summary Form. Load the service util if not present
         * @method
         */
        submit: function () {
            var self = this, query = nodes.summaryFormTin.val();
            
            if (query) {
                require(['results'], function (service) {
                    $.when(
                        self.fetch(query)
                    ).pipe(
                        self.convertToLoc
                    ).done(
                        self.handleResponse
                    );
                });
            }
        },
        
        /**
         * Convert reponse object into models
         * @param  {Object} response
         * @return {Backbone.Model}
         * @method
         */
        convertToLoc: function (response) {
            if (response && response[0]) {
                return new Location(response[0]);
            }
        },
        
        /**
         * Injest a response into the site
         * @param {{Backbone.Model}} loc
         * @method
         */
        handleResponse: function (loc) {
            coreModel.set({ location: loc });
        }
        
    });
    
    // export
    return new SummaryForm();
    
});