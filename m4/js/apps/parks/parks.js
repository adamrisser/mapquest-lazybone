/**
 * Vibe app controll
 * 
 * Central brain of the vibe app. Instantiates the vibe model and makes
 * the calls to the vibe api.  Sets information from the responses onto the
 * vibe model for the other vibe views to bind on.
 * @description
 */
define(['router', 'base', 'parksmodel', 'parkspois', 'parksgeom'], function (router, Base, ParksModel, ParksPois, ParksGeom) {
    
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
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.model = null;
            
            self.unbind();
            self.$el.empty();
        }
        
    }, Base.prototype);
    
    return ParksController;
});