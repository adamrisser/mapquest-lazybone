(function(){

    /**
     * Bootstrap logic should only be run once to set up the application.  After
     * the bootstrapping, the namespace is set to null since it is un-needed.
     * @fileoverview
     */
    
    // static vars here
    
    /**
     * Bootstrap namespace
     * @namespace
     */
    __m.bootstrap = {
        
        /**
         * Initialize the main namespace and call first set of widgets.
         * @method
         */
        initialize: function () {
            
            // cache references to the main DOM elements on the page
            __nodes = __m.nodes = {
                map:  $('#map'),
                body: $('body'),
                pane: $('#pane')
            };
            
            require(['widgets.pane.js', 'pane.css', 'util.resizer.js'], function () {
                __widgets.pane.init();
            });
            
            require(['widgets.map.js', 'map.css', 'util.resizer.js'], function () {
                __widgets.map = new __widgets.Map();
            });
            
            require(['widgets.summaryForm.js', 'summaryForm.css'], function () {
                __widgets.summaryForm = new __widgets.SummaryForm();
            });
            
            require(['model.model.js', 'model.location.js', 'widgets.results.js', 'results.css'], function () {
                __model.core = new __model.Core();
                __widgets.result = new __widgets.Result;
            });

        }
        
    };
    
}());