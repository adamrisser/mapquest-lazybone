/**
 * Navigation bar
 * Adds functionality to the navigation bar that sits at the top of the page.
 * @fileOverview
 */
define(['underscore', 'backbone', 'less!core/css/navbar'], function (_, Backbone) {
    
    var NavBar = Backbone.View.extend({
        
        /**
         * Parent
         * @property
         */
        el: '.navbar',
        
        /**
         * Delegated events off of parent
         * @type {Object}
         */
        events: {
            'click a': 'handleClick'
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
                el = this.$el.find('a[href$="' + options.hash + '"]').closest('li');                
            }
            else {
                el = this.$el.find('li:eq(0)');
            }
            
            // set element that is active
            this.setActive(el);            
        },

        /**
         * Handles individual click events.
         * @param  {Object} evt event object
         * @return {void}     
         */
        handleClick: function(evt) {
            var el = $(evt.target).closest('li');
            this.setActive(el);
        },

        /**
         * Sets the active link in the navbar
         * @param {Object} active jquery object representing the item to set active
         * @return {void} 
         */
        setActive: function(active) {
            var prev = this.$el.find('li.active');

            prev.removeClass('active');
            active.addClass('active');            
        }
        
    });
    
    return NavBar;
    
});
