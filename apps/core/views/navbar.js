/**
 * Navigation bar
 * Adds functionality to the navigation bar that sits at the top of the page.
 * @fileOverview
 */
define(['backbone', 'less!core/css/navbar'], function (Backbone) {
    
    var NavBar = Backbone.View.extend({
        
        /**
         * Parent
         * @property
         */
        el: '#nav',
        
        /**
         * Delegated events off of parent
         * @type {Object}
         */
        events: {
            'click a': '_handleClick'
        },
        
        /**
         * Initialize the view.
         * @param {Object} options.hash hash route
         * @constructor
         */
        initialize: function (options) {
            var el;
            
            // passed in selector or the first link
            if (options && options.hash) {
                el = $('#nav a[href$="' + options.hash + '"]');                
            }
            
            if (!el || el.length < 1) {
                el = $('#nav .selected a');
            }
            
            // set element that is active
            this._toActive(el);
        },
                
        /**
         * Handle click event on a list item
         * @param {Object} evt click event
         * @method
         */
        _handleClick: function (evt) {
            var el = $(evt.target);
            
            $.when(
                this._animateTo(el)
            ).done(
                _.bind(this._setSelected, this, el)
            );
        },
        
        /**
         * Get new position of the cursor
         * @param  {jQuery} tgt target
         * @return {Object}
         * @method
         */
        _getCursorPos: function (tgt) {
            return { 
                left: ((tgt.offset().left + tgt.width() / 2) - 5) + 'px' 
            };
        },
        
        /**
         * Animate the arrow to a list item
         * @param {jQuery}          el jquery element
         * @param {jQuery.Promise}  the promise that the animation is done
         * @method
         */
        _animateTo: function (el) {
            return $('ul .icon').animate(this._getCursorPos(el), 'medium');
        },
        
        /**
         * Move the arrow to a list item
         * @param  {jQuery} el
         * @method
         */
        _toActive: function (el) {
            $('ul .icon').css(this._getCursorPos(el));
            this._setSelected(el);
        },
        
        /**
         * Set selected on active class, remove selected class from previous
         * @param  {jQuery} el
         * @method
         */
        _setSelected: function (el) {
            this.$el.find('.selected').removeClass('selected'); 
            el.parent('li').addClass('selected');
            $('ul.subdir').slideDown('slow');
        },
        
        /**
         * Clean up the view
         * @method
         */
        dispose: function () {
            this.off();
        }
        
    });
    
    return NavBar;
    
});
