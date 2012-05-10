/**
 * Navigation bar
 * Adds functionality to the navigation bar that sits at the top of the page.
 * 
 * @description
 */
define([
    'tmpl!core/html/navbar',
    'twitter',
    'css!twittercss',
    'less!core/css/navbar'
], function (template) {
    
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
            'click a': 'handleClick'
        },
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Initialize the view.
         * @constructor
         */
        initialize: function () {
            this.render();
            
            // element that is active
            var el = $('#nav a[href$="' + Backbone.history.getHash() + '"]');
            this._toActive(el.length ? el : $('.nav .selected a'));
        },
        
        /**
         * Render the view to the page
         * @return {Backbone.View} this
         * @method
         */
        render: function () {
            this.$el.prepend(template());
            return this;
        },
        
        /**
         * Handle click event on a list item
         * @param {Object} evt click event
         * @method
         */
        handleClick: function (evt) {
            this._animateToActive($(evt.target));
        },
        
        /**
         * Get new position of the cursor
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
         * @param {jQuery} el jquery element
         * @method
         */
        _animateToActive: function (el) {
            var pos = this._getCursorPos(el)
                callback = _.bind(this._setSelected, this, el);
            
            $('ul .icon').animate(pos, 'medium', callback);
        },
        
        /**
         * Move the arrow to a list item
         * @method
         */
        _toActive: function (el) {
            $('ul .icon').css(this._getCursorPos(el));
            this._setSelected(el);
        },
        
        /**
         * Set selected on active class, remove selected class from previous
         * @method
         */
        _setSelected: function (el) { 
            this.$el.find('.selected').removeClass('selected'); 
            el.parent('li').addClass('selected');
            $('ul.subdir').slideDown('slow');
        }
        
    });
    
    return NavBar;
});