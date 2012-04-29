define(['underscore', 'backbone', 'directions_input', 'text!/m4/html/directions.html', 'css!directionscss'], 
    function (_, Backbone, Input, template) {

    var Directions = Backbone.View.extend({

        /**
         * Our events
         * @type {Object}
         */ 
        events: {
            "click #getDir": "getDirections"
        },

        /**
         * Initialize our template.
         * @return {void} 
         */
        initialize: function() {
            this.html = _.template(template);
        },

        /**
         * Render our search form.
         * @return {Directions} *this*
         */
        render: function() {
            var a = new Input(),
                b = new Input(),
                list;

            this.el.innerHTML = this.html();
        
            list = this.$el.find('ul');
            list.append(a.render().el);
            list.append(b.render().el);

            return this;
        },

        /**
         * Run our route
         * @return {Directions} *this*
         */
        getDirections: function() {

        }

    });

    return Directions;

});