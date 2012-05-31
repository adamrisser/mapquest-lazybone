/**
 * A poi (with infowindow attached) view
 * @fileOverview
 */
define(['tmpl!common/html/infowindow'], function (tmpl) {
    
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
            poi.setRolloverContent('<div class="rollover">' + this.loc.name + '</div>');
            
            // have to run these once so the poi will listen for events
            poi.setInfoContentHTML('&nbsp;');
        },
        
        /**
         * Render the infowindow (on open)
         * @method
         */
        renderInfoWindow: function () {
            var self = this;
            
            require([self.path], function (pathtmpl) {
                var html = pathtmpl({
                    loc: self.loc 
                });
                
                // wrap html around infowindow html and attach
                self.poi.infoWindow.setContent(tmpl({
                    html: html
                }));
                
                self.resetSize();
            });
        },
        
        /**
         * Recalculate and set the infowindow's height
         * @method
         */
        resetSize: function () {
            var self = this,
                poi = self.poi,
                map = self.poi.map,
                poiDim = poi.infoWindow ? poi.infoWindow.getNaturalDimensions() : { height:0, width:0 },
                dy = poiDim.height + 5,
                dx = Math.max(0, poiDim.width + 5);
            
            map.windowManager.resizePoiWindow(poi, dx, dy);
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
