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
    var _icon = new MQA.Icon("http://149.174.182.23:5285/media/images/park_point.png", 22, 36),
    
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
         * @constructor
         */
        initialize: function (model) {
            var self = this;
            
            self.model = model;
            
            self.map = m4.views.map;
            
            _.bindAll(self, 'render', 'save', 'load');
            
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
            var self = this;
            
            MQA.withModule('shapes', function () {
                var sc = new MQA.ShapeCollection();
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
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.unbind();
        }
        
    });
    
    return ParksPois;
});