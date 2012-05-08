/**
 * Vibe pois view
 * 
 * A view to handle placing vibe pois on the map.
 * @description
 */
define(['vibemodel'], function (VibeModel) {
    
    /**
     * Small vibe icon
     * @type {MQA.Icon}
     */
    var _icon = new MQA.Icon('http://content.mqcdn.com/mapbuilder-190/cdn/dotcom3/images/icons/collection/v2/themes/recreation/1.png', 30, 30),
    
    /**
     * Parkquest api url
     * @type {String}
     */
    _API_URL = 'http://localhost:8000/m4/js/apps/parks/data',
    
    /**
     * An individual neighborhood object.
     */
    ParksPois = Backbone.View.extend({
        
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
            
            _.bindAll(self, 'render', 'save');
            
            model.get('pois').bind('reset', self.render);
            
            self.load();
        },
        
        /**
         * Fetch and save the new park on the model.
         * @method
         */
        load: function () {
            $.when(
                this.fetch()
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
            this.model.set({
                geometry: response[0].features[0].geometry,
                properties: response[0].features[0].properties
                
            });
            
            this.model.get('pois').reset(response[1].features);
        },
        
        /**
         * Fetches the pois for this park
         * @return {jQuery.Promise}
         */
        fetch: function () {
            return $.ajax({
                url: _API_URL,
                data: {
                    park:'yellowstone',
                    center:'(44.489785,-110.001101)',
                    layer:'boundary,locations'
                },
                dataType: 'json'
            });
        },
        
        /**
         * Render pois onto the map.
         * @param  {Backbone.Collection} pois poi collection
         */
        render: function (pois) {
            var self = this,
                sc = new MQA.ShapeCollection();
            
            sc.collectionName = 'parkpois';
            
            // add pois to the shape collection
            pois.each(function (place) {
                var coords = place.get('geometry').coordinates,
                    poi = new MQA.Poi(new MQA.LatLng(coords[1], coords[0]));
                
                poi.setIconOffset({x: -11, y: -36});
                poi.setShadow(null);
                poi.setIcon(_icon);
                
                sc.add(poi);
            });
            
            // add to the map and best fit
            self.map.mqa.addShapeCollection(sc);
            self.map.bestFit();
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.map.mqa.removeShapeCollection('parkpois');
            this.model.get('pois').unbind('reset', self.render);
            this.off();
            this.undelegateEvents();
        }
        
    });
    
    return ParksPois;
});