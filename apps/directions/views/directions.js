define(['underscore', 'backbone', 
    'directions/models/query', 
    'directions/models/locationcollection',
    'directions/models/location',
    'directions/views/inputs', 
    'directions/views/narrative',    
    'directions/services/route',    
    'less!directions/css/directions',
    'twitter', 
    'css!twittercss'
], 
    function (_, Backbone, Query, LocationCollection, Location, Inputs, Narrative, route) {

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
            "click #routeType a": "setRouteType",
            "click #getDirections": "getDirections"            
        },

        /**
         * Initialize our template.
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core winston application
         * @return {void} 
         */
        initialize: function(options) {
            this.map = options.core.map;

            _.bindAll(this);

            this.model = new Query({
                stops: new LocationCollection
            });

            this.render();
        },

        /**
         * Render our search form.
         * @return {Directions} *this*
         */
        render: function() {
            var stops = this.model.get('stops'),
                inputs = this.inputs = new Inputs({
                    model: stops,
                    map: this.map
                });

            this.$el.append(inputs.render().el);
            $('#pane').append(this.el);

            return this;
        },

        /**
         * Sets our route type -- driving, pedestrian, transit, bicycle
         * @param {Object} event object
         */
        setRouteType: function(evt) {
            var target = event.target;

            evt.preventDefault();

            this.model.set({'routeType': target.value});
        },   

        /**
         * Runs our route
         * @param  {Object} evt object
         * @return {void}     
         */
        getDirections: function(evt) {
            var self = this;

            //- prevent the form from submitting
            evt.preventDefault();

            $.when(self.inputs.ready())
            .pipe (
                function() {
                    return route.route(self.map.mqa, self.model)
                }
            ).done(
                function(narrative) { 
                    self.narrative = new Narrative({narrative: narrative});
                    $('#pane').append(self.narrative.render().el);
                }
            );
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