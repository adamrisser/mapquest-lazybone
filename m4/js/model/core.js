/**
 * Main application model. A collection of map models
 * @fileoverview
 */
define(['tab'], function (Tab) {
    
    var _silent = { silent: true };
    
    /**
     * Create a blank core application backbone model
     * @namespace
     */
    var Model = Backbone.Model.extend({
        
        /**
         * Init the core model
         * @method
         */
        initialize: function () {
            var self = this,
                tab = new Tab();
            
            /**
             * Collection of tab models
             * @type {BackboneCollection}
             */
            self.set({ tabs: new Backbone.Collection }, _silent);
            
            // add the first tab to the
            self.get('tabs').add(tab);
            
            /**
             * The active tab is whichever tab has control of the map.
             * @type {TabModel}
             */ 
            self.set({ activeTab: tab }, _silent);
        },
        
        /**
         * Set the active tab's map state
         * @method
         */
        setActiveState: function () {
            var tab = this.get('activeTab');
            tab.setState(m4.map.mqa);
            this.trigger('change:activeMapState', tab);
        }
        
    });
    
    // Export into public namespace
    return Model;
    
});