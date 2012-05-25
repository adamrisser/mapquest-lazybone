/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @fileOverview
 */
/*global define, Backbone, MQA */
define([
    'tmpl!mapresult/html/result',
    'tmpl!core/html/location', 
    'less!searchresults/css/results'
], function (template, locationTemplate) {
    
    "use strict";

    var MapResults = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Initialize the view. Bind it to the model
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core winston application
         * @constructor
         */
        initialize: function (options) {
            var core = this.core = options.core;
            
            core.model.on('change:location', this.render, this);
            
            // render any results that were inserted before the 
            // change:location event was bound onto
            this.render(core.model);
        },
        
        /**
         * Handle a model location change, only render map results
         * @param  {Backbone.Model} model core model
         * @method
         */
        handleLocation: function (model) {
            if (model.get('state') === 'map') {
                this.render(model);
            }
        },
        
        /**
         * Render the view to the page
         * @param  {Backbone.Model} model core model
         * @return {Backbone.View}  this
         * @method
         */
        render: function (model) {
            var self = this,
            
            loc  = model.get('location'),
            html = self.getHtml(loc);
            
            self.$el.empty().append(html);
            
            // add to the map
            self.core.model.saveToShapeCollection({
                name: 'mapresults',
                shapes: self.createPoi(loc)
            });
            
            return self;
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
         * Get HTML for a location
         * @param  {Backbone.Model} loc location model that contains map results
         * @return {String}             location in html form
         * @method
         */
        getHtml: function (loc) {
            return locationTemplate({
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
    
    return MapResults;
});