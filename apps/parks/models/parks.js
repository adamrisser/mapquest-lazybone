/**
 * Vibe 'parkquest' app
 * @fileoverview
 */
define(['backbone'], function (Backbone) {
    
    /**
     * Collection of pois
     * @type {Backbone.Collection}
     * @private
     */
    var PoiCollection = Backbone.Collection.extend(),
    
    /**
     * Create a parks model
     * @type {Backbone.Model}
     */
    ParksModel = Backbone.Model.extend({
        
        defaults: {
            
            /**
             * Park metadata
             * @type {Object}
             */
            properties: null,
            
            /**
             * Park geometry
             * @type {Object}
             */
            geometry: null,
            
            /**
             * Pois in the current park
             * @type {Backbone.Collection}
             */
            pois: new PoiCollection()
            
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            this.off();
            this.destroy();
        }
        
    });
    
    // Export
    return ParksModel;
    
});