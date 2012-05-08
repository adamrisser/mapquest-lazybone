
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
        
        //TODO: move into core/models?
        'location' : 'js/model/location',
        'mapstate' : 'js/model/mapstate',
        'route'    : 'js/model/route',
        
        // apps -> directions
        'directions'            : 'js/apps/directions',
        'directionscss'         : 'css/directions/directions',
        'directions_inputcss'   : 'css/directions/input',
        
        // app shortcuts
        'core'  : 'js/apps/core/',
        'vibe'  : 'js/apps/vibe/',
        'parks' : 'js/apps/parks/',
        'mapresult' : 'js/apps/mapresult/',
        'searchresults' : 'js/apps/searchresults/'
        
    }
    
});
