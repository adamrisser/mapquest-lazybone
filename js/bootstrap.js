
/**
 * Get base libs and boot strap the application
 * @fileOverview
 */
require(['config'], function () {
    
    /*
     * Main winston lite application. Only the most corest of things should
     * be placed in here, such as the router or the core model.
     */
    require(['core/views/core', 'js/util/resizer'], function (CoreApp, resizer) {
        
        window.core = new CoreApp();
        
        // initialize the main window event listener for the resizer
        $(window).resize(resizer.resize);

        // Start listening for history events
        Backbone.history.start();
        
    });
    
});

