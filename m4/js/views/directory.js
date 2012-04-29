define(['backbone', 'tmpl!directoryhtml'], function (Backbone, template) {

    /**
     * Our directory listing.
     * @type {Backbone.View}
     */
    var Directory = Backbone.View.extend({
        
        /**
         * Parent element
         * @property
         */
        el: '#directory',

        /**
         * Underscore template
         * @method
         */
        template: template,
        
        /**
         * Nothing todo.    
         * @return {Directory} *this*
         */
        render: function() {
            this.$el.append(this.template());
            return this; 
        }

    });

    return Directory;
});