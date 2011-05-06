/**
 * Gallery view
 * Allow user to manage multiple maps  
 * @fileoverview
 */
define(['js/util/html.js', 'css!css/gallery.css', 'text!html/gallery.html', 
'js/nodes.js', 'js/util/resizer.js'], function (html, gCss, htmlStr, nodes, resizer) {
    
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
     * Gallery widget
     */
    Gallery = {
        
        /**
         * Display the gallery
         * @method
         */
        open: function () {
            _galleryNodes = $(html.load('gallery', htmlStr, {
                src:    '',
                width:  '100',
                height: '100'
            }));
            
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
         * @method
         */
        toggle: function () {
            Gallery[_isOpen ? 'close' : 'open']();
            _isOpen = !_isOpen;
        },
        
        /**
         * Clean up event listener
         * @TODO: add after events are added
         */
        dispose: function () {
            resizer.unsubscribe('gallery');
        },
        
    };
    
    // export
    return Gallery;
});