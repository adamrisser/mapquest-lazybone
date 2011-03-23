(function () {
    
    /**
     * Create a blank core application backbone model
     */
    var Location = Backbone.Model.extend({
        
        /**
         * Get location address
         * @method
         * @return {Object} Address objects
         */
        getAddress: function () {
            return this.get('address');
        }
        
    });
    
    /*
     * Export into public namespace
     */
    __model.Location = Location;
    
}());