/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @description
 */
define([
    'tmpl!core/html/mapresult',
    'tmpl!core/html/location', 
    'less!core/css/results'
], function (template, locationTemplate) {
    
    var MapResults = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#pane',
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Initialize the view. Bind it to the model
         * @param {Array}         frags route fragments that initialized the app
         * @param {Backbone.View} core  core winston application
         * @constructor
         */
        initialize: function (frags, core) {
            var self = this;
            
            _.bindAll(self, 'handleLoc', 'render');
            
            core.model.on('change:location', self.render);
            
            self.map = core.map;
        },
        
        /**
         * Render the view to the page
         * @param  {Backbone.Model} core  core model
         * @return {Backbone.View}  this
         * @method
         */
        render: function (core) {
            var loc = core.get('location'),
                html = this.handleLoc(loc);
            
            this.$el.empty().append(html);

            return this;
        },
        
        /**
         * Handle a new location model coming into the results view
         * @param  {Backbone.Model} loc location model that contains map results
         * @return {String}             location in html form
         * @method
         */
        handleLoc: function (loc) {
            var adr = loc.get('address');
            
            //TODO: probably need a POI manager, this is out of place here
            // add POI
            this.map.mqa.addShape(new MQA.Poi(adr.latLng)); 
                    
            // create the location object html
            return locationTemplate({
                adr: adr, 
                name: loc.get('name')
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.$el.empty();
            this.off();
        }
        
    });
    
    return MapResults;
});