/**
 * Search Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @fileOverview
 */
/*global define, Backbone, MQA */
define([
    'common/views/baseresults',
    'tmpl!searchresults/html/results', 
    'tmpl!core/html/location', 
    'less!searchresults/css/results'
], function (BaseResults, template, locationTemplate) {
    
    "use strict";
    
    var SearchResultsList = BaseResults.extend({
        
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
         * Underscore template to display a single location
         * @method
         */
        locationTemplate: locationTemplate,
        
        /**
         * Handle a model location change, only render search results
         * @param  {Backbone.Model} model core model
         * @method
         */
        handleLocation: function (model) {
            if (model.get('state') === 'search') {
                this.render(model);
                this.renderShapes(model);
            }
        },
        
        /**
         * Render shapes on the map
         * @param  {Backbone.Model} model core model
         * @method
         */
        renderShapes: function (model) {
            var locs = model.get('location').get('unresolvedLocations'),
                pois = locs.map(this.createPoi, this);
            
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
            return this.template({
                locs: loc.get('unresolvedLocations'), 
                locTemplate: this.getLocationHtml
            });
        }
        
    });
    
    return SearchResultsList;
});