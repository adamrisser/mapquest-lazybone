/**
 * Main application model. A collection of map models
 * @fileoverview
 */
define(['tab', 'location'], function (Tab, LocationModel) {
    
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
            self.set({
                tabs: new Backbone.Collection
            }, {
                silent: true
            });
            
            // add the first tab to the
            self.get('tabs').add(tab);
            
            /**
             * The active tab is whichever tab has control of the map.
             * @type {TabModel}
             */ 
            self.set({
                activeTab: tab
            }, {
                silent: true
            });
            
            /*
            m4.map.bind('bestFit', function () {
                self.setActiveState();
            });
            */
        },
        
        /**
         * Injest a response into the site
         * @param {Object} response
         * @method
         */
        handleResponse: function (response) {
            var model = this.get('activeTab');
            
            // load each location returned as a separate location model
            $(response).each(function (i, loc) {
                console.info('test');
                model.get('locations').add(new LocationModel(loc));
            });
            
            // save the new mapState
            this.setActiveState();
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