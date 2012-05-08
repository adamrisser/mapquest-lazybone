/**
 * Vibe Hood
 * 
 * View for putting neighborhood shapes on the map
 * @description
 */
define(['vibeutil'], function (util) {
    
    var _API_URL = 'http://mqvibe-api.mapquest.com/places/search',
    
    VibeHood = Backbone.View.extend({
        
        /**
         * Initialize the hood view.
         * @param {Backbone.Model} model vibe model
         * @param {Backbone.View}  map   map view 
         * @constructor        
         */
        initialize: function (model, map) {
            var self = this;
            
            self.model = model;
            
            self.map = map;
            
            _.bindAll(self, 'render', 'save', 'handlePlaceId');
            
            model.on('change:hood', self.render);
            model.on('change:placeId', self.handlePlaceId);
        },
        
        /**
         * When a new place id enters the model, fetch and save the new
         * neighborhood on the model.
         * @method
         */
        handlePlaceId: function () {
            $.when(
                this.fetch()
            ).done(
                this.save
            );
        },
        
        /**
         * Save a neighborhood to the vibe model
         * @param {Object} response  vibe api response
         * @method
         */
        save: function (response) {
            this.model.set({ 
                hood: response.features[0]
            });
        },
        
        /**
         * Fetches our neighborhood info.
         * @return {jQuery.Promise}
         * @method
         */
        fetch: function () {
            return $.ajax({
                url: _API_URL,
                data: {
                    place_id: this.model.get('placeId'), 
                    include_categories: 1,
                    include_children: 1,
                    description_limit: 141
                },
                dataType: 'jsonp',
            });
        },
        
        /**
         * Render our neighborhood and all it's pois for the category.
         * @param  {Object}        core core model
         * @param  {Object}        hood vibe neighborhood
         * @return {Backbone.View} this
         * @method
         */
        render: function (core, hood) {
            var self = this;
            
            MQA.withModule('shapes', function () {
                
                var sc = new MQA.ShapeCollection(),
                    overlay = new MQA.PolygonOverlay(),
                    style   = util.getVibeScoreParams(hood.properties.vibe_score),
                    shapePoints = util.flattenPoints(hood.geometry);
                
                sc.collectionName = 'vibeoverlay';
                
                overlay.setShapePoints(shapePoints);
                
                overlay.updateProperties({
                    colorAlpha: 1.0,
                    color: '#000',
                    borderWidth: 3,
                    fillColor: style.rgb,
                    fillColorAlpha: style.opacity
                });
                
                sc.add(overlay);
                
                // add to the map and best fit
                self.map.mqa.addShapeCollection(sc);
                self.map.bestFit();
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.map.mqa.removeShapeCollection('vibeoverlay');
            this.off();
        }
        
    });
    
    return VibeHood;
});