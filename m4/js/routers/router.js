define(['backbone', 'core'], function(Backbone, coreModel) {

    var Router = Backbone.Router.extend({

        routes: {
            ""                  : "index", 
            "/signin"           : "signIn",
            "/directions"       : "directions",
            "/directions/type"  : "directions",
            "/explore/:what"    : "explore",
            "/build"            : "build"
        },

        index: function() {
            console.log('index');
        },

        signIn: function() {
            console.log('signing in');
        },

        directions: function(type) {
            coreModel.set({ state: 'directions' })
        },

        explore: function(what) {
            console.log('explore/' + what);
        },

        build: function() {
            console.log('opening mapbuilder')
        }

    });

    return new Router;

});