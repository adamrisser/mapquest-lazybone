/**
 * Main application model. A collection of map models
 * @fileOverview
 */
define(['backbone'], function (Backbone) {
    
    /**
     * Collection of MQA.ShapeCollections
     * @type {Backbone.Collection<MQA.ShapeCollections>}
     * @private
     */
    var ShapeCollectionCollection = Backbone.Collection.extend(),
    
    /**
     * Create a blank core application backbone model
     * @namespace
     */
    Core = Backbone.Model.extend({
        
        defaults: {
            
            /**
             * Location representing the last search a user a user made
             * @type {Backbone.Model}
             */
            location: null,
            
            /**
             * Collection of shapes.  Used primarily by views with a tile map,
             * but technically anything goes amirite?
             * @type {Backbone.Collection<MQA.ShapeCollections>}
             */
            shapeCollections: new ShapeCollectionCollection,
            
            /**
             * An easy way to tell the state of the model
             * - index
             * - map
             * - directions
             * - search
             * @type {String}
             */
            //TODO: needed anymore?
            state: 'index'
        },
        
        /**
         * Init the core model
         * @param {Backbone.View} options.core
         * @method
         */
        initialize: function (options) {
            var self = this,
                shapes = self.get('shapeCollections');
            
            self.bind('change:location', self.setState, self);
            
            // when a route changes, remove all shapes
            options.core.router.on('all', shapes.reset, shapes);
        },
        
        /**
         * Set the model's state
         * @method
         */
        setState: function () {
            var loc = this.get('location'), state, query;
            
            if (loc.get('unresolvedLocations').length > 0) {
                state = 'search';
            }
            else {
                state = 'map';
            }
            
            this.set({ state: state });
        },
        
        /**
         * Save a collection of map objects to the model as a shape collection
         * @param {String}       options.name   name of the shape collections
         * @param {Object|Array} options.shapes shapes
         * @method
         */
        saveToShapeCollection: function (options) {
            
            // force an array
            if (!_.isArray(options.shapes)) {
                options.shapes = [options.shapes];
            }
            
            // see if this shape collection already exists
            var backboneModel = this.get('shapeCollections').where({
                collectionName: options.name
            })[0];
            
            // nothing? create a new one
            if (_.isEmpty(backboneModel)) {
                
                // create the new collections
                sc = new MQA.ShapeCollection();
                sc.collectionName = options.name;
                
                // populate the new collection
                _.each(options.shapes, sc.add, sc);
                
                this.get('shapeCollections').add(sc);
            }
            // update existing model
            else {
                
                // add new shapes to the collection
                _.each(options.shapes, backboneModel.attributes.add, backboneModel.attributes);
                
                // make sure to alert everything that this happened
                this.get('shapeCollections').trigger('update', backboneModel);
            }
            
        },
        
    });
    
    // Export into public namespace
    return Core;
    
});