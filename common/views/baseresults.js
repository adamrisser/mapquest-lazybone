/**
 * Base Results List
 * 
 * A base way for displaying a list of locations in the left pane
 * and on the core map. 
 * 
 * Must be extended.
 * 
 * @fileOverview
 */
/*global define, Backbone, MQA */
define(function () {
    
    "use strict";

    var BaseResults = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
        /**
         * Underscore template. Required to work
         * @method
         */
        template: undefined,
        
        /**
         * Underscore template for a single location. Required to work
         * @method
         */
        locationTemplate: undefined,
        
        /**
         * Initialize the view. Bind it to the model
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core winston application
         * @constructor
         */
        initialize: function (options) {
            var self = this,
                core = self.core = options.core;
            
            _.bindAll(self, 'getLocationHtml');
            
            core.model.on('change:state', self.handleLocation, self);
            
            // render any results that were inserted before the 
            // change:location event was bound onto
            self.handleLocation(core.model);
        },
        
        /**
         * Handle a model location change, only render map results
         * @param  {Backbone.Model} model core model
         * @method
         */
        handleLocation: function (model) {
            if (model.get('state') === 'map') {
                this.render(model);
                this.renderShapes(model);
            }
        },
        
        /**
         * Render the view to the page
         * @param  {Backbone.Model} model core model
         * @return {Backbone.View}  this
         * @method
         */
        render: function (model) {
            var loc  = model.get('location'),
                html = this.getHtml(loc);
            
            this.$el.empty().append(html);
            
            return this;
        },
        
        /**
         * Render shapes on the map
         * @param  {Backbone.Model} model core model
         * @method
         */
        renderShapes: function (model) {
            var loc = model.get('location');
            
            // add to the map
            this.core.model.saveToShapeCollection({
                name: 'mapresults',
                shapes: this.createPoi(loc)
            });
        },
        
        /**
         * Create a map results POI
         * @param  {Backbone.Model} loc location model
         * @return {MQA.Poi}
         * @method
         */
        createPoi: function (loc) {
            return new MQA.Poi(loc.get('address').latLng);
        },
        
        /**
         * Get result list HTML
         * @param  {Backbone.Model} loc location model that contains map results
         * @return {String}             location in html form
         * @method
         */
        getHtml: function (loc) {
            // Just a simple pass thru for simple map results. Others  
            // can overwrite this to do lists of locations or to wrap
            // the location html.
            return this.getLocationHtml(loc);
        },
        
        /**
         * Get HTML for a location
         * @param  {Backbone.Model} loc location model that contains map results
         * @return {String}             location in html form
         * @method
         */
        getLocationHtml: function (loc) {
            return this.locationTemplate({
                adr: loc.get('address'),
                name: loc.get('name')
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.$el.empty();
            this.off();
        }
        
    });
    
    return BaseResults;
});