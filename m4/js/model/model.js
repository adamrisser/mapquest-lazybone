(function () {
    
    /**
     * Create a blank core application backbone model
     */
    var Model = Backbone.Collection.extend({
        
        model: __model.Location,
        
        initialize: function () {
            
        }
        
    });
    
    /*
     * Export into public namespace
     */
    __model.Core = Model;
        
}());