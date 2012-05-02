/**
 * Navigation bar
 * 
 * Adds functionality to the navigation bar that sits at the top of the page.
 * 
 * @description
 */
define(['tmpl!navbarhtml', 'twitter', 'css!twittercss', 'css!navbarcss'], function (template) {
    
    var NavBar = Backbone.View.extend({
        
        /**
         * Parent
         * @property
         */
        el: 'body',
        
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
            
            // init the tooltips
            $('a[rel=tooltip]').tooltip();
        },
        
        /**
         * Render the view to the page
         * @return {Backbone.View} this
         * @method
         */
        render: function () {
            this.$el.prepend(template());
            return this;
        }
        
    });
    
    return NavBar;
});