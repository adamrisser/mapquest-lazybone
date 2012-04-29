
/**
 * Set up base paths for ease of use in require.
 * This is the new js-profile-winston.js
 */
require.config({
    
    baseUrl: '/m4',
    
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
        'bootstrap' : 'js/bootstrap',
        
        // models
        'core'     : 'js/model/core',
        'location' : 'js/model/location',
        'mapstate' : 'js/model/mapstate',
        'route'    : 'js/model/route',
        
        // view
        'directory'   : 'js/views/directory',
        'directions'  : 'js/views/directions',
        'pane'        : 'js/views/pane', 
        'map'         : 'js/views/map', 
        'searchform'  : 'js/views/searchform',
        'resultslist' : 'js/views/resultslist',
        
        // router
        'router'      : 'js/routers/router',
        
        // utils 
        'resizer'   : 'js/util/resizer',
        'html'      : 'js/util/html',
         
        // html
        'searchformhtml': 'html/searchform.html',
        'directionshtml': 'html/directions.html',
        'galleryhtml'   : 'html/gallery.html',
        'resulthtml'    : 'html/result.html',
        'locationhtml'  : 'html/location.html',
        
        // css
        'panecss'       : 'css/pane',
        'mapcss'        : 'css/map',
        'searchformcss' : 'css/searchform',
        'resultscss'    : 'css/results',
        'gallerycss'    : 'css/gallery'
        
    }
    
});