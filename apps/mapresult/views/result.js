/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @fileOverview
 */
define([
    'tmpl!mapresult/html/result',
    'tmpl!core/html/location', 
    'less!searchresults/css/results'
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
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core winston application
         * @constructor
         */
        initialize: function (options) {
            var self = this;
            
            self.map = core.map;
            self.sc = new MQA.ShapeCollection();
            self.sc.collectionName = 'mappoi';
            
            _.bindAll(self, 'handleLoc', 'render');
            core.model.on('change:location', self.render);
            
            // render any results that were inserted before the change:location
            // event was bound onto
            self.render(core.model)
        },
        
        /**
         * Render the view to the page
         * @param  {Backbone.Model} model core model
         * @return {Backbone.View}  this
         * @method
         */
        render: function (model) {
            var self = this;
            
            // only render map results
            if (model.get('state') === 'map') {
                var loc = model.get('location'),
                    html = self.handleLoc(loc);
                
                self.$el.empty().append(html);
                
                //TODO: move this logic into own view
                // add to the map and best fit
                self.map.mqa.addShapeCollection(self.sc);
                self.map.bestFit();
            }
            
            return self;
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
            this.sc.add(new MQA.Poi(adr.latLng)); 
                    
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
            var mqa = this.map.mqa;
            mqa.getShapeCollection('mappoi').removeAll();
            mqa.removeShapeCollection('mappoi');
            
            this.$el.empty();
            this.off();
        }
        
    });
    
    return MapResults;
});