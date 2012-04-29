
/**
 * Get base libs and boot strap the application
 */
require(['require', 'config'], function (require) {
    
    require(['order!underscore', 'order!backbone', 'jquery', 'pane', 'map', 'searchform', 'resizer', 'router'], 
        function (_, Backbone, $, Pane, Map, SearchForm, resizer, Router) {
        
        /**
         * Main global namespace
         * @namespace
         */
        m4 = {
            
            /**
             * Backbone router. Handles state changes in the URL
             * @type {Backbone.Router}
             */
            router: new Router(),
            
            views: {
                
                /**
                 * Main info pane that accompanies the map. Used to show
                 * information about searches, directions etc.
                 * @type {Backbone.View}
                 * @property 
                 */
                pane: new Pane(),
                
                /**
                 * Main entry form for the site
                 * @type {Backbone.View}
                 * @property
                 */
                searchForm: new SearchForm(),
                
                /**
                 * Main map
                 * @type {Backbone.View}
                 * @property
                 */
                map: new Map({
                    zoom: 7,
                    center: {
                        lat:   39.743943,
                        lng: -105.020089
                    }
                })
            },
            
        };
        
        // initialize the main window event listener for the resizer
        $(window).resize(resizer.resize);
        
        Backbone.history.start();
        
    });
    
});