/**
 * Vibe app control
 * 
 * Central brain of the vibe app. Instantiates the vibe model and makes
 * the calls to the vibe api.  Sets information from the responses onto the
 * vibe model for the other vibe views to bind on.
 * @fileOverview
 */
define([
    'vibe/views/pois', 
    'vibe/views/geom', 
    'vibe/views/summary', 
    'vibe/models/vibe'
], function (VibePois, VibeHood, HoodSummary, VibeModel) {
    
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
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core winston application
         * @constructor
         */
        initialize: function (options) {
            var self = this,
                model = self.model = new VibeModel(),
                map = core.map;
            
            // init the vibe views
            self.summary = new HoodSummary(model);
            self.hood    = new VibeHood(model, core);
            self.pois    = new VibePois(model, core);
            
            // this basically starts the show
            model.set('placeId', options.fragments[0]);
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.model.dispose();
            self.hood.dispose();
            self.pois.dispose();
            self.summary.dispose();
            
            self.model = null;
            self.hood = null;
            self.pois = null;
            self.summary = null;
            
            self.off();
            self.$el.empty();
        }
        
    });
    
    return VibeController;
});