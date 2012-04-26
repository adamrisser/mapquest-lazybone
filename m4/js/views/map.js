/**
 * Create an instance of a MQA tile map
 * The tilemap gets loaded under window.MQA  
 * @fileoverview
 */
define(['nodes', 'resizer', 'location', 'tab', 'core', 'css!mapcss', 'http://open.mapquestapi.com/sdk/js/v6.1.0/mqa.toolkit.js'], 
function (nodes, resizer, LocationModel, TabModel, coreModel) {
    
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
     * Map builder widget
     * @namespace
     */
    var Map = Backbone.View.extend({
        
        /**
         * Tilemap instance
         * @type {MQA}
         * @param
         */
        mqa: null,
        
        /**
         * Build a MQA Tile map
         * @param {Object} config {
         *     center {lat/lng}
         *     zoom   {Number}
         * }
         * @method
         */
        initialize: function (config) {
            
            var self = this,
                mqa = new MQA.TileMap(nodes.map[0], config.zoom, config.center, 'map');
            
            // resize once
            _resize(mqa);
            
            // resize map based off of window height/width
            resizer.subscribe('mapbuilder', function () {
                _resize(mqa);
            });
            
            coreModel.bind('change:activeMapState', function (tab) {
                
                // add a simple poi for each location
                tab.get('locations').each(function (loc) {
                    mqa.addShape(new MQA.Poi(loc.get('latLng')));
                });
                
                self.bestFit();
            });
            
            this.mqa = mqa;
        },
        
        /**
         * Best fit the map and trigger event
         * @method
         */
        bestFit: function () {
            this.mqa.bestFit();
            this.trigger('bestFit');
        }
        
    });
    
    // Export into public namespace.
    return Map;
    
});