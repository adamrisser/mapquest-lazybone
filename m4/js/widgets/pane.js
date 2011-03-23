(function () {
    
    /**
     * Summary pane that compliments the map.
     * 
     * The summary pane appears on the left for languages that read left to right
     * and on the right for languages that do the opposite.  The summary holds
     * all the information that compliments the map. The pane can also be collapse 
     * to give the map more space on the page.
     * @fileoverview
     */
    
    var padding = 20;
    
    /**
     * Resize the pane based off of the window height
     * @private
     */
    function _resize () {
        __nodes.pane.css('height', __window.innerHeight - padding);
    }
    
    /**
     * Toggle the display of the pane
     * @private
     */
    function _toggle (shouldOpen) {
        return function () {
            __nodes.pane[shouldOpen ? 'show' : 'hide']();
        }
    }
    
    /**
     * @namespace
     */
    var Pane = {
        
        /**
         * Init the summary pane.
         * @method
         */
        init: function () {
            
            // fire once to get the proper size
            _resize();
            
            // listen on resize to keep the proper size
            __util.resizer.subscribe('pane', function () {
                _resize();
            });
        },
        
        /**
         * Open the pane if it is closed
         * @method
         */
        open: _toggle(true),
        
        /**
         * Close the pane if it is open
         * @method
         */
        close: _toggle(false)
        
    };
    
    /**
     * Export into public namespace. Assign the new widget into the namespace
     * to prevent it from being lazy loaded on each new instantiation
     */
    __widgets.pane = Pane;
    
}());