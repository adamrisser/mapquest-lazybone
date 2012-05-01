/**
 * Vibe 'neighborhood of the day' app
 * @fileoverview
 */
define(['map'], function (map) {
    
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
            
        }
        
    });
    
    // Export
    return VibeModel;
    
});