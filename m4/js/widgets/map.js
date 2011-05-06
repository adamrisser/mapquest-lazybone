/**
 * Create an instance of a MQA tile map
 * The tilemap gets loaded under window.MQA  
 * @fileoverview
 */
define(['js/nodes.js', 'js/util/resizer.js', 'css!css/map.css',
'http://open.mapquestapi.com/sdk/js/v6.1.0/mqa.toolkit.js'], 
function (nodes, resizer) {
    
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
        
        // resize the map to its parent div
        mqa.setSize(); 
    }
    
    /**
     * Default center location (Denver, CO)
     * @private
     */
    var _center = {
        lat:   39.743943,
        lng: -105.020089
    },
    
    /**
     * Map builder widget
     * @namespace
     */
    MapBuilder = {
        
        /**
         * Build a MQA Tile  map
         * @method
         */
        build: function () {
            
            var mqa = new MQA.TileMap(nodes.map[0], 7, _center, 'map');
            
            // resize once
            _resize(mqa);
            
            // resize map based off of window height/width
            resizer.subscribe('mapbuilder', function () {
                _resize(mqa);
            });
            
            return mqa;
        }
    };
    
    // Export into public namespace.
    return MapBuilder;
    
});