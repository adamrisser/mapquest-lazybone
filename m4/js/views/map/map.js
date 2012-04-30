/**
 * Create an instance of a MQA tile map
 * The tilemap gets loaded under window.MQA  
 * @fileoverview
 */
define(['resizer', 'location', 'css!mapcss', 'http://open.mapquestapi.com/sdk/js/v6.1.0/mqa.toolkit.js'], 
function (resizer, LocationModel) {
    
    /**
     * Map builder widget
     * @namespace
     */
    var Map = Backbone.View.extend({
        
        el: '#map',
        
        /**
         * Tilemap instance
         * @type {MQA}
         * @param
         */
        mqa: null,
        
        /**
         * Resize the pane based off of the window height
         * @param {MQA} mqa tile map instace
         * @private
         */
         _resize: function () {
            var pane = $('#pane').width(),
                h = window.innerHeight || 0,
                w = window.outerWidth - pane;
            
            // resize the map parent
            this.$el.css({
                left: pane + 'px',
                width: (w > 0 ? w : 0) + 'px',
                height: h + 'px'
            });
            
            // resize the map to its parent div
            this.mqa.setSize(); 
        },
        
        /**
         * Build a MQA Tile map
         * @param {Object} config {
         *     center {lat/lng}
         *     zoom   {Number}
         * }
         * @method
         */
        initialize: function (config) {
            var self = this;
            
            self.mqa = new MQA.TileMap(
                self.el,
                config.zoom,
                config.center,
                'map'
            );
            
            MQA.withModule('largezoom', function() {
                self.mqa.addControl(
                    new MQA.LargeZoom(),
                    new MQA.MapCornerPlacement(MQA.MapCorner.TOP_RIGHT, new MQA.Size(5,5))
                );
            });
            
            _.bindAll(self, '_resize');
            
            // resize once, effectively initializing the map size
            self._resize();
            
            // resize map based off of window height/width
            resizer.subscribe('mapbuilder', this._resize);
            
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
    
    // Export
    return Map;
    
});