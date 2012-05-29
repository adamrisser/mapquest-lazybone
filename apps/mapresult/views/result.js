/**
 * Map Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @fileOverview
 */
/*global define, Backbone, MQA */
define([
    'common/views/baseresults',
    'tmpl!mapresult/html/result',
    'tmpl!core/html/location', 
    'less!searchresults/css/results'
], function (BaseResults, template, locationTemplate) {
    
    "use strict";

    var MapResults = BaseResults.extend({
        
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
        locationTemplate: locationTemplate
        
        
    });
    
    return MapResults;
});