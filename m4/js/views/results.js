/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @description
 */
define(['nodes', 'core', 'tmpl!locationhtml', 'css!resultscss'], function (nodes, coreModel, locationTemplate) {
    
    var Result = Backbone.View.extend({
        
        /**
         * Parent element of view
         * @property
         */
        el: nodes.pane,
        
        /**
         * Delegated events
         * @property
         */
        events: {
            //TODO: fill in
        },
        
        /**
         * Initialize the view. Bind it to the model
         * @constructor
         */
        initialize: function () {
            _.bindAll(this, 'render', 'handleLoc');
            
            // When a model gets added, it will render in the left pane
            coreModel.bind('change:location', this.render);
        },
        
        /**
         * Render the view to the page
         * @param {Backbone.Model} loc location model
         * @method
         */
        render: function (location) {
            
            var self = this, 
                loc = location.get('location'), 
                html;
            
            // get the html for the results that should be rendered
            switch (coreModel.get('state')) {
                case 'search': 
                    html = self.renderSearchResult(loc);
                break;
                
                // map state
                default: 
                    html = self.renderMapResult(loc);
                break;
            }
            
            // remove prevous results and add new results to the dom
            self.$el.empty().append(html);
            
            //TODO: probably needs to be removed
            m4.map.mqa.bestFit();
        },
        
        /**
         * Build the results list html string
         * @param  {Backbone.Model} loc location that contains a map result
         * @return {String}
         * @method
         */
        renderMapResult: function (loc) {
            return this.handleLoc(loc);
        },
        
        /**
         * Build the results list html string
         * @param  {Backbone.Model} loc location that contains search results
         * @return {String}
         * @method
         */
        renderSearchResult: function (loc) {
            return loc.get('unresolvedLocations').map(this.handleLoc).join('');
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
            m4.map.mqa.addShape(new MQA.Poi(adr.latLng)); 
                    
            // create the location object html
            return locationTemplate({
                adr: adr, 
                name: loc.get('name')
            });
        }
        
    });
    
    return new Result();
});