/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @description
 */
define(['core', 'tmpl!mapresulthtml', 'tmpl!locationhtml', 'css!resultscss'], function (coreModel, template, locationTemplate) {
    
    var MapResults = Backbone.View.extend({
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Initialize the view. Bind it to the model
         * @constructor
         */
        initialize: function () {
            _.bindAll(this, 'handleLoc');
        },
        
        /**
         * Render the view to the page
         * @return {Backbone.View} this
         * @method
         */
        render: function () {
            var loc = coreModel.get('location'),
                html = this.handleLoc(loc);
            
            this.$el.append(html);
            
            return this;
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
            m4.views.map.mqa.addShape(new MQA.Poi(adr.latLng)); 
                    
            // create the location object html
            return locationTemplate({
                adr: adr, 
                name: loc.get('name')
            });
        }
        
    });
    
    return MapResults;
});