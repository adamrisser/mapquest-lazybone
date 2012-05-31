/**
 * The main application which is 'winston lite' 
 * @fileOverview
 */
define([
    'core/routers/router', 
    'core/views/pane', 
    'core/views/map/map', 
    'core/views/searchform', 
    'core/views/navbar', 
    'core/models/core',
    'backbone'
], function (Router, Pane, Map, SearchForm, NavBar, CoreModel, Backbone) {
    
    "use strict";
    
    // not the aim blast
    var WinstonCore = Backbone.View.extend({
        
        /**
         * Init the core application
         * @constructor
         */
        initialize: function () {
            var self = this;
            
            /**
             * Backbone router. Handles state changes in the URL
             * @type {Backbone.Router}
             */
            self.router = new Router({ core: self });
            
            /**
             * Main application model. A collection of map models
             * @type {Backbone.Model}
             */
            self.model = new CoreModel({ core: self });
            
            /**
             * Main map
             * @type {Backbone.View}
             */
            self.map = new Map({
                core: self,
                zoom: 4,
                center: {
                    lat:   39.743943,
                    lng: -105.020089
                }
            });
            
            /**
             * Main info pane that accompanies the map. Used to show
             * information about searches, directions etc. 
             * @type {Backbone.View}
             */
            self.pane = new Pane;
            
            /**
             * Top navigation for the site
             * @type {Backbone.View}
             */
            self.navBar = new NavBar({ hash: Backbone.history.getHash() });
            
            /**
             * Main entry form for the site
             * @type {Backbone.View}
             */
            self.searchForm = new SearchForm({ el: '#searchForm', core: self });
            
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            //TODO: switch to proper dispose methods (not unbinds)
            var self = this;
            self.model.off();
            self.router.off();
            self.map.off();
            self.map.pane.off();
            self.map.searchForm.dispose();
        }
    });
   
    // export
    return WinstonCore;
    
});
