/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @description
 */
define(['nodes', 'core', 'tmpl!resulthtml', 'tmpl!locationhtml', 'css!resultscss'], function (nodes, coreModel, tmpl, locationTemplate) {
    
    var Result = Backbone.View.extend({
        
        /**
         * Parent element of view
         * @property
         */
        el: nodes.pane,
        
        /**
         * Initialize the view. Bind it to the model
         * @constructor
         */
        initialize: function () {
            _.bindAll(this, 'render');
            
            // When a model gets added, it will render in the left pane
            coreModel.bind('change:activeMapState', this.render)
        },
        
        /**
         * Render the view to the page
         * @method
         */
        render: function (tab) {
            
            // build the results list html string
            var results = tab.get('locations').map(function (loc) {
                
                // create the location object html
                return locationTemplate({
                    adr: loc.get('address'), 
                    name: loc.get('name')
                });
                
            }).join('');
            
            // remove prevous results and add new results to the dom
            this.$el
                .empty()
                .append(results);
        }
        
    });
    
    return new Result();
});