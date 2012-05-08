/*
 * Backbone routers are used for routing the apps URL's when using hash tags(#).
 * Route are mapped to a single function, which then acts upon the app.
 * 
 * The router intepret anything after '#' tag in the url. All links in the 
 * application should target '#/action' or '#action'. (Appending a forward 
 * slash after the hashtag looks a bit nicer e.g. http://www.mapquest.com/#/explore/parks)
 * 
 * http://documentcloud.github.com/backbone/#Router
 */
define(['backbone'], function (Backbone) {
    
    /**
     * This router should act upon the core model of the app, then
     * any views listening to state changes on the core model can
     * act accordingly. This keeps the router decoupled from everything (except
     * the core model duh).
     */
    var Router = Backbone.Router.extend({

        routes: {
            ''                  : 'index', 
            '/build'            : 'build',
            '/signin'           : 'signIn',
            '/map/:query'       : 'map',
            '/search/:query'    : 'search',
            '/directions'       : 'directions',
            '/directions/type'  : 'directions',
            '/explore/nationalparks' : 'parks',
            '/explore/neighborhoods/:placeId' : 'vibe'
        },
        
        /**
         * Currently active app
         * @type {Backbone.View} 
         */
        activeApp: null,
        
        /**
         * Initialize the core router
         * @param {Backbone.View} config.core winston application
         * @constructor
         */
        initialize: function (config) {
            this.coreApp = config.core;
        },
        
        /**
         * Load an app
         * @param {String}    app     amd module name
         * @param {Arguments} varargs arguments object 
         * @method
         */
        load: function (app, varargs) {
            var self = this;
            
            console.info('loading ' + app);
            
            // clean up the current app
            if (self.activeApp) {
                self.activeApp.dispose();
            }
            
            // load the new app
            require([app], function (App) {
                // change the arguments object into an array
                var args = Array.prototype.slice.call(varargs);
                
                self.activeApp = new App(args, self.coreApp);
            });
        },
        
        /**
         * Handle the index route (starting state)
         * @method
         */
        index: function () {
            
        },
        
        /**
         * Handle the vibe route
         * @method
         */
        vibe: function () {
            this.load('vibe', arguments);
        },
        
        /**
         * Handle the parkquest route
         * @method
         */
        parks: function () {
            this.load('parks', arguments);
        },
        
        /**
         * Set the app into search mode
         * @method
         */
        search: function () {
            this.load('searchresults', arguments);
        },
        
        /**
         * Set the app into map mode
         * @method
         */
        map: function () {
            this.load('mapresult', arguments);
        },
        
        /**
         * Set the app into directions mode, showing A to B boxes, etc
         * @method
         */
        directions: function () {
            this.load('directions/views/directions', arguments);
        }

    });

    return Router;

});
