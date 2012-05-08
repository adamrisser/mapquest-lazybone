/**
 * Vibe hood summary
 * 
 * The summary of a neighborhood that lives in the summary pane.
 * @description
 */
define([
    'tmpl!vibe/html/summary', 
    'tmpl!vibe/html/pois', 
    'less!vibe/css/summary', 
    'twitter', 
    'css!twittercss'
], function (summaryTmpl, poisTmpl) {
    
    var HoodSummary = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
        events: {
            'mouseover i': 'popover'
        },
        
        /**
         * Summary underscore template
         * @param {object} config object used to embed data into the template
         * @method
         */
        summaryTmpl: summaryTmpl,
        
        /**
         * Top pois underscore template
         * @param {object} config object used to embed data into the template
         * @method
         */
        poisTmpl: poisTmpl,
        
        /**
         * Initialize summary for a neighborhood
         * @param {Backbone.Model} model vibe model 
         * @constructor        
         */
        initialize: function (model) {
            _.bindAll(this, 'renderSummary', 'renderTopPois');
            
            model.on('change:hood', this.renderSummary);
            model.get('pois').on('reset', this.renderTopPois);
        },
        
        /**
         * Render the neighborhood summary.
         * @param  {Backbone.Model} core core model
         * @param  {Object}         hood vibe neighborhood object
         * @return {Backbone.View}  this
         */
        renderSummary: function (core, hood) {
            this.$el.empty()
                .append(this.summaryTmpl(hood.properties));
            
            return this;
        },
        
        /**
         * Render the top neighborhood pois.
         * @param  {Object}         pois top hood pois
         * @return {Backbone.View}  this
         */
        renderTopPois: function (pois) {
            this.$el.append(this.poisTmpl({ 
                pois: pois
            }));
            
            return this;
        },
        
        popover: function (evt) {
            $(evt.currentTarget).popover('show');
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.off();
            this.undelegateEvents();
        }
        
    });
    
    return HoodSummary;
});