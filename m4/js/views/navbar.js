/**
 * Navigation bar
 * 
 * Adds functionality to the navigation bar that sits at the top of the page.
 * 
 * @description
 */
define(['tmpl!navbarhtml', 'twitter', 'css!twittercss', 'less!navbarcss'], function (template) {
    
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
            'click li': 'setActive'
        },
        
        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Initialize the view. Bind it to the model
         * @constructor
         */
        initialize: function () {
            this.render();
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
         * Set active tab state
         * @param {Object} evt event object
         * @method
         */
        setActive: function (evt) {
            this.$el.find('li').removeClass('active');
            $(evt.currentTarget).addClass('active');
        }
        
    });
    
    return NavBar;
});