/**
 * Parkquest app main view
 * 
 * Central brain of the parkquest app. Instantiates the parkquest model and 
 * views. Responsible for cleaning up everything on dispose.
 * @fileOverview
 */
define([
    'parks/models/parks', 
    'parks/views/summary',
    'common/views/poi',
    'common/views/shape'
], function (ParksModel, ParksSummary, Poi, Shape) {
    
    var ParksController = Backbone.View.extend({
        
        /**
         * Parent
         * @type {String}
         * @property
         */
        el: '#pane',
        
        /**
         * Vibe model
         * @type {Backbone.Model}
         * @property
         */
        model: null,
        
        /**
         * Parkquest api url
         * @type {String}
         */
        _url: 'http://localhost:8000/apps/parks/data',
        
        /**
         * Small vibe icon
         * @type {MQA.Icon}
         */
        _icon: new MQA.Icon('http://content.mqcdn.com/mapbuilder-190/cdn/dotcom3/images/icons/collection/v2/themes/recreation/1.png', 30, 30),
        
        /**
         * Initialize this hood.
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core winston application
         * @constructor        
         */
        initialize: function (options) {
            var self = this;
            _.bindAll(self, 'save', 'saveAsShapeCollection');
            
            self.core = options.core;
            self.model = new ParksModel();
            self.summary = new ParksSummary(self.model);
            
            self.load();
        },
        
        /**
         * Fetches the pois for this park
         * @return {jQuery.Promise}
         */
        fetch: function () {
            return $.ajax({
                url: this._url,
                data: {
                    park: 'yellowstone',
                    center: '(44.489785,-110.001101)',
                    layer: 'boundary,locations'
                },
                dataType: 'json'
            });
        },
        
        /**
         * Fetch and save the new park on the model.
         * @method
         */
        load: function () {
            var self = this;
            
            $.when(
                self.fetch()
            ).pipe(
                self.cleanResponse
            ).done(
                self.save,
                self.saveAsShapeCollection
            );
        },
        
        /**
         * Convert response into a more usable object
         * @return {Object}
         * @method
         */
        cleanResponse: function (response) {
            var feats = response[0].features[0];
            
            return {
                pois: response[1].features,
                geometry: feats.geometry,
                properties: feats.properties
            };
        },
        
        /**
         * Save a set of pois to the vibe model
         * @param {Object} response  parks api response
         * @method
         */
        save: function (response) {
            var model = this.model;
            
            // save data about the park
            model.set({ properties: response.properties });
            
            // save pois
            model.get('pois').reset(response.pois);
        },
        
        /**
         * Create a parks poi
         * @param {Object} loc parks api location
         * @method
         */
        createPoi: function (loc) {
            
            return new Poi({
                loc:  loc,
                path: 'tmpl!core/html/location',
                icon: this._icon
            });
        },
        
        /**
         * Create a park shape overlay
         * @param {Array} geometry shape points
         * @method
         */
        createShape: function (geometry) {
            return new Shape({
                geometry: geometry,
                properties: {
                    color: '#000000',
                    colorAlpha: .2,
                    borderWidth: 2,
                    fillColor: '#075053',
                    fillColorAlpha: .1    
                }
            });
        },
        
        /**
         * Save data as a shape collection to the core model
         * @param {Object} response  parks api response
         * @method
         */
        saveAsShapeCollection: function (response) {
            var self = this, shapes;
            
            // save shapes to the core model
            MQA.withModule('shapes', function () {
                
                // combine mqa.shapes into an array
                shapes = response.pois.map(self.createPoi, self);
                shapes.push(self.createShape(response.geometry));
                
                self.core.model.saveToShapeCollection({
                    name: 'parks',
                    shapes: shapes
                });
            });
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.model.dispose();
            self.summary.dispose();
            
            self.model = null;
            self.summary = null;
            
            self.off();
            self.$el.empty();
        }
        
    });
    
    // export
    return ParksController;
    
});