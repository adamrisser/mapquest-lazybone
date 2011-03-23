(function () {
    
    /**
     * Summary Form
     * 
     * The summary form is the main driver for the core directions/search 
     * app.  Locations from the user get geocoded (or routed) and then
     * placed into the model.
     * @description
     */
    
    /**
     * Handle form submission. Instantiate core model if needed
     * @param {Object} response
     * @private
     */
    var _onSubmit = function (response) {
        
        if (!response || response.length == 0) {
            return;
        }
        
        // instantiate a new core model if one isn't present
        var core = __model.core;
        
        // load each location returned as a separate location model
        _.each(response, function (loc) {
            core.add(new __model.Location(loc));
        });
    };
    
    /**
     * Init a new Summary Form
     * @constructor
     */
    function SummaryForm () {
        var self = this;
        
        __nodes.summaryForm = $('#summaryForm'); 
        __nodes.summaryFormBtn = $('#summaryFormBtn');
        __nodes.summaryFormTin = $('#summaryFormTin');
        
        __nodes.summaryFormBtn.bind('click', function (evt) {
            self.submit();
        });
    }
    
    SummaryForm.prototype = {
        
        /**
         * Submit the Summary Form. Load the service util if not present
         * @method
         */
        submit: function () {
            require(['util.services.js'], function () {
                var query = __nodes.summaryFormTin.val();
                
                if (query) {
                    __util.service.search({
                        query: query,
                        callback: _onSubmit
                    });
                }
            });
        }
        
    };
    
    /*
     * Export into public namespace.
     */
    __widgets.SummaryForm = SummaryForm;
    
}());