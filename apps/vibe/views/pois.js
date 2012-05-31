/**
 * Vibe pois view
 * A view to handle placing vibe pois on the map.
 * @fileOverview
 */
define(['common/views/poi'], function (Poi) {
    
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
         * @param {Backbone.View}  core  core app
         * @constructor
         */
        initialize: function (model, core) {
            var self = this;
            
            _.bindAll(self, 'save');
            
            self.model = model;
            self.core  = core;
            
            model.get('pois').on('reset', self.render, self);
            model.on('change:placeId', self.handlePlaceId, self);
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
            this.core.model.saveToShapeCollection({
                name: 'vibe',
                shapes: pois.map(this.createPoi, this)
            });
        },
        
        /**
         * Create a vibe poi
         * @param  {Backbone.View} place
         * @return {MQA.Poi}
         * @method
         */
        createPoi: function (place) {
            return new Poi({
                loc:  place,
                path: 'tmpl!core/html/location',
                icon: _largeIcon
            });
        },
        
        /**
         * Clean up the view. The controller will clean up the model
         * @method
         */
        dispose: function () {
            var self = this;
            
            self.model.get('pois').off('reset', self.render);
            self.off();
            self.undelegateEvents();
        }
        
    });
    
    return VibePois;
});