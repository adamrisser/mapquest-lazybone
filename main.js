
/**
 * Set up base paths for ease of use in require
 */
require.config({
    
    baseUrl: 'm4',
    
    paths: {
        
        // plugins
        'order' : 'js/plugins/order',
        'text'  : 'js/plugins/text',
        'css'   : 'js/plugins/css',
        'tmpl'  : 'js/plugins/tmpl',
        
        // ext
        'underscore' : 'js/ext/underscore',
        'backbone'   : 'js/ext/backbone',
        'jquery'     : 'js/ext/jquery',
        'mustache'   : 'js/ext/mustache',
        
        // bootstrap files
        'm4'        : 'js/m4',
        'nodes'     : 'js/nodes', 
        'bootstrap' : 'js/bootstrap',
        
        // models
        'core'     : 'js/model/core',
        'location' : 'js/model/location',
        'mapstate' : 'js/model/mapstate',
        'route'    : 'js/model/route',
        'tab'      : 'js/model/tab',
        
        // view
        'pane'        : 'js/views/pane', 
        'map'         : 'js/views/map', 
        'summaryform' : 'js/views/summaryform',
        'gallery'     : 'js/views/gallery/gallery',
        'results'     : 'js/views/results',
        
        // utils 
        'resizer'   : 'js/util/resizer',
        'services'  : 'js/util/services',
        'html'      : 'js/util/html',
        'staticmap' : 'js/util/staticmap',
         
        // html
        'galleryhtml' : 'html/gallery.html',
        'resulthtml'  : 'html/result.html',
        
        // css
        'panecss'       : 'css/pane',
        'mapcss'        : 'css/map',
        'summaryformcss': 'css/summaryform',
        'resultscss'    : 'css/results',
        'gallerycss'    : 'css/gallery'
        
    }
});

/**
 * Get base libs and boot strap the application
 */
require(['order!underscore', 'order!backbone', 'jquery', 'm4', 'bootstrap'], function (_, Backbone, $, m4, app) {
    //todo: meh.
});