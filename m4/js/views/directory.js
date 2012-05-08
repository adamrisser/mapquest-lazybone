define(['backbone', 'tmpl!directoryhtml'], function (Backbone, template) {
    
    /**
     * Our directory listing.
     * @type {Backbone.View}
     */
    var Directory = Backbone.View.extend({
        
        /**
         * Parent
         * @type {String}
         * @property
         */
        el: '#pane',
        
        /**
         * Underscore template
         * @param {Object} obj parameters to pass in when creating the template
         * @method
         */
        template: template,
        
        /**
         * Initialize the directory
         * @constructor
         */
        initialize: function () {
            this.render();
        },
        
        /**
         * Nothing todo.    
         * @return {Directory} *this*
         */
        render: function() {
            this.$el.append(this.template());
            return this; 
        },
        
        /**
         * Clean up
         * @method
         */
        dispose: function () {
            this.$el.empty();
            this.unbind();
        }

    });
    
    return Directory;
    
});