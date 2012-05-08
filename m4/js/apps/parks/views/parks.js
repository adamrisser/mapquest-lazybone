/**
 * Parkquest App Controller
 * 
 * Central brain of the parkquest app. Instantiates the parkquest model and 
 * views. Responsible for cleaning up everything on dispose.
 * @description
 */
define([
    'parks/models/parks', 
    'parks/views/pois', 
    'parks/views/geom', 
    'parks/views/summary'
], function (ParksModel, ParksPois, ParksGeom, ParksSummary) {
    
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
         * @param {Array}        frags route fragments that initialized the app
         * @param {BackboneView} core  core  winston application
         * @constructor        
         */
        initialize: function (frags, core) {
            var self = this, 
                model = self.model = new ParksModel(),
                map = core.map;
            
            self.pois = new ParksPois(model, map);
            self.geom = new ParksGeom(model, map);
            
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
        
    });
    
    // export
    return ParksController;
    
});