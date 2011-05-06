/**
 * A resizer for page elements. Its better to hook into it here than to
 * listen separately across all elements.
 * @fileoverview
 * @namespace
 */
define(function () {
    
    var Resizer = {
    
        /**
         * Resizer callbacks
         * @private
         */
        _callbacks: {},
        
        /**
         * Add a listener
         * @param {String}   name     name to register callback
         * @param {Function} callback
         * @method
         */
        subscribe: function (name, callback) {
            if (!callback || !name) {
                console.warn('A callback is required to call Resizer.subscribe'); //$D
                return;
            }
            
            // register the callback
            Resizer._callbacks[name] = callback;
        },
        
        /**
         * Remove a listener
         * @param {String}   name     name to unregister callback
         * @method
         */
        unsubscribe: function (name) {
            delete Resizer._callbacks.name;
        },
        
        /**
         * Fire all callbacks, usually after a window resize event
         * @method
         */
        resize: function () {
            _.each(Resizer._callbacks, function(callback){
                callback();
            });
        }
    };
    
    // export
    return Resizer;
});