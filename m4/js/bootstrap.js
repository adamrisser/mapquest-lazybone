
/**
 * Get base libs and boot strap the application
 */
require(['require', 'config'], function (require) {
    
    require(['order!underscore', 'order!backbone', 'jquery', 'nodes', 'pane', 'map', 'summaryform', 'resizer'], 
        function (_, Backbone, $, nodes, Pane, Map, summaryForm, resizer) {
        
        // initialize the main window event listener for the resizer
        nodes.window.resize(resizer.resize);
        
        /**
         * Main global namespace
         * @namespace
         */
        m4 = {
            
            // init the main map
            map: new Map({
                zoom: 7,
                center: {
                    lat:   39.743943,
                    lng: -105.020089
                }
            })
            
        };
        
        Backbone.history.start({ pushState: true });
            
    });
    
});