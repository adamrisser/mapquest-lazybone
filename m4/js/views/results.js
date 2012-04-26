/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @description
 */
define(['nodes', 'core', 'tmpl!resulthtml', 'css!resultscss'], function (nodes, coreModel, tmpl) {
    
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
            
            $('.vcard').remove();
            
            var html = $(tmpl({
                addresses: tab.get('locations').pluck('address')
            }));
            
            this.$el.append(html);
        }
        
    });
    
    return new Result();
});