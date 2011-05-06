/**
 * Bootstrap logic should only be run once to set up the application.
 * @fileoverview
 */
define(['js/nodes.js', 'js/widgets/pane.js', 'js/widgets/map.js', 
        'js/widgets/summaryForm.js', 'js/util/resizer.js', 'js/model/core.js'], 
    function (nodes, Pane, MapBuilder, summaryForm, resizer, CoreModel) {
    
    // initialize the main window event listener for the resizer
    nodes.window.resize(resizer.resize);
    
    // init the main map
    m4.map = MapBuilder.build();
    
    // init core model
    m4.model.Core = new CoreModel();
    
    // Set up the add map event on the link. 
    // TODO: Onclick for now, will eventually be a gesture also
    nodes.add.bind('click', function () {
        
        // add map to model
        // display new tab
        // hide old map collection 
        
    });
    
    // Set up the gallery event on the link. 
    // TODO: Onclick for now, will eventually be a gesture also
    nodes.gallery.bind('click', function () {
        require(['js/widgets/gallery/gallery.js'], function (gallery) {
            gallery.toggle();
        });
    });
});