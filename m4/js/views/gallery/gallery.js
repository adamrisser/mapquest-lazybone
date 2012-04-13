/**
 * Gallery view
 * Allow user to manage multiple maps  
 * @fileoverview
 */
define(['html', 'css!gallerycss', 'tmpl!galleryhtml', 'nodes', 'resizer', 'staticmap'], 
function (html, gCss, htmlStr, nodes, resizer, staticMap) {
    
    /**
     * Resize the pane based off of the window height
     * @private
     */
    function _resize (node) {
        var h = window.innerHeight || 0,
            w = window.outerWidth;
        
        node.css({
            height: h + 'px',
            width:  (w > 0 ? w : 0) + 'px'
        });
    }
    
    /**
     * Is the gallery visible?
     * @type {Boolean}
     * @private
     */
    var _isOpen = false,
    
    /**
     * Visible nodes
     * @type {jQueryObject}
     * @private
     */
    _galleryNodes = null,
    
    /**
     * Core model to get maps from
     * @type {model}
     * @private
     */
    _model = null,
    
    /**
     * Gallery widget
     * @namespace
     */
    Gallery = {
        
        /**
         * Display the gallery
         * @method
         */
        open: function () {
            
            var images = [];
            
            // get static map image info
            _model.get('tabs').each(function (map) {
                images.push(staticMap.get(map.get('mapState')));
            });
            
            _galleryNodes = $(htmlStr({ images: images })); 
            
            nodes.body.append(_galleryNodes);
            
            // resize once
            _resize(_galleryNodes);
            
            // resize map based off of window height/width
            resizer.subscribe('gallery', function () {
                _resize(_galleryNodes);
            });
        },
        
        /**
         * Hide the gallery
         * @method
         */
        close: function () {
            Gallery.dispose();
            $('.gallery').empty().remove();
        },
        
        /**
         * If on, off. If off, on.
         * @param {model} coreModel 
         * @method
         */
        toggle: function (coreModel) {
            _model = coreModel;
            Gallery[_isOpen ? 'close' : 'open']();
            _isOpen = !_isOpen;
        },
        
        /**
         * Clean up event listener
         * @TODO: add after events are added
         */
        dispose: function () {
            resizer.unsubscribe('gallery');
        }
        
    };
    
    // export
    return Gallery;
});