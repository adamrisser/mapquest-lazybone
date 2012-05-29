/**
 * Places model
 * @fileoverview
 */
define(function () {
    
    /**
     * Collection of locs
     * @type {Backbone.Collection}
     * @private
     */
    var LocationCollection = Backbone.Collection.extend(),
    
    /**
     * Create a parks model
     * @type {Backbone.Model}
     */
    PlacesModel = Backbone.Model.extend({
        
        /**
         * Used for debugging
         * DO NOT TIE TO FUNCTIONALITY
         * @type {String}
         */
        __name: 'placesmodel',
        
        defaults: {
            
            /**
             * User search query. Drives the search app.
             */
            query: undefined,
            
            /**
             * Pois for search results
             * @type {Backbone.Collection}
             */
            pois: new LocationCollection(),
            
            /**
             * Locations for search results
             * @type {Backbone.Collection}
             */
            location: new LocationCollection() 
            
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            this.off();
            this.destroy();
        }
        
    });
    
    // Export
    return PlacesModel;
    
});