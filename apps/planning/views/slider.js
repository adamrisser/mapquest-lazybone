/**
 * An interactive slider that is used to plan trips
 * @fileOverview
 */
define([
    //'themes/base/jquery.ui.all.css,
    'jqueryui/js/jquery-ui-1.8.21.custom.min',
    'css!jqueryui/css/ui-darkness/jquery-ui-1.8.21.custom.css'
], function () {
    
    var Slider = Backbone.View.extend({
        
        /**
         * Parent
         * @type {String}
         */
        el: '#slider',
        
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
            _.bindAll(this, 'updateLabel', '_resize');
            
            this.$el.slider({
                min: 1,
                max: 24,
                step:  1,
                value: 1,
                slide: this.updateLabel
            });
            
            $(window).resize(this._resize);
            
            this.updateLabel(null, {});
            
            this._resize();
        },
        
        /**
         * Resize the control
         * @method
         */
        _resize: function () {
            var pane = $('#pane').width(),
                w = $('#map').closest('#wrapper').width() - pane;
            
            // resize the map parent
            $('.planningcontrol').css({ 
                width: (w > 0 ? w : 0) + 'px' 
            });
        },
        
        /**
         * Update the text label
         * @param {String} time time label
         * @method
         */
        updateLabel: function (evt, ui) {
            var label,  time = ui.value;
            
            if (!time) {
                label = 'Start'
            } else {
                label = time + ' hour in';
            }
            
            $('#time').html(label);
        }
        
    });
    
    return Slider;
    
});
