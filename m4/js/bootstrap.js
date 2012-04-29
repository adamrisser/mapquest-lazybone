
/**
 * Get base libs and boot strap the application
 */
require(['require', 'config'], function (require) {
    
    require(['order!underscore', 'order!backbone', 'jquery', 'nodes', 'pane', 'map', 'searchform', 'resizer', 'router'], 
        function (_, Backbone, $, nodes, Pane, Map, SearchForm, resizer, router) {
        
        // initialize the main window event listener for the resizer
        nodes.window.resize(resizer.resize);
        
        /**
         * Main global namespace
         * @namespace
         */
        m4 = {
            
            views: {
                
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
        
        Backbone.history.start();
            
    });
    
});