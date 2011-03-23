(function () {
    
    /**
     * Create an instance of a MQA tile map
     * @fileoverview
     */
    
    /**
     * Default center
     * @private
     */
    var center = {
        lat:   39.743943,
        lng: -105.020089
    };
    
    /**
     * Resize the pane based off of the window height
     * @private
     */
    function _resize (mqa) {
        var paneW = __nodes.pane.get(0).offsetWidth,
            h = __window.innerHeight || 0,
            w = __window.outerWidth - paneW;
        
        __nodes.map.css({
            height: h + 'px',
            width:  (w > 0 ? w : 0) + 'px'
        });
        
        mqa.setSize(); // resize the map to its parent div
    }
    
    /**
     * @namespace
     */
    function MapBuilder () {
        var self = this;
        
        self.mqa = new MQA.TileMap(m4.nodes.map[0], 7, center, 'map');
        
        // resize once
        _resize(self.mqa);
        
        // resize map based off of window height/width
        __util.resizer.subscribe('mapbuilder', function () {
            _resize(self.mqa);
        });
    }
    
    MapBuilder.prototype = {
        
    };
    
    /*
     * Export into public namespace. Assign the new widget into the namespace
     * to prevent it from being lazy loaded on each new instantiation
     */
    m4.dotcom.widgets.Map = MapBuilder;
    
}());