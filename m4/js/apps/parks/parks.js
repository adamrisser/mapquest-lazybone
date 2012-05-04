/**
 * Vibe app controll
 * 
 * Central brain of the vibe app. Instantiates the vibe model and makes
 * the calls to the vibe api.  Sets information from the responses onto the
 * vibe model for the other vibe views to bind on.
 * @description
 */
define(['router', 'base', 'parksmodel', 'parkspois', 'parksgeom', 'parkssummary'], function (router, Base, ParksModel, ParksPois, ParksGeom, ParksSummary) {
    
    /**
     * Parkquest controller
     */
    var ParksController = Backbone.View.extend({
        
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
                model = self.model = new ParksModel();
            
            self.pois = new ParksPois(model);
            self.geom = new ParksGeom(model);
            
            self.summary = new ParksSummary(model);
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.model.dispose();
            self.pois.dispose();
            self.geom.dispose();
            self.summary.dispose();
            
            self.model = null;
            self.pois = null;
            self.geom = null;
            self.summary = null;
            
            self.unbind();
            self.$el.empty();
        }
        
    }, Base.prototype);
    
    // export
    return ParksController;
    
});