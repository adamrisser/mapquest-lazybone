define(['underscore', 'backbone', 
    'directions/views/input', 
    'directions/views/narrative',
    'directions/models/locationcollection',
    'directions/models/location',
    'directions/services/route',
    'text!directions/html/form.html', 
    'less!directionscss'], 
    function (_, Backbone, Input, Narrative, LocationCollection, Location, route, template) {

    var Form = Backbone.View.extend({

        /**
         * Our root element.
         * @type {String}
         */
        tagName: 'form',

        /**
         * List of our delegated events.
         * @type {Object}
         */
        events: {
            "click #addStop": "nextStop",
            "click #routeType a": "setRouteType",
            "click #getDirections": "getDirections"
        },

        /**
         * Our backbone initializer.
         * @param  {Object} options initializer object
         * @return {void}         
         */
        initialize: function(options) {
            var stops = this.model.get('stops');

            this.inputs = [];
            this.html = _.template(template);

            _.bindAll(this);

            if (!stops) {
                stops = new LocationCollection;
                this.model.set({'stops': stops});
            }

            stops.on('add',   this.addStop);
            stops.on('reset', this.addStops);
        },

        /**
         * Backbone.View render function.
         * @return {[type]} [description]
         */
        render: function() {
            var stops = this.model.get('stops');

            this.$el.html(this.html);

            if (stops.length > 0)
                this.addStops(stops);
            else
                stops.reset([new Location, new Location]);

            return this;
        },

        /**
         * Runs our route
         * @param  {Object} evt object
         * @return {void}     
         */
        getDirections: function(evt) {
            var self = this,
                promises = [];

            //- prevent the form from submitting
            evt.preventDefault();

            _.each(this.inputs, function(input) {
                promises.push(input.resolve());
            });

            $.when(promises)
            .pipe (
                function() {
                    return route.route(m4.views.map.mqa, self.model)
                }
            ).done(
                function(narrative) { 
                    self.narrative = new Narrative({narrative: narrative});
                    $('#pane').append(self.narrative.render().el);
                }
            );
        },

        /**
         * Adds the next stop.
         * @param  {Object} event object
         * @return {void}       
         */
        nextStop: function(evt) {
            var stops = this.model.get('stops');
            stops.add(new Location);
        },

        /**
         * Adds another stop to the route.
         * @param {Object} event object
         */
        addStop: function(stop) {
            var input = new Input({model: stop});

            //- add our new input
            this.inputs.push(input);

            //- render and append
            this.$el.find('ol').append(input.render().el);
        },

        /**
         * Add all of the stops.
         * @param {[type]} stops [description]
         */
        addStops: function(stops) {
            stops.each(this.addStop);
        },

        /**
         * Sets our route type -- driving, pedestrian, transit, bicycle
         * @param {Object} event object
         */
        setRouteType: function(evt) {
            var target = event.target;

            evt.preventDefault();

            this.model.set({'routeType': target.value});

        }   

    });

    return Form;
});