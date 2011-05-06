/**
 * Summary Form
 * 
 * The summary form is the main driver for the core directions/search 
 * app.  Locations from the user get geocoded (or routed) and then
 * placed into the model.
 * @description
 */
define(['js/nodes.js', 'js/model/location.js', 'css!css/summaryForm.css'], function (nodes, Location) {
    
    /**
     * Handle form submission. Instantiate core model if needed
     * @param {Object} response
     * @private
     */
    function _onSubmit (response) {
        
        if (!response || response.length == 0) {
            console.warn('No response on submit'); //$D
            return;
        }
        
        // load each location returned as a separate location model
        _.each(response, function (loc) {
            m4.model.Core.activeTab.addLocation(new Location(loc));
        });
    }
    
    /**
     * Summary form widget
     * @namespace
     */
    SummaryForm = {
        
        /**
         * Submit the Summary Form. Load the service util if not present
         * @method
         */
        submit: function () {
            require(['js/util/services.js', 'js/widgets/results.js'], function (service) {
                var query = nodes.summaryFormTin.val();
                
                if (query) {
                    service.search({
                        query: query,
                        callback: _onSubmit
                    });
                }
            });
        }
    };
    
    // Handle submit button events
    nodes.summaryFormBtn.bind('click', function () {
        SummaryForm.submit();
    });
    
    // Export into public namespace.
    return SummaryForm;
    
});