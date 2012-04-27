/**
 * Main application model. A collection of map models
 * @fileoverview
 */
define(['tab', 'map'], function (Tab, map) {
    
    var _silent = { silent: true };
    
    /**
     * Create a blank core application backbone model
     * @namespace
     */
    var Core = Backbone.Model.extend({
        
        defaults: {
            
            /**
             * The active tab is whichever tab has control of the map.
             * @type {TabModel}
             */ 
            activeTab: null,
            
            /**
             * Collection of tab models
             * @type {BackboneCollection}
             */
            tabs: new Backbone.Collection
            
        },
        
        /**
         * Init the core model
         * @method
         */
        initialize: function () {
            var self = this,
                tab = new Tab();
            
            // add the first tab to the
            self.get('tabs').add(tab);
            
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
    return new Core();
    
});