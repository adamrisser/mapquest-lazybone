/**
 * Summary pane that compliments the map.
 * 
 * The summary pane appears on the left for languages that read left to right
 * and on the right for languages that do the opposite.  The summary holds
 * all the information that compliments the map. The pane can also be collapse 
 * to give the map more space on the page.
 * @fileoverview
 */
define(['less!panecss'], function () {
    
    /**
     * Pane widget
     * @type {Backbone.View}
     */
    var Pane = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
        /**
         * Add html into the pane from a backbone view. 
         * Note: The backbone view must support returning itself from 
         *       its own view method!
         * @param {Backbone.View} view  backbone view
         * @method
         */
        push: function(view) {
            this.$el.append(view.render().el);
        },
        
        /**
         * Open the pane if it is closed
         * @method
         */
        open: function () {
            this.$el.show();
        },
        
        /**
         * Close the pane if it is open
         * @method
         */
        close: function () {
            this.$el.hide();
        }
        
    });
    
    /*
     * Export
     */
    return Pane;
    
});
