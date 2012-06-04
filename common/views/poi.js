/**
 * A poi (with infowindow attached) view
 * @fileOverview
 */
define(['backbone', 'tmpl!common/html/infowindow', 'MQA'], function (Backbone, tmpl) {
    
    var Poi = Backbone.View.extend({
        
        /**
         * Location model that the poi represents
         * @type {Backbone.Model}
         * @property
         */
        loc: null,
        
        /**
         * MQA toolkit poi
         * @type {MQA.Poi}
         * @property
         */
        poi: null,
        
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
            
            // TODO: standardize location object so this is going to be a pain
            latLng = self.loc.latLng || self.loc.address.latLng;
            
            self.poi = new MQA.Poi(new MQA.LatLng(latLng.lat, latLng.lng));
            
            self.setOptions();
            
            MQA.EventManager.addListener(self.poi, 'infowindowopen', function () {
                self.renderInfoWindow();
            }, self);
        },
        
        /**
         * Set the poi options. Can be overwritten for custom pois
         * @method
         */
        setOptions: function () {
            var poi = this.poi;
            
            poi.setIconOffset({ x: -11, y: -36 });
            poi.setShadow(null);
            
            if (this.icon) {
                poi.setIcon(this.icon);
            }
            
            // have to run these once so the poi will listen for events
            poi.setInfoContentHTML('&nbsp;');
            poi.setRolloverContent('<div class="rollover">' + 
                (this.loc.name || this.loc.address.singleLineAddress) + '</div>');
        },
        
        /**
         * Render the infowindow (on open)
         * @method
         */
        renderInfoWindow: function () {
            require([this.path], _.bind(this.load, this));
        },
        
        /**
         * Load template into infowindow
         * @method
         */
        load: function (pathTmpl) {
            this.setHtml(this.getHtml(pathTmpl));
        },
        
        /**
         * Get infowindow html
         * @param  {Function} pathtmpl underscore template
         * @return {String}
         * @method
         */
        getHtml: function (pathtmpl) {
            return tmpl({
                html: pathtmpl({
                    loc: this.loc 
                })
            });
        },
        
        /**
         * Set infowindow HTML
         * @param {String} html
         * @method
         */
        setHtml: function (html) {
            this.poi.infoWindow.setContent(html);
            this.resetSize();
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
