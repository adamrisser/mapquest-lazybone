define(['underscore', 'backbone', 'directions_input', 'text!/m4/html/directions.html', 'css!directionscss'], 
    function (_, Backbone, Input, template) {

    var Directions = Backbone.View.extend({

        /**
         * Our events
         * @type {Object}
         */ 
        events: {
            "click #getDirections": "getDirections"
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

            this.inputs = [];
            this.inputs.push(a);
            this.inputs.push(b);

            this.el.innerHTML = this.html();
            list = this.$el.find('ol');

            _.each(this.inputs, function(input, idx) {
                list.append(input.render().el);
            });

            return this;
        },

        /**
         * Run our route
         * @return {Directions} *this*
         */
        getDirections: function(event) {
            var self = this,
                map = m4.views.map.mqa,
                bounds = map.getBounds(),
                promises = [],
                stops = [],
                result;

            event.preventDefault();

            _.each(this.inputs, function(input) {
                promises.push(input.resolve());
            });
            
            $.when(promises).done(function() { 
                MQA.withModule('directions', function() {
                    _.each(self.inputs, function(input) {
                        result = input.getResult()[0];
                        stops.push({ latLng: { lat: result.lat, lng: result.lon }});
                    });

                    map.addRoute(stops);
                });
            });
        }

    });

    return Directions;

});