/**
 * Summary Form
 * 
 * The summary form is the main driver for the core directions/search 
 * app.  Locations from the user get geocoded (or routed) and then
 * placed into the model.
 * @description
 */
define(['router', 'location', 'core', 'tmpl!searchformhtml', 'css!searchformcss'], function (router, Location, coreModel, template) {
    
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
         * Parent element
         * @type {HTMLElement}
         */
        el: '#searchForm',
        
        /**
         * Delegated events
         * @type {Object}
         */
        events: {
            'click #searchFormBtn' : 'handleRouting'
        },
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * init the summary form
         * @method
         */
        initialize: function () {
            var self = this;
            
            _.bindAll(self, 'handleRouting');
            
            router.bind('route:map',    self.handleRouting);
            router.bind('route:search', self.handleRouting);
            
            self.render();
        },
        
        /**
         * Render the summary form
         * @method
         */
        render: function () {
            this.$el.append(this.template());
            
            return this;
        },
        
        /**
         * Handle a new page load.
         * @param {String} query search query
         * @method
         */
        handleRouting: function (query) {
            
            if (_.isString(query)) {
                $('#searchFormTin').val(query.replace('+', ' '));    
            }
            
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
                    this.handleResponse
                );
            }
        },
        
        /**
         * Fetch the data based off of the query
         * @param {Object} config query
         */
        fetch: function (query) {
            
            var ll = m4.views.map.mqa.getCenter();

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
         * Injest a response into the site
         * @param {Object} response ajax response
         * @method
         */
        handleResponse: function (response) {
            if (response && response[0]) {
                coreModel.set({
                    location: new Location(response[0]) 
                });
            }
        }
        
    });
    
    // export
    return SearchForm;
    
});