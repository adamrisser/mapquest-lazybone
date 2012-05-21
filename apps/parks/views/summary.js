/**
 * Vibe hood summary
 * 
 * The summary of a neighborhood that lives in the summary pane.
 * @description
 */
define([
    'tmpl!parks/html/summary', 
    'tmpl!parks/html/pois'
], function (summaryTmpl, poisTmpl) {
    
    var ParksSummary = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
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
            model.on('change:properties', this.renderSummary, this);
            model.get('pois').on('reset', this.renderTopPois, this);
        },
        
        /**
         * Render the neighborhood summary.
         * @param  {Backbone.Model} core core model
         * @param  {Object}         hood vibe neighborhood object
         * @return {Backbone.View}  this
         */
        renderSummary: function (core, park) {
            this.$el.empty()
                .append(this.summaryTmpl(park));
            
            return this;
        },
        
        /**
         * Render the top neighborhood pois.
         * @param  {Backbone.Collection} pois top hood pois
         * @return {Backbone.View}  this
         */
        renderTopPois: function (pois) {
            this.$el.empty().append(
                this.poisTmpl({ 
                    pois: pois
                })
            );
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
    
    // export
    return ParksSummary;
    
});