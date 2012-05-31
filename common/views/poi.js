/**
 * A poi (with infowindow attached) view
 * @fileOverview
 */
define(function () {
    
    var Poi = Backbone.View.extend({
        
        /**
         * Initialize the poi
         * @param {Backbone.View||Object} options.loc  location
         * @param {String}                options.path file path
         * @param {new MQA.Icon}          options.icon icon
         * @constructor
         */
        initialize: function (options) {
            var self = this, loc, latLng;
            _.extend(self, options);
            
            // accept a location object or a location model
            self.loc = options.loc.attributes || options.loc;
            
            latLng = self.loc.latLng;
            self.poi = new MQA.Poi(new MQA.LatLng(latLng.lat, latLng.lng));
            
            self.setOptions();
            
            MQA.EventManager.addListener(self.poi, 'infowindowopen', self.renderInfoWindow, self);
        },
        
        /**
         * Set the poi options. Can be overwritten for custom pois
         * @method
         */
        setOptions: function () {
            var poi = this.poi;
            
            poi.setIconOffset({ x: -11, y: -36 });
            
            poi.setShadow(null);
            poi.setIcon(this.icon);
            
            // have to run these once so the poi will listen for events
            poi.setInfoContentHTML('&nbsp;');
            poi.setRolloverContent(this.loc.name);
            
            // have to run these once so the poi will listen for events
            poi.setInfoContentHTML('&nbsp;');
        },
        
        /**
         * Render the infowindow (on open)
         * @method
         */
        renderInfoWindow: function () {
            var self = this;
            
            require([self.path], function (tmpl) {
                self.poi.infoWindow.setContent(tmpl({
                    loc: self.loc
                }));    
            });
        },
        
        /**
         * Return the mqa shape for toolkit processing
         * @return {MQA.Poi}
         * @method
         */
        toMQA: function () {
            return this.poi;
        }
        
    });
    
    return Poi;
    
});
