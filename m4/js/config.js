
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
        'searchresultshtml' : 'html/searchresults.html',
        'mapresulthtml'  : 'html/mapresult.html', 
        'searchformhtml' : 'html/searchform.html',
        'directionshtml' : 'html/directions.html',
        'directoryhtml'  : 'html/directory.html',
        'galleryhtml'    : 'html/gallery.html',
        'resulthtml'     : 'html/result.html',
        'locationhtml'   : 'html/location.html',
        'navbarhtml'     : 'html/navbar.html',
        
        // css
        'panecss'       : 'css/pane',
        'mapcss'        : 'css/map',
        'searchformcss' : 'css/searchform',
        'resultscss'    : 'css/results',
        'gallerycss'    : 'css/gallery',
        'navbarcss'     : 'css/navbar',
        
        // css -> directions
        'directions'            : 'js/apps/directions',
        'directionscss'         : 'css/directions/directions',
        'directions_inputcss'   : 'css/directions/input',
        
        //TODO: shorten and remove, add to define statements
        // apps -> core
        'core'          : 'js/apps/core/views/core',
        'directory'     : 'js/apps/core/views/directory',
        'pane'          : 'js/apps/core/views/pane', 
        'searchform'    : 'js/apps/core/views/searchform',
        'navbar'        : 'js/apps/core/views/navbar',
        'mapresult'     : 'js/apps/core/views/mapresult',
        'searchresults' : 'js/apps/core/views/searchresults',
        'coremodel'     : 'js/model/core',
        'location'      : 'js/model/location',
        'mapstate'      : 'js/model/mapstate',
        'route'         : 'js/model/route',
        
        // apps -> core -> map
        'map'        : 'js/apps/core/views/map/map',
        'poimanager' : 'js/apps/core/views/map/poimanager',
        
        // apps - vibe
        'vibe'            : 'js/apps/vibe/vibe',
        'hood'            : 'js/apps/vibe/hood',
        'vibepois'        : 'js/apps/vibe/vibepois',
        'vibeutil'        : 'js/apps/vibe/vibeutil',
        'vibemodel'       : 'js/apps/vibe/vibemodel',
        'hoodsummary'     : 'js/apps/vibe/hoodsummary',
        'hoodsummaryhtml' : 'html/vibe/hoodsummary.html',
        'hoodpoishtml'    : 'html/vibe/hoodpois.html',
        'hoodsummarycss'  : 'css/vibe/hoodsummary',
        
        // apps - parks
        'parks'           : 'js/apps/parks/parks',
        'parksmodel'      : 'js/apps/parks/parksmodel',
        'parkspois'       : 'js/apps/parks/parkspois',
        'parksgeom'       : 'js/apps/parks/parksgeom',
        'parkssummary'    : 'js/apps/parks/parkssummary',
        'parkssummaryhtml' : 'html/parks/parkssummary.html',
        'parkspoishtml'    : 'html/parks/parkspois.html',
        'parksummarycss'  : 'css/vibe/parksummary'
        
    }
    
});
