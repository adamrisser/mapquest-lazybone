/**
 * A model representation of a location. 
 * Each location in the main application model is stored as a location model.
 * @fileoverview
 */
define(function () {
    
    /**
     * Collection of locations. Used to store unresolved locations for
     * ambiguous locations
     * @type {Backbone.Collection}
     * @private
     */
    var LocationCollection = Backbone.Collection.extend(),
    
    /**
     * A location backbone model
     * @namespace
     */
    Location = Backbone.Model.extend({
        
        /**
         * Model default values
         * @type {Object}
         */
        defaults: {
            
            /**
             * @type {Object}
             */
            address: null,
            
            /**
             * @type {Backbone.Collection}
             */
            unresolvedLocations: null
        },
        
        /**
         * Init the location
         * @param {Object} loc
         * @method
         */
        initialize: function (loc) {
            
            // unresolved locations can't be created in the defaults section
            // or all location models would share the same reference
            this.set({
                unresolvedLocations: new LocationCollection(loc.unresolvedLocations)
            });
        }
        
    });
    
    // Export into public namespace
    return Location;
    
});