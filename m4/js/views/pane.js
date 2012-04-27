/**
 * Summary pane that compliments the map.
 * 
 * The summary pane appears on the left for languages that read left to right
 * and on the right for languages that do the opposite.  The summary holds
 * all the information that compliments the map. The pane can also be collapse 
 * to give the map more space on the page.
 * @fileoverview
 */
define(['nodes', 'css!panecss', 'directory'], function (nodes) {
     
    /**
     * Pane widget
     * @namespace
     */
    Pane = {
        
        /**
         * Open the pane if it is closed
         * @method
         */
        open: function () {
            nodes.pane.show();
        },
        
        /**
         * Close the pane if it is open
         * @method
         */
        close: function () {
            nodes.pane.hide();
        }
        
    };
    
    /*
     * Export
     */
    return Pane;
    
});