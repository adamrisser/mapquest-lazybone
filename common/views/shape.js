/**
 * A shape for the toolkit
 * @fileOverview
 */
define(['vibe/shapeutil'], function (shapesUtil) {
    
    var Shape = Backbone.View.extend({
        
        /**
         * Initialize the poi
         * @param {Array}  options.geometry   shape points
         * @param {Object} options.properties shape properties
         * @constructor
         */
        initialize: function (options) {
            _.extend(this, options);
            
            var shape = this.shape = new MQA.PolygonOverlay();
            
            shape.setShapePoints(shapesUtil.flattenPoints(options.geometry));
            shape.updateProperties(options.properties);
        },
        
        /**
         * Return the mqa shape for toolkit processing
         * @return {MQA.Poi}
         * @method
         */
        toMQA: function () {
            return this.shape;
        }
        
    });
    
    return Shape;
    
});
