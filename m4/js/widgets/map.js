/**
 * Create an instance of a MQA tile map
 * The tilemap gets loaded under window.MQA
 * NOTE: do NOT use toolkit, its undefined and only an argument placeholder.  
 * @fileoverview
 */
define(['http://open.mapquestapi.com/sdk/js/v6.1.0/mqa.toolkit.js', 'js/nodes.js', 
'js/util/resizer.js', 'css!css/map.css'], function (toolkit, nodes, resizer, css) {
    
    /**
     * Resize the pane based off of the window height
     * @private
     */
    function _resize (mqa) {
        var h = window.innerHeight || 0,
            w = window.outerWidth;
        
        nodes.map.css({
            height: h + 'px',
            width:  (w > 0 ? w : 0) + 'px'
        });
        
        mqa.setSize(); // resize the map to its parent div
    }
    
    /**
     * @namespace
     */
    function MapBuilder () {
        
    }
    
    MapBuilder.prototype = {
        
        /**
         * Build a MQA Tile  map
         * @method
         */
        build: function () {
            var self = this,
            
            // denver, co
            center = {
                lat:   39.743943,
                lng: -105.020089
            };
        
            self.mqa = new MQA.TileMap(nodes.map[0], 7, center, 'map');
            
            // resize once
            _resize(self.mqa);
            
            // resize map based off of window height/width
            resizer.subscribe('mapbuilder', function () {
                _resize(self.mqa);
            });
        }
    };
    
    /*
     * Export into public namespace.
     */
    return MapBuilder;
    
});