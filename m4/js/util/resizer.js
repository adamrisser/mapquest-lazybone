(function () {
    
    /**
     * A resizer for page elements. Its better to hook into it here than to
     * listen separately across all elements.
     * @fileoverview
     */
    
    var _callbacks = {};
    
    /**
     * Resize the pane based off of the window height
     * @private
     */
    function _resize () {
        var paneW = __nodes.pane.get(0).offsetWidth,
            h = __window.outerHeight || 0,
            w = __window.outerWidth - paneW - 15;
        
        __nodes.map.css({
            height: h + 'px',
            width:  (w > 0 ? w : 0) + 'px'
        });
    }
    
    /**
     * @namespace
     */
    var Resizer = {
        
        /**
         * Add a listener
         * @param {String}   name     name to register callback under
         * @param {Function} callback
         * @method
         */
        subscribe: function (name, callback) {
            if (!callback || !name) {
                console.warn('A callback is required to call Resizer.subscribe'); //$D
                return;
            }
            
            // register the callback
            _callbacks[name] = callback;
        },
        
        /**
         * Fire all callbacks, usually after a window resize event
         * @method
         */
        resize: function () {
            _.each(_callbacks, function (callback) {
                callback();
            });
        }
    };
    
    /**
     * Initialize the event listener. Makes the magic happen
     */
    window.addEventListener('resize', function () {
        Resizer.resize();
    }, true)
    
    /**
     * Export into public namespace. Assign the new widget into the namespace
     * to prevent it from being lazy loaded on each new instantiation
     */
    __util.resizer = Resizer;
    
}());