define(['underscore', 'backbone', 
    'directions/models/query', 
    'directions/models/locationcollection',
    'directions/models/location',
    'directions/views/form', 
    'less!directionscss'], 
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
                    map: core.map
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
            this.$el.empty();
            this.unbind();
        }

    });

    return Directions;

});