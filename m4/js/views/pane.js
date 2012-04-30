/**
 * Summary pane that compliments the map.
 * 
 * The summary pane appears on the left for languages that read left to right
 * and on the right for languages that do the opposite.  The summary holds
 * all the information that compliments the map. The pane can also be collapse 
 * to give the map more space on the page.
 * @fileoverview
 */
define(['core', 'directions', 'css!panecss'], function (coreModel, Directions) {
    
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
            
            _.bindAll(self, 'handleStateChange');
            
            coreModel.bind('change:state', self.handleStateChange);
            
            // handle the state once, because it get set first
            self.handleStateChange(coreModel, coreModel.get('state'));
        },
        
        /**
         * Handle a core model state change
         * @param {Backbone.Model} core  core model reference
         * @param {String}         state state string
         * @method
         */
        handleStateChange: function (core, state) {
            var self = this, app,
            
            appHash = {
                'directions': 'directions',
                'map'       : 'mapresult',
                'search'    : 'searchresults',
                'index'     : 'directory',
            };
            
            // does the state have a valid app?
            if (app = appHash[state]) {
                
                // clear previous
                self.$el.empty();
                
                // load the new app
                require([app], function (App) {
                    self.push(new App());    
                });
            }
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