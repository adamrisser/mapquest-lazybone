/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @fileOverview
 */
//TODO: poi code should be stripped from this view and moved elswhere
define([
    'tmpl!searchresults/html/results', 
    'tmpl!core/html/location', 
    'less!searchresults/css/results'
], function (template, locationTemplate) {
    
    var SearchResultsList = Backbone.View.extend({
        
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
            
            self.map = options.core.map;
            
            self.sc = new MQA.ShapeCollection();
            self.sc.collectionName = 'searchpois';
            
            _.bindAll(self, 'handleLoc', 'render');
            core.model.on('change:location', self.render);
            
            // render any results that were inserted before the change:location
            // event was bound onto
            self.render(options.core.model)
        },
        
        /**
         * Render the view to the page
         * @param {Backbone.Model} model  core model
         * @method
         */
        render: function (model) {
            var self = this;
            
            // only render search results
            if (model.get('state') === 'search') {
                    
                var html = self.template({
                    locs: model.get('location').get('unresolvedLocations'), 
                    locTemplate: self.handleLoc
                });
                
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
            mqa.getShapeCollection('searchpois').removeAll();
            mqa.removeShapeCollection('searchpois');
            
            this.$el.empty();
            this.off();
        }
        
    });
    
    return SearchResultsList;
});