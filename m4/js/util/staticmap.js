
/**
 * Static map helper class 
 * @fileoverview
 */
define(function () {
    
    /**
     * Static map URL template
     * @type {String}
     * @private
     */
    var URL = 'http://www.mapquestapi.com/staticmap/v3/getmap?key={key}&size={size}&zoom={zoom}&center={center}',
    
    /**
     * Map width
     * @type {Number}
     * @private
     */
    _WIDTH = 200,
    
    /**
     * Map height
     * @type {Number}
     * @private
     */
    _HEIGHT = 200,
    
    /**
     * Static map key
     * @type {String}
     * @private
     */
    _KEY = 'Dmjtd|lu612007nq%2C20%3Do5-50zah',
    
    
    /**
     * Static map util
     * @namespace
     */
    StaticMap = {
        
        /**
         * Get a static map image
         * @param  {Object} mapState
         * @return {Object} Object representing new static map image
         */    
        get: function (mapState) {
            var center = mapState.get("center") || {},
                img = document.createElement('img'),
                src = URL.replace('{key}', _KEY);
            
            // set size
            src = src.replace('{size}', _WIDTH + ',' + _HEIGHT);
            
            // set zoom
            src = src.replace('{zoom}', mapState.get("zoom") || 7);
            
            // set center
            src = src.replace('{center}', center.lat + "," + center.lng);
            
            img.src = src;
            img.width  = _WIDTH  + 'px';
            img.height = _HEIGHT + 'px';
            
            return {
                img: img,
                src: src,
                width: _WIDTH,
                height: _HEIGHT
            };
        }
    };
    
    // export
    return StaticMap;
    
});