/**
 * Bootstrap logic should only be run once to set up the application.
 * @fileoverview
 */
define(['nodes', 'pane', 'map', 'summaryform', 'resizer', 'core'], function (nodes, Pane, Map, summaryForm, resizer) {
    
    // initialize the main window event listener for the resizer
    nodes.window.resize(resizer.resize);
    
    // init the main map
    m4.map = new Map({
        zoom: 7,
        center: {
            lat:   39.743943,
            lng: -105.020089
        }
    });
    
});