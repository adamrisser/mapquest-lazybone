/**
 * Vibe app controll
 * 
 * Central brain of the vibe app. Instantiates the vibe model and makes
 * the calls to the vibe api.  Sets information from the responses onto the
 * vibe model for the other vibe views to bind on.
 * @description
 */
define(['vibemodel', 'vibepois', 'hood', 'hoodsummary'], function (VibeModel, VibePois, VibeHood, HoodSummary) {
    
    /**
     * Neighborhood vibe URL
     * @type {String}
     */
    var _API_URL = 'http://mqvibe-api.mapquest.com/places/search',
    
    /**
     * An individual neighborhood object.
     */
    VibeController = Backbone.View.extend({
        
        /**
         * Vibe model
         * @type {Backbone.Model}
         */
        model: new VibeModel(),
        
        /**
         * Initialize this hood.
         * @param {Object} config
         * @param {Number} config.placeId neighborhood to render 
         * @constructor        
         */
        initialize: function (config) {
            var self = this,
                model = self.model;
            
            // init the vibe views
            new VibeHood(model),
            new VibePois(model);
            new HoodSummary(model);
            
            // this basically starts the show
            model.set('placeId', config.placeId);
        }
        
    });
    
    return VibeController;
});