/**
 * Places results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @fileOverview
 */
/*global define, Backbone, MQA */
define([
    'tmpl!places/html/results', 
    'tmpl!core/html/location', 
    'less!places/css/results'
], function (template, locationTemplate) {
    
    "use strict";
    
    var PlacesResultsList = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '.places .results',
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Underscore template to display a single location
         * @method
         */
        locationTemplate: locationTemplate,
        
        /**
         * Init the search results
         * @param {Backbone.View}  options.core  core app
         * @param {Backbone.Model} options.model search results model 
         * @construction
         */
        initialize: function (options) {
            var self = this;
            
            _.extend(self, options);
            
            _.bindAll(self, 'getLocationHtml');
            
            // handle new locations coming into the search results model
            self.model.on('change:location', self.handleLocation, self);
        },
        
        /**
         * Handle a model location change, only render search results
         * @param  {Backbone.Model} model core model
         * @method
         */
        handleLocation: function (model) {
            this.render(model);
            this.renderShapes(model);
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
            var loc  = model.get('location'),
                locs = loc.get('unresolvedLocations'),
                pois;
            
            // decide whether to render a single location or a results list
            if (loc.get('status') === 'RESOLVED') {
                pois = this.createPoi(loc);
            } else {
                pois = locs.map(this.createPoi);
            }
            
            this.core.model.saveToShapeCollection({
                name: 'searchresults',
                shapes: pois
            });
        },
        
        /**
         * Get result list HTML
         * @param  {Backbone.Model} loc location model that contains map results
         * @return {String}             location in html form
         * @method
         */
        getHtml: function (loc) {
            var results = loc.get('unresolvedLocations'), html;
            
            // decide whether to render a single location or a results list
            if (loc.get('status') === 'RESOLVED') {
                html = this.getLocationHtml(loc)
            }
            else {
                html = this.template({
                    locs: results, 
                    locTemplate: this.getLocationHtml
                });
            }
            
            return html;
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
         * Create a map results POI
         * @param  {Backbone.Model} loc location model
         * @return {MQA.Poi}
         * @method
         */
        createPoi: function (loc) {
            return new MQA.Poi(loc.get('address').latLng);
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
    
    return PlacesResultsList;
    
});
