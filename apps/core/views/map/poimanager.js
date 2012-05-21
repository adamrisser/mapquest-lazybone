/**
 * Manager all POIs that display on the map  
 * @fileOverview
 */
define(['location'], function (Location) {
    
    /**
     * Collection of pois
     * @type {Backbone.Collection}
     * @private
     */
    var ShapeCollectionCollection = Backbone.Collection.extend({
        model: Location
    });
    
    /**
     * Initialize a new poi manager
     * @param {Backbone.View} options.map map view
     * @constructor
     */
    function PoiManager (options) {
        _.extend(this, options);
    }
    
    PoiManager.prototype = _.extend({
        
        
        shapeCollections: new ShapeCollectionCollection,
        
        /**
         * @method
         */
        addCollection: function () {
            
        },
        
        /**
         * @method
         */
        removeCollection: function () {
            
        }
        
    }, Backbone.Events);
    
    // Export
    return PoiManager;
    
});