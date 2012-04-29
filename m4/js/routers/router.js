define(['backbone', 'pane', 'directions'], function(Backbone, pane, Directions) {

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
            pane.push(new Directions());
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