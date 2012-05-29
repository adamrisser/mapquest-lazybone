/**
 * Vibe 'neighborhood of the day' app
 * @fileoverview
 */
define(['backbone'], function (Backbone) {
    
    /**
     * Collection of pois from the vibe api
     * @type {Backbone.Collection}
     * @private
     */
    var PoiCollection = Backbone.Collection.extend(),
    
    /**
     * Create a blank core application backbone model
     * @type {Backbone.Model}
     */
    VibeModel = Backbone.Model.extend({
        
        defaults: {
            
            /**
             * Place ID of the vibe neighborhood of the day
             * @type {Number}
             */
            placeId: null,
            
            /**
             * Neighborhood location object
             * @type {Object}
             */
            hood: null,
            
            /**
             * Pois in the current neighborhood defined by the placeId
             * @type {Backbone.Collection}
             */
            pois: new PoiCollection()
            
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            this.off();
            
            var pois = this.get('pois');
            
            pois.each(function (poi) {
                poi.off();
            });
            
            pois.off();
            this.destroy();
        }
        
    });
    
    // Export
    return VibeModel;
    
});