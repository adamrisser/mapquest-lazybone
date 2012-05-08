/**
 * Vibe pois view
 * A view to handle placing vibe pois on the map.
 * @fileOverview
 */
define([], function () {
    
    /**
     * Large vibe icon
     * @type {MQA.Icon}
     */
    var _largeIcon = new MQA.Icon('http://content.mqcdn.com/vibe/2-5-42/images/s1_big_pin_selected.png', 25, 40),
    
    /**
     * Neighborhood vibe URL
     * @type {String}
     */
    _API_URL = 'http://mqvibe-api.mapquest.com/places/search',
    
    /**
     * An individual neighborhood object.
     */
    VibePois = Backbone.View.extend({
        
        /**
         * Initialize pois for a neighborhood.
         * @param {Backbone.Model} model vibe model
         * @param {Backbone.View}  map   map view
         * @constructor
         */
        initialize: function (model, map) {
            var self = this;
            
            self.model = model;
            
            self.map = map;
            
            _.bindAll(self, 'render', 'save', 'handlePlaceId');
            
            model.get('pois').bind('reset', self.render);
            model.bind('change:placeId', self.handlePlaceId);
        },
        
        /**
         * When a new place id enters the model, fetch and save the new
         * neighborhood on the model.
         * @method
         */
        handlePlaceId: function () {
            $.when(
                this.fetch(1)
            // is 
            ).done(
                this.save
            );
        },
        
        /**
         * Save a set of pois to the vibe model
         * @param {Object} response  vibe api response
         * @method
         */
        save: function (response) {
            this.model.get('pois').reset(response.features[0].pois);
        },
        
        /**
         * Fetches the pois for this neighborhood and the supplied category id.
         * @param  {int} catId of the pois to fetch
         * @return {jQuery.Promise}
         */
        fetch: function (catId) {
            return $.ajax({
                url: _API_URL,
                data: {
                    id: this.model.get('placeId'),
                    include_pois: 1, 
                    poi_category_id: catId, 
                    poi_new: 0,
                    poi_limit: 20
                },
                dataType: 'jsonp'
            });
        },
        
        /**
         * Render our neighborhood and all it's pois for the category.
         * @param  {Object}        responsePlace place information
         * @param  {Object}        responsePois  pois in place
         * @return {Backbone.View} this
         */
        render: function (pois) {
            var self = this,
                sc = new MQA.ShapeCollection();
                
            sc.collectionName = 'vibepois';
            
            pois.each(function (place) {
                var mqaPoi = new MQA.Poi(place.get('latLng'));
                mqaPoi.setIcon(_largeIcon);
                sc.add(mqaPoi);
            });
            
            // add to the map and best fit
            self.map.mqa.addShapeCollection(sc);
            self.map.bestFit();
        },
        
        /**
         * Clean up the view. The controller will clean up the model
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.map.mqa.removeShapeCollection('vibepois');
            self.model.get('pois').unbind('reset', self.render);
            self.off();
            self.undelegateEvents();
        }
        
    });
    
    return VibePois;
});