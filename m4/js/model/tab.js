/**
 * Tab model.
 *     - Multiple maps belong to one core app model.
 *     - One map model can contain multiple locations and multiple routes
 * @fileoverview
 */
define(['js/model/location.js', 'js/model/route.js'], function (Location, Route) {
    
    /**
     * Tab model.  One map state
     * @namespace
     */
    var Tab = Backbone.Collection.extend({
        
        routes: [],
        
        locations: [],
        
        initialize: function () {
            
        },
        
        addLocation: function (locationModel) {
            this.locations.push(locationModel);
            this.add(locationModel);
        }
        
    });
    
    // export
    return Tab;
});