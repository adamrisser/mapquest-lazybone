/**
 * Bootstrap logic should only be run once to set up the application.
 * @fileoverview
 */
define(['js/nodes.js', 'js/widgets/pane.js', 'js/widgets/map.js', 
        'js/widgets/summaryForm.js', 'js/util/resizer.js', 'js/model/model.js'], 
    function (nodes, Pane, MapBuilder, summaryForm, resizer, model) {
    
    // initialize the main window event listener for the resizer
    nodes.window.resize(resizer.resize);
    
    // init the main map
    m4.map = new MapBuilder().build();
    
    // init core model
    m4.model.core = new model();
});