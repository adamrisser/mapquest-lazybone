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
    'parks/util/parksutil'
], function (ParksModel, ParksSummary, parksUtil) {
    
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
         * Initialize this hood.
         * @param {Array}        frags route fragments that initialized the app
         * @param {BackboneView} core  core  winston application
         * @constructor        
         */
        initialize: function (frags, core) {
            var self = this, 
                model = self.model = new ParksModel();
            
            self.core = core;
            
            _.bindAll(self, 'save', 'saveAsShapeCollection');
            
            self.summary = new ParksSummary(model);
            
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
         * Save data as a shape collection to the core model
         * @param {Object} response  parks api response
         * @method
         */
        saveAsShapeCollection: function (response) {
            var self = this, shapes;
            
            // save shapes to the core model
            MQA.withModule('shapes', function () {
                
                // combine mqa.shapes into an array
                shapes = response.pois.map(parksUtil.createPoi);
                shapes.push(parksUtil.createOverlay(response.geometry));
                
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