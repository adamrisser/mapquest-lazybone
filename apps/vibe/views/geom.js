/**
 * Vibe Hood
 * 
 * View for putting neighborhood shapes on the map
 * @description
 */
define(['vibe/shapeutil'], function (util) {
    
    var _API_URL = 'http://mqvibe-api.mapquest.com/places/search',
    
    VibeHood = Backbone.View.extend({
        
        /**
         * Initialize the hood view.
         * @param {Backbone.Model} model vibe model
         * @param {Backbone.View}  core  core app 
         * @constructor        
         */
        initialize: function (model, core) {
            var self = this;
            
            self.model = model;
            self.core  = core;
            
            _.bindAll(self, 'save', 'saveAsShapeCollection');
            
            model.on('change:placeId', self.handlePlaceId, self);
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
                this.save,
                this.saveAsShapeCollection
            );
        },
        
        /**
         * Save a neighborhood to the vibe model
         * @param {Object} response  vibe api response
         * @method
         */
        save: function (response) {
            this.model.set({ hood: response.features[0] });
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
                dataType: 'jsonp'
            });
        },
        
        /**
         * Render our neighborhood and all it's pois for the category.
         * @param  {Object}        hood vibe neighborhood
         * @return {Backbone.View} this
         * @method
         */
        saveAsShapeCollection: function (hood) {
            MQA.withModule('shapes', function () {
                
                hood = hood.features[0];
                
                var overlay = new MQA.PolygonOverlay(),
                    style   = util.getVibeScoreParams(hood.properties.vibe_score),
                    shapePoints = util.flattenPoints(hood.geometry);
                
                overlay.setShapePoints(shapePoints);
                
                overlay.updateProperties({
                    colorAlpha: 1.0,
                    color: '#000',
                    borderWidth: 3,
                    fillColor: style.rgb,
                    fillColorAlpha: style.opacity
                });
                
                self.core.model.saveToShapeCollection({
                    name: 'vibe',
                    shapes: overlay
                });
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.off();
        }
        
    });
    
    return VibeHood;
});