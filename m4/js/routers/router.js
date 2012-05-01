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
define(['backbone', 'core'], function(Backbone, coreModel) {
    
    /**
     * This router should act upon the core model of the app, then
     * any views listening to state changes on the core model can
     * act accordingly. This keeps the router decoupled from everything (except
     * the core model duh).
     */
    var Router = Backbone.Router.extend({

        routes: {
            ''                  : 'index', 
            '/signin'           : 'signIn',
            '/map/:query'       : 'map',
            '/search/:query'    : 'search',
            '/directions'       : 'directions',
            '/directions/type'  : 'directions',
            '/explore/:what'    : 'explore',
            '/build'            : 'build'
        },
        
        /**
         * Initialize the router
         * @constructor
         */
        initialize: function () {
            
        },
        
        /**
         * Initial state of the app. The non-route route
         * @method
         */
        index: function() {
            console.log('index');
            coreModel.set({ state: 'index' });
        },

        signIn: function() {
            console.log('signing in');
        },
        
        /**
         * Set the app into directions mode, showing A to B boxes, etc
         * @method
         */
        directions: function (type) {
            console.log('directions');
            coreModel.set({ state: 'directions' });
        },

        /**
         * Set the app into search result mode
         * @param {String} query search query
         * @method
         */
        search: function (query) {
            console.log('search');
        },
        
        /**
         * Set the app into map result mode
         * @param {String} query search query
         * @method
         */
        map: function (query) {
            console.log('map');
        },

        explore: function(what) {
            console.log('explore/' + what);
            
            // instantiate the vibe app
            if (what === 'neighborhoods') {
                require(['vibe'], function (Vibe) {
                    var vibeApp = new Vibe({
                        //placeId: 533882 //winston salem
                        placeId: 380454
                    });
                });
            }
            
        },

        build: function() {
            console.log('opening mapbuilder');
        }

    });

    return new Router();

});