define(['planning/views/slider', 'css!planning/css/main.css'], function (Slider) {
    
    var Main = Backbone.View.extend({
        
        /**
         * Parent el
         * @type {String}
         */
        el: '.planningcontrol',
        
        /**
         * Slider bar view
         * @type {Backbone.View}
         */
        slider: null,
        
        /**
         * Initialize the trip planning slider
         * @param {Array}         options.fragments route fragments that initialized the app
         * @param {Backbone.View} options.core      core application
         * @constructor
         */
        initialize: function (options) {
            
            this.slider = new Slider();
            
            this.$el.css({
                display: 'block',
                height: 'auto'
            });
            
            options.core.map._resize();
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            this.off();
        },
        
    });
    
    return Main;
    
});
