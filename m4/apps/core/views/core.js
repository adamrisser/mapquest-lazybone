/**
 * The main application which is 'winston lite' 
 * @fileOverview
 */
define([
    'backbone', 
    'router', 
    'core/views/pane', 
    'core/views/map/map', 
    'core/views/searchform', 
    'core/views/navbar', 
    'core/models/core'
], function (Backbone, Router, Pane, Map, SearchForm, NavBar, CoreModel) {
    
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
             * Main application model. A collection of map models
             * @type {Backbone.Model}
             */
            self.model = new CoreModel;
            
            /**
             * Backbone router. Handles state changes in the URL
             * @type {Backbone.Router}
             */
            self.router = new Router({ core: self });
            
            /**
             * Main map
             * @type {Backbone.View}
             */
            self.map = new Map({
                zoom: 7,
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
            self.navBar = new NavBar;
            
            /**
             * Main entry form for the site
             * @type {Backbone.View}
             */
            self.searchForm = new SearchForm({ el: '#searchForm', core: self });
            
        }
    });
   
    // export
    return WinstonCore;
    
});
