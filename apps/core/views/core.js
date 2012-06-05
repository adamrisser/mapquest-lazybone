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
         * Backbone router. Handles state changes in the URL
         * @type {Backbone.Router}
         */
        router: null,
        
        /**
         * Main application model. A collection of map models
         * @type {Backbone.Model}
         */
        model: null,
        
        /**
         * Main map
         * @type {Backbone.View}
         */
        map: null,
        
        /**
         * Main info pane that accompanies the map. Used to show
         * information about searches, directions etc. 
         * @type {Backbone.View}
         */
        pane: null,
        
        /**
         * Top navigation for the site
         * @type {Backbone.View}
         */
        navBar: null,
        
        /**
         * Main entry form for the site
         * @type {Backbone.View}
         */
        searchForm: null,
        
        /**
         * Init the core application
         * @constructor
         */
        initialize: function () {
            var self = this, shapes;
            
            // init the router and the model, which are the main drivers
            // of the core application
            self.router = new Router({ core: self });
            self.model  = new CoreModel();
            
            // when a route changes, remove all shapes
            shapes = self.model.get('shapeCollections');
            self.router.on('all', shapes.reset, shapes);
            
            // init the core views
            self.map = new Map({
                core: self,
                zoom: 4,
                center: {
                    lat:   39.743943,
                    lng: -105.020089
                }
            });
            
            self.pane = new Pane();
            
            //TODO: move getHash into navbar
            self.navBar = new NavBar({
                hash: Backbone.history.getHash()
            });
            
            self.searchForm = new SearchForm({
                el: '#searchForm', 
                core: self 
            });
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
