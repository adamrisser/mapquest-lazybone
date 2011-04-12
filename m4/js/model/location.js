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
         * Get location address
         * @method
         * @return {Object} Address objects
         */
        getAddress: function () {
            return this.get('address');
        }
        
    });
    
    // Export into public namespace
    return Location;
});