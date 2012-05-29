/**
 * places app
 * 
 * This view bootstraps the places app, is responsible to loading
 * places widgets, handling the route state of the app, and cleaning
 * up everything on dispose.
 * @fileOverview
 */
define([
    'places/views/form',
    'places/models/places',
    'places/views/results',
    'core/models/location',
    'tmpl!places/html/places'
], function (form, resultsModel, results, Location, template) {
    
    var Places = Backbone.View.extend({
        
        /**
         * Parent
         * @type {String}
         * @property
         */
        el: '#pane',
        
        /**
         * Search controller url
         * @type {String}
         * @private
         */
        _SEARCH_URL: 'http://www.mapquest.com/_svc/searchio?',
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Initialize this hood.
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core winston application
         * @constructor        
         */
        initialize: function (options) {
            var self = this;
            _.bindAll(self, 'handleResponse', 'setRoute');
            
            self.core   = options.core;
            self.model = new resultsModel();
            
            // add the basic places skeleton divs to the DOM
            self.render();
            
            /**
             * Form used to make searches
             * @type {Backbone.View}
             * @property
             */
            self.form = new form({
                model: self.model
            });
            
            /**
             * Numerated list of found pois
             * @type {Backbone.View}
             * @property
             */
            self.results = new results({ 
                core: options.core,
                model: self.model
            });
            
            // when the query changes, re-load the places
            self.model.on('change:query', self.load, self);
            
            // set up router and handle the first route event
            core.router.on('route:map', self.handleRouting, self);
            
            // fire the event if the app is loading with a query
            // ie. /#/map/pizza+17601
            if (options.fragments[0]) {
                self.handleRouting(options.fragments[0]);
            }
        },
        
        /**
         * Render the places app
         * @return {Backbone.View} this
         * @method
         */
        render: function (el) {
            this.$el.append(this.template());
            return this;
        },
        
        /**
         * Load results into the places app
         * @param {String} query places query string
         * @method
         */
        load: function (query) {
            $.when(
                this.fetch(this.model.get('query'))
            // is 
            ).done(
                this.handleResponse,
                this.setRoute
            );
        },
        
        /**
         * Fetch the data based off of the query
         * @param {Object} query
         */
        fetch: function (query) {
            var ll = this.core.map.mqa.getCenter();

            return $.ajax({
                url: this._SEARCH_URL,
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
         * Handle a new page load. Get the query from the URL and move it 
         * into the search box and into the places model
         * @param {String} query search query 
         * @method
         */
        handleRouting: function (query) {
            query = (query || '').replace(/\+/g, ' ');
            
            $('.placesFormTin').val(query);
            
            this.model.set({
                query: query
            });
        },
        
        /**
         * Record the route in history
         * @method
         */
        setRoute: function () {
            var query = this.model.get('query').replace(/\s/g, '+');
            
            this.core.router.navigate('#/map/' + query, {
                trigger: true
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.model.dispose();
            self.form.dispose();
            self.results.dispose();
            
            self.model = null;
            self.form = null;
            self.results = null;
            
            self.core.router.off('route:map', this.handleRouting);
            
            self.off();
            self.$el.empty();
        }
        
    });
    
    // export
    return Places;
    
});