define(['underscore', 'backbone', 
    'directions/models/query', 
    'directions/models/locationcollection',
    'directions/models/location',
    'directions/views/form', 
    'less!directions/css/directions',
    'twitter', 
    'css!twittercss'
], 
    function (_, Backbone, Query, LocationCollection, Location, Form) {

    var Directions = Backbone.View.extend({

        /**
         * Id of our element.
         * @type {String}
         */
        id: 'directions',
        
        /**
         * Backbone tagname attribute.
         * @type {String}
         */
        tagName: 'div',

        /**
         * Our events
         * @type {Object}
         */ 
        events: {
        },

        /**
         * Initialize our template.
         * @param {Array}         frags route fragments that initialized the app
         * @param {Backbone.View} core  core winston application
         * @return {void} 
         */
        initialize: function(frags, core) {
            this.map = core.map;
            this.render();
        },

        /**
         * Render our search form.
         * @return {Directions} *this*
         */
        render: function() {
            var query = new Query(),
                form = new Form({
                    model: query,
                    map: this.map
                });

            this.$el.append(form.render().el);
            $('#pane').append(this.el);

            return this;
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            var removeRoute = this.map.mqa.removeRoute
            
            // the module might not be pulled down (ie a route may not
            // have been run)
            if (removeRoute) {
                removeRoute();
            }
            
            this.$el.empty();
            this.unbind();
        }

    });

    return Directions;

});