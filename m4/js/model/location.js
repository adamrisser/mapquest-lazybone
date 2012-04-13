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
            
            this.set({
                /**
                 * Location Name
                 * @type {Object}
                 */
                name: loc.display_name,
                
                /**
                 * Address
                 * @type {Object}
                 */
                address: loc.address,
                
                /**
                 * Address
                 * @type {Object}
                 */
                latLng: {
                    lat: loc.lat,
                    lng: loc.lon  
                }
                
            }, {
                silent: true 
            });
        }
        
    });
    
    // Export into public namespace
    return Location;
});