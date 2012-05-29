/**
 * Search Results Form
 * 
 * The search form that appears in the left hand pane of the search results app.
 * @fileOverview
 */
define([
    'backbone',
    'core/models/location', 
    'tmpl!places/html/form',
    'less!places/css/places',
    'css!twittercss'
], function (Backbone, Location, template) {
    
    /**
     * Search form widget
     * @namespace
     */
    var SearchResultsForm = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '.places .form',
        
        /**
         * Delegated events
         * @type {Object}
         */
        events: {
            'click .placesBtn' : 'submit'
        },
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * init the search results form
         * @param {Backbone.View} options.parent search results app
         * @constructor
         */
        initialize: function (options) {
            _.extend(this, options);
            this.render();
        },
        
        /**
         * Render the search results form
         * @return {Input} *this*
         * @method
         */
        render: function () {
            this.$el.append(template());
            return this;
        },
        
        /**
         * Submit the Summary Form. Load the service util if not present
         * @method
         */
        submit: function () {
            var query = $('.placesFormTin').val();
            
            if (query) {
                this.model.set({
                    query: query
                });
            }
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            this.off();
        }
        
    });
    
    // export
    return SearchResultsForm;
    
});