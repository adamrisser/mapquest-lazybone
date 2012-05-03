/**
 * Park Geometry - Draws the park onto the map
 * 
 * View for putting neighborhood shapes on the map
 * @description
 */
define(['vibeutil'], function (util) {
    
    var _API_URL = 'http://mqvibe-api.mapquest.com/places/search',
    
    ParksGeom = Backbone.View.extend({
        
        /**
         * Initialize the hood view.
         * @param {Backbone.Model} model vibe model 
         * @constructor        
         */
        initialize: function (model) {
            var self = this;
            
            self.model = model;
            
            self.map = m4.views.map;
            
            _.bindAll(self, 'render');
            
            model.bind('change:geometry', this.render);
        },
        
        /**
         * Render our neighborhood and all it's pois for the category.
         * @param  {Object}        core core model
         * @param  {Object}        geom park geometry
         * @return {Backbone.View} this
         * @method
         */
        render: function (core, geom) {
            var self = this;
            
            MQA.withModule('shapes', function () {
                var overlay = new MQA.PolygonOverlay(),
                    shapePoints = util.flattenPoints(geom);
                
                overlay.setShapePoints(shapePoints);
                overlay.updateProperties({
                    color: '#000000',
                    colorAlpha: .2,
                    borderWidth: 2,
                    fillColor: '#075053',
                    fillColorAlpha: .1    
                });
                         
                self.map.mqa.addShape(overlay);                
                
                // add to the map and best fit
                self.map.bestFit();
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.unbind();
        }
        
    });
    
    return ParksGeom;
});