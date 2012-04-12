/**
 * Tab model.
 *     - Multiple maps belong to one core app model.
 *     - One map model can contain multiple locations and multiple routes
 * @fileoverview
 */
define(['location', 'route', 'mapstate'], function (Location, Route, MapState) {
    
    /**
     * Tab model.  One map state
     * @namespace
     */
    var Tab = Backbone.Model.extend({
        
        /**
         * Initialize the tab
         * @method
         */
        initialize: function () {
            this.set({
                // State information about the tab's tilemap
                mapState: new MapState(),
                
                // A Collection of location models
                locations: new Backbone.Collection
            }, { 
                silent: true 
            });
        },
        
        /**
         * Set state from a tilemap
         * @param {Object} tilemap
         */
        setState: function (map) {
            this.get('mapState').set({
                zoom:   map.getZoomLevel(),
                center: map.getCenter()
            });
        }
        
    });
    
    // export
    return Tab;
});