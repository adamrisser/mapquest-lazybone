/**
 * Main application model
 * @fileoverview
 */
define(['js/model/location.js'], function (Location) {
    
    /**
     * Create a blank core application backbone model
     * @namespace
     */
    var Model = Backbone.Collection.extend({
        
        model: Location,
        
        initialize: function () {
            
        }
        
    });
    
    /*
     * Export into public namespace
     */
    return Model;
    
});