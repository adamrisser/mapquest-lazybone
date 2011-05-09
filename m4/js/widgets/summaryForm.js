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
                        callback: function (response) {
                            m4.model.Core.handleResponse(response);
                        }
                    });
                }
            });
        }
    };
    
    // Handle submit button events
    nodes.summaryFormBtn.bind('click', function () {
        SummaryForm.submit();
    });
    
    // Export
    return SummaryForm;
});