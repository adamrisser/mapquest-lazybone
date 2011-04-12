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
         * @param {String}   name     name to register callback under
         * @param {Function} callback
         * @method
         */
        subscribe: function(name, callback){
            if (!callback || !name) {
                console.warn('A callback is required to call Resizer.subscribe'); //$D
                return;
            }
            
            // register the callback
            this._callbacks[name] = callback;
        },
        
        /**
         * Fire all callbacks, usually after a window resize event
         * @method
         */
        resize: function(){
            _.each(Resizer._callbacks, function(callback){
                callback();
            });
        }
    };
    
    // export
    return Resizer;
    
});