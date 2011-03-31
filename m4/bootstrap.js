/**
 * Bootstrap logic should only be run once to set up the application.  After
 * the bootstrapping, the namespace is set to null since it is un-needed.
 * @fileoverview
 */
define(['js/nodes.js', 'js/widgets/pane.js', 'js/widgets/map.js', 
        'js/widgets/summaryForm.js', 'js/util/resizer.js', 'js/model/model.js',
        'js/model/location.js'], function (nodes, Pane, MapBuilder, summaryForm, resizer, model, locModel) {
    
    // models
    model.Core = model;
    model.Location = locModel;
    
    // initialize the event listener for the resizer
    nodes.window.resize(resizer.resize);
    
    // init widgets
    Pane.init();
    
    m4.map = new MapBuilder().build();
    
    
    // init model
    m4.model.core = new model.Core();
    
});