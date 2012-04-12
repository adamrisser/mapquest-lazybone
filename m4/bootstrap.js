
/**
 * Set up base paths for ease of use in require
 */
require.config({
    paths: {
        
        // plugins
        'order': 'js/plugins/order',
        'text': 'js/plugins/order',
        'tmpl' : 'js/plugins/tmpl',
        
        // js
        'underscore' : 'js/ext/underscore',
        'backbone'   : 'js/ext/backbone',
        'jquery'     : 'js/ext/jquery',
        'bootstrap'  : 'js/app/bootstrap',
        'game'       : 'js/app/game',
        'board'      : 'js/app/board',
        'gamedetails': 'js/app/gamedetails',
        'controls'   : 'js/app/controls',
        'pgnparser'  : 'js/util/pgnparser',
        'regexhelper': 'js/util/regexhelper',
        
        // models
        'pgn' : 'js/model/pgn',
        'move': 'js/model/move',
        
        // html
        'gametmpl'       : 'html/game.html',
        'boardtmpl'      : 'html/board.html',
        'gamedetailstmpl': 'html/gamedetails.html',
        'controlstmpl'   : 'html/controls.html'
        
    }
});

/**
 * Get base libs and boot strap the application
 */
require(['order!underscore', 'order!backbone', 'jquery', 'bootstrap'], function (_, Backbone, $, app) {
    App = app;
});




/**
 * Bootstrap logic should only be run once to set up the application.
 * @fileoverview
 */
define(['js/nodes.js', 'js/widgets/pane.js', 'js/widgets/map.js', 
        'js/widgets/summaryForm.js', 'js/util/resizer.js', 'js/model/core.js'], 
    function (nodes, Pane, Map, summaryForm, resizer, CoreModel) {
    
    // initialize the main window event listener for the resizer
    nodes.window.resize(resizer.resize);
    
    // init core model
    m4.model.Core = new CoreModel();
    
    // init the main map
    m4.map = new Map({
        zoom: 7,
        center: {
            lat:   39.743943,
            lng: -105.020089
        }
    });
    
    // Set up the add map event on the link. 
    // TODO: Onclick for now, will eventually be a gesture also
    nodes.add.bind('click', function () {
        
        // add map to model
        // display new tab
        // hide old map collection 
        
    });
    
    // Set up the gallery event on the link. 
    // TODO: onclick for now, will eventually be a gesture also
    nodes.gallery.bind('click', function () {
        require(['js/widgets/gallery/gallery.js'], function (gallery) {
            gallery.toggle(m4.model.Core);
        });
    });
});