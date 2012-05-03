/**
 * Vibe app controll
 * 
 * Central brain of the vibe app. Instantiates the vibe model and makes
 * the calls to the vibe api.  Sets information from the responses onto the
 * vibe model for the other vibe views to bind on.
 * @description
 */
define(['router', 'base', 'vibepois', 'hood', 'hoodsummary', 'vibemodel'], function (router, Base, VibePois, VibeHood, HoodSummary, VibeModel) {
    
    /**
     * An individual neighborhood object.
     */
    var VibeController = Backbone.View.extend({
        
        /**
         * Parent
         * @type {String}
         * @property
         */
        el: '#pane',
        
        /**
         * Vibe model
         * @type {Backbone.Model}
         * @property
         */
        model: null,
        
        /**
         * Initialize this hood.
         * @param {Array}  routeFragments route fragments that initialized the app
         * @constructor        
         */
        initialize: function (routeFragments) {
            var self = this, 
                model = self.model = new VibeModel();
            
            // init the vibe views
            self.summary = new HoodSummary(model);
            self.hood    = new VibeHood(model),
            self.pois    = new VibePois(model);
            
            // this basically starts the show
            model.set('placeId', routeFragments[0]);
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.model = null;
            
            self.hood.dispose();
            self.pois.dispose();
            self.summary.dispose();
            
            self.hood = null;
            self.pois = null;
            self.summary = null;
            
            self.unbind();
            self.$el.empty();
        }
        
    }, Base.prototype);
    
    return VibeController;
});