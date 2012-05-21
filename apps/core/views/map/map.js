/**
 * Create an instance of a MQA tile map
 * The tilemap gets loaded under window.MQA  
 * @fileoverview
 */
define([
    'resizer', 
    'core/models/location', 
    'less!core/css/map', 
    'http://www.mapquestapi.com/sdk/js/v7.0.s/mqa.toolkit.js?key=mjtd%7Clu6t2hu725%2Cr5%3Do5-la7x5'
], function (resizer, LocationModel) {
    
    /**
     * Map builder widget
     * @namespace
     */
    var Map = Backbone.View.extend({
        
        /**
         * Map parent
         * @type {String}
         * @property
         */
        el: '#map',
        
        /**
         * Tilemap instance
         * @type {MQA}
         * @property
         */
        mqa: null,
        
        /**
         * Resize the pane based off of the window height
         * @param {MQA} mqa tile map instace
         * @private
         */
         _resize: function () {
             //TODO: fix the padding 20 and height 80
            var pane = $('#pane').width() + 20,
                h = window.innerHeight - 80 || 0,
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
         * @param {Backbone.View} options.core
         * @param {Object}        options.center.lat
         * @param {Object}        options.center.lng
         * @param {Object}        options.zoom
         * @method
         */
        initialize: function (options) {
            var self = this, 
                core = self.options.core,
                mqa;
            
            self.mqa = mqa = new MQA.TileMap(self.el, options.zoom, options.center, 'map');
            
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
            
            core.model.get('shapeCollections').on('add', self.addShapeCollection, self);
            core.model.get('shapeCollections').on('update', mqa.bestFit, mqa);
            core.router.on('all', mqa.removeAllShapes, mqa);
        },
        
        /**
         * Add a shape collection to the map
         * @param {Background.View || MQA.ShapeCollection} sc
         * @method
         */
        addShapeCollection: function (sc) {
            this.mqa.addShapeCollection(sc.attributes || sc);
            this.mqa.bestFit();
        },
        
        /**
         * Best fit the map and trigger event
         * @method
         */
        bestFit: function () {
            this.mqa.bestFit();
            this.trigger('bestFit');
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            resizer.unsubscribe('mapbuilder');
            this.off();
        }
        
    });
    
    // Export
    return Map;
    
});