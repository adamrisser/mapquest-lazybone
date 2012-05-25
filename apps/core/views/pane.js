/**
 * Summary pane that compliments the map.
 * 
 * The summary pane appears on the left for languages that read left to right
 * and on the right for languages that do the opposite.  The summary holds
 * all the information that compliments the map. The pane can also be collapse 
 * to give the map more space on the page.
 * @fileOverview
 */
define(['backbone', 'less!core/css/pane'], function (Backbone) {
    
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
         * Initialize the pane
         * @constructor
         */
        initialize: function () {
            _.bindAll(this, '_resize');
            this._resize();
            $(window).resize(this._resize);
        },
        
        /**
         * Resize the pane
         * @method
         */
        _resize: function () {
            this.$el.css({
                height: (window.innerHeight - 80 || 0) + 'px'
            });
        },
        
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
