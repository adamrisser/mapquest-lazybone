/**
 * Summary pane that compliments the map.
 * 
 * The summary pane appears on the left for languages that read left to right
 * and on the right for languages that do the opposite.  The summary holds
 * all the information that compliments the map. The pane can also be collapse 
 * to give the map more space on the page.
 * @fileoverview
 */
define(['core', 'directions', 'router', 'css!panecss'], function (coreModel, Directions, router) {
    
    /**
     * Pane widget
     * @type {Backbone.View}
     */
    var Pane = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
        /**
         * Initialize the Pane view
         * @constructor
         */
        initialize: function () {
            var self = this;
            
            _.bindAll(self, 'handleStateChange', 'handleIndex', 'handleIndex', 
                'handleSearchResult', 'handleMapResult', 'handleDirections');
            
            //TODO: see if this router can be removed
            router.bind('route:index',      self.handleIndex);
            router.bind('route:directions', self.handleDirections);
            
            coreModel.bind('change:state', self.handleStateChange);
        },
        
        /**
         * Handle a core model state change
         * @param {Backbone.Model} core  core model reference
         * @param {String}         state state string
         * @method
         */
        handleStateChange: function (core, state) {
            var self = this;
            
            switch (state) {
                case 'directions':
                    self.handleDirections();
                    break;
                case 'map':
                    self.handleMapResult();
                    break;
                case 'search':
                    self.handleSearchResult();
                    break;
                case 'index':
                    self.handleIndex();
                break;
            }
        },
        
        /**
         * Handle routes to the index page
         * @method
         */
        handleIndex: function () {
            var self = this;
            
            require(['directory'], function (Directory) {
                self.push(new Directory());    
            });
        },
        
        /**
         * Handle routes to the
         * @method
         */
        handleMapResult: function () {
            var self = this;
            
            require(['mapresult'], function (MapResult) {
                self.$el.empty();
                self.push(new MapResult());
                
                //TODO: probably needs to be removed and be handled by the map
                m4.views.map.mqa.bestFit();
            });
        },
        
        /**
         * Handle routes to the
         * @method
         */
        handleSearchResult: function () {
            var self = this;
            
            require(['searchresults'], function (SearchResults) {
                self.$el.empty();
                self.push(new SearchResults());
                
                //TODO: probably needs to be removed and be handled by the map
                m4.views.map.mqa.bestFit();
            });
        },
        
        /**
         * Handle routes to the
         * @method
         */
        handleDirections: function () {
            var self = this;
            
            require(['directions'], function (Directions) {
                self.$el.empty();
                self.push(new Directions());    
            });
        },
        
        /**
         * Add html into the pane from a backbone view. 
         * Note: The backbone view must support returning itself from 
         *       its own view method!
         * @param {Backbone.View} view  backbone view
         * @method
         */
        push: function(view) {
            this.$el.append(view.render().el);
        },
        
        /**
         * Open the pane if it is closed
         * @method
         */
        open: function () {
            this.$el.show();
        },
        
        /**
         * Close the pane if it is open
         * @method
         */
        close: function () {
            this.$el.hide();
        }
        
    });
    
    /*
     * Export
     */
    return Pane;
    
});