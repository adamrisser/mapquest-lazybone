/**
 * Main application model. A collection of map models
 * @fileoverview
 */
define(['js/model/tab.js'], function (Tab) {
    
    /**
     * Create a blank core application backbone model
     * @namespace
     */
    var Model = Backbone.Collection.extend({
        
        model: Tab,
        
        initialize: function () {
            var tab = new Tab();
            this.add(tab);
            this.activeTab = tab; 
        }
        
    });
    
    // Export into public namespace
    return Model;
    
});