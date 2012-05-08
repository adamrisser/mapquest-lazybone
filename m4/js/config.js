
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
        'less'  : 'js/plugins/less',
        
        // ext
        'underscore' : 'js/ext/underscore',
        'backbone'   : 'js/ext/backbone',
        'jquery'     : 'js/ext/jquery',
        'lessmin'    : 'js/ext/less-1.3.0.min',
        
        // bootstrap files
        'bootstrap' : 'js/bootstrap',
        
        // router
        'router'    : 'js/routers/router',
        
        // utils 
        'resizer'   : 'js/util/resizer',
        'html'      : 'js/util/html',
        
        // twitter bootstrap
        'twitter'   : 'js/ext/bootstrap/js/bootstrap',
        'twittercss': 'js/ext/bootstrap/css/bootstrap',
        
        // html
        'searchresultshtml' : 'html/searchresults',
        'mapresulthtml'  : 'html/mapresult', 
        'searchformhtml' : 'html/searchform',
        'directionshtml' : 'html/directions',
        'directoryhtml'  : 'html/directory',
        'galleryhtml'    : 'html/gallery',
        'resulthtml'     : 'html/result',
        'locationhtml'   : 'html/location',
        'navbarhtml'     : 'html/navbar',
        
        // css
        'panecss'       : 'css/pane',
        'mapcss'        : 'css/map',
        'searchformcss' : 'css/searchform',
        'resultscss'    : 'css/results',
        'gallerycss'    : 'css/gallery',
        'navbarcss'     : 'css/navbar',
        
        //TODO: shorten and remove, add to define statements
        // apps -> core
        'core'          : 'js/apps/core',
        
        //TODO: move into their own applications
        'mapresult'     : 'js/apps/core/views/mapresult',
        'searchresults' : 'js/apps/core/views/searchresults',
        
        //TODO: move into core/models?
        'location'      : 'js/model/location',
        'mapstate'      : 'js/model/mapstate',
        'route'         : 'js/model/route',
        
        // apps -> directions
        'directions'            : 'js/apps/directions',
        'directionscss'         : 'css/directions/directions',
        'directions_inputcss'   : 'css/directions/input',
        
        // apps - vibe
        'vibe'            : 'js/apps/vibe/vibe',
        'hood'            : 'js/apps/vibe/hood',
        'vibepois'        : 'js/apps/vibe/vibepois',
        'vibeutil'        : 'js/apps/vibe/vibeutil',
        'vibemodel'       : 'js/apps/vibe/vibemodel',
        'hoodsummary'     : 'js/apps/vibe/hoodsummary',
        'hoodsummaryhtml' : 'html/vibe/hoodsummary',
        'hoodpoishtml'    : 'html/vibe/hoodpois',
        'hoodsummarycss'  : 'css/vibe/hoodsummary',
        
        // apps - parks
        'parks' : 'js/apps/parks/'
    }
    
});
