define(['underscore', 'backbone', 
    'directions/views/input', 
    'directions/models/locationcollection',
    'directions/models/location',
    'text!directions/html/form.html', 
    'less!directions/css/directions'], 
    function (_, Backbone, Input, LocationCollection, Location, template) {

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
            "click #addStop"        : "newStop"
        },

        /**
         * Our backbone initializer.
         * @param  {Object} options initializer object
         * @return {void}         
         */
        initialize: function(options) {
            var stops = this.model;
            
            this.map = options.map;
            this.inputs = [];
            this.html = _.template(template);

            _.bindAll(this);

            if (!stops) {
                stops = new LocationCollection;
                this.model.set({'stops': stops});
            }

            stops.on('add',     this.addStop);
            stops.on('reset',   this.addStops);
            stops.on('destroy',  this.removeStop);
        },

        /**
         * Backbone.View render function.
         * @return {[type]} [description]
         */
        render: function() {
            var stops = this.model;

            this.$el.html(this.html);

            if (stops.length > 0)
                this.addStops(stops);
            else
                stops.reset([new Location, new Location]);

            return this;
        },

        /**
         * 
         * @return {Promis} 
         */
        ready: function() {
            var promises = [];

            _.each(this.inputs, function(input) {
                promises.push(input.resolve());
            });

            return promises;
        },

        /**
         * Adds the next stop.
         * @param  {Object} event object
         * @return {void}       
         */
        newStop: function(evt) {
            var stops = this.model;
            stops.add(new Location);
        },

        /**
         * Stop has been removed, need to ensure that there is atleast two.
         * @param  {Object} evt event object
         * @return {void}     
         */
        removeStop: function(evt) {

            if (this.model.length <= 2) {
                this.$el.removeClass('multi');
            } 

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

            if (this.model.length > 2) {
                this.$el.addClass('multi');
            }
        },

        /**
         * Add all of the stops.
         * @param {[type]} stops [description]
         */
        addStops: function(stops) {
            stops.each(this.addStop);
        }

    });

    return Form;
});