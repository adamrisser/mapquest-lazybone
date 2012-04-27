/**
 * A model representation of a location. 
 * Each location in the main application model is stored as a location model.
 * @fileoverview
 */
define(function () {
    
    /**
     * A location backbone model
     * @namespace
     */
    var Location = Backbone.Model.extend({
        
        /**
         * Init the location
         * @param {Object} loc
         * @method
         */
        initialize: function (loc) {
            // no-op
        }
        
    });
    
    // Export into public namespace
    return Location;
});