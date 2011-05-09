/**
 * Gallery item
 * A single gallery item. Only shown while in gallery mode.  
 * @fileoverview
 */
define([], function () {
    
    /**
     * Static map URL
     */
    //var URL = 'http://www.mapquestapi.com/staticmap/v3/getmap?zoom=7&center=40.0378,-76.305801',
    var URL = 'http://www.mapquestapi.com/staticmap/v3/getmap?key={key}&size={size}&zoom={zoom}&center={center}',
    
    /**
     * Map width
     */
    _WIDTH = 150,
    
    /**
     * Map height
     */
    _HEIGHT = 150,
    
    /**
     * Map height
     */
    _KEY = 'Dmjtd|lu612007nq%2C20%3Do5-50zah';
    
    /**
     * Get a static map image
     * @param  {Object} mapState
     * @return {HtmlElement}
     */    
    function getStaticMap (mapState) {
        var img = document.createElement('img'),
            src = URL.replace('{key}', _KEY);
        
        // set size
        src = src.replace('{size}', _WIDTH + ',' + _HEIGHT);
        
        // set zoom
        src = src.replace('{zoom}', mapState.zoom);
        
        // set center
        src = src.replace('{center}', mapState.center);
        
        img.width  = _WIDTH  + 'px';
        img.height = _HEIGHT + 'px';
        
    }
    
    /**
     * Item Constructor
     * @constructor
     */    
    function Item (mapState) {
        this.mapState = mapState;
    }
    
    Item.prototype = {
        
        /**
         * Static map image
         * @type {HTMLElement}
         * @property
         */
        staticMap: null
        
    };
    
    // export
    return Item;
});