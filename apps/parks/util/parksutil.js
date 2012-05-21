/**
 * A utility for park related functions
 * @fileOverview
 */
define(['vibe/shapeutil'], function (util) {
    
    /**
     * Small vibe icon
     * @type {MQA.Icon}
     */
    var _icon = new MQA.Icon('http://content.mqcdn.com/mapbuilder-190/cdn/dotcom3/images/icons/collection/v2/themes/recreation/1.png', 30, 30);
    
    return {
        
        /**
         * Create a park poi
         * @param  {Object}  loc response locations
         * @return {MQA.POI}
         * @method
         */
        createPoi: function (loc) {
            var coords = loc.geometry.coordinates,
                poi = new MQA.Poi(new MQA.LatLng(coords[1], coords[0]));
            
            poi.setIconOffset({
                x: -11, 
                y: -36
            });
            
            poi.setShadow(null);
            poi.setIcon(_icon);
            
            return poi;
        },
        
        /**
         * Create a park poi
         * @param  {Object}    geom shapepoints for park overlay
         * @return {MQA.Shape}
         * @method
         */
        createOverlay: function (geom) {
            
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
            
            return overlay;
        }
        
    };
    
});
