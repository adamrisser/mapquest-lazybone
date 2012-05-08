/**
 * Main application model. A collection of map models
 * @fileoverview
 */
define(['backbone'], function (Backbone) {
    
    /**
     * Create a blank core application backbone model
     * @namespace
     */
    var Core = Backbone.Model.extend({
        
        defaults: {
            
            /**
             * Location representing the last search a user a user made
             * @type {Backbone.Model}
             */
            location: null,
            
            /**
             * An easy way to tell the state of the model
             * - index
             * - map
             * - directions
             * - search
             * @type {String}
             */
            state: 'index'
        },
        
        /**
         * Init the core model
         * @method
         */
        initialize: function () {
            var self = this;
            
            _.bindAll(self, 'setState');
            
            self.bind('change:location', self.setState);
        },
        
        /**
         * Set the model's state
         * @method
         */
        setState: function () {
            var loc = this.get('location'), state, query;
            
            if (loc.get('unresolvedLocations').length > 0) {
                state = 'search';
            }
            else {
                state = 'map';
            }
            
            this.set({ state: state });
        }
        
    });
    
    // Export into public namespace
    return Core;
    
});