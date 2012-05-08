/**
 * Set up base paths for ease of use in require.
 * This is the new js-profile-winston.js
 * @fileOverview
 */
require.config({
    
    baseUrl: '/m4',
    
    paths: {
        
        /* 
         * Plug-ins
         * 
         * RequireJS allows you to write loader plugins that can load different 
         * types of resources as dependencies, and even include the 
         * dependencies in optimized builds.
         * 
         * 
         * order - Defines an order that asyncronously loaded scripts are executed
         * text  - Load text files and treat them as dependencies. 
         * css   - Load a css files and insert them into the DOM
         * tmpl  - Loads an underscore template and returns the executable Function
         *         that you can pass a config variables too
         * less  - Loads a less file and compiles it to css before inserting
         *         into the DOM
         */
        'order' : 'js/plugins/order',
        'text'  : 'js/plugins/text',
        'css'   : 'js/plugins/css',
        'tmpl'  : 'js/plugins/tmpl',
        'less'  : 'js/plugins/less',
        
        /*
         * External Libraries
         * 
         * The following external libraries are used to build winston lite.
         * UnderscoreJS - A utility-belt library for JavaScript that provides 
         *                a lot of the functional programming support
         *                (http://documentcloud.github.com/underscore/)
         * 
         * BackboneJS   - A application framework, similar to MVC, but tailored
         *                towards large JS applications.
         *                (http://documentcloud.github.com/backbone/)
         * 
         * jQuery       - Library that simplifies HTML document traversing, 
         *                event handling, animating, and Ajax interactions.
         *                (http://jquery.com/)
         * 
         * LESS         - extends CSS with dynamic behavior such as variables, 
         *                mixins, operations and functions
         *                (http://lesscss.org/)
         */
        'underscore' : 'js/ext/underscore',
        'backbone'   : 'js/ext/backbone',
        'jquery'     : 'js/ext/jquery',
        'lessmin'    : 'js/ext/less-1.3.0.min',
        
        /*
         * Twitter Bootstrap
         * 
         * A collection of simple and flexible HTML, CSS, and Javascript 
         * for popular user interface components and interactions.
         */
        'twitter'   : 'js/ext/bootstrap/js/bootstrap',
        'twittercss': 'js/ext/bootstrap/css/bootstrap',
        
        /*
         * Winston Lite
         */
        
        // App shortcuts
        'core'  : 'apps/core/',
        'vibe'  : 'apps/vibe/',
        'parks' : 'apps/parks/',
        'directions' : 'apps/directions/',
        'mapresult'  : 'apps/mapresult/',
        'searchresults' : 'apps/searchresults/',
        
        // Router
        'router' : 'js/routers/router',
        
        // Utils 
        'resizer' : 'js/util/resizer',
        'html'    : 'js/util/html',
        
        //TODO: move into core/models?
        'location' : 'js/model/location',
        'mapstate' : 'js/model/mapstate',
        'route'    : 'js/model/route'
        
    }
    
});
