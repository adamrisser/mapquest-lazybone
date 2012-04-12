/**
 * Summary Form
 * 
 * The summary form is the main driver for the core directions/search 
 * app.  Locations from the user get geocoded (or routed) and then
 * placed into the model.
 * @description
 */
define(['nodes', 'location', 'css!summaryformcss'], function (nodes, Location) {
    
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
            require(['util/services', 'widgets/results'], function (service) {
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