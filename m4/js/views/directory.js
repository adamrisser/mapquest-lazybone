define(['backbone', 'tmpl!directoryhtml'], function (Backbone, template) {

    /**
     * Our directory listing.
     * @type {Backbone.View}
     */
    var Directory = Backbone.View.extend({
        
        /**
         * Directory is a list
         * @type {String}
         * @property
         */
        tagName: 'ul',
        
        /**
         * Id of the UL that is the root of the directory
         * @type {String}
         */
        id: 'directory',

        /**
         * Underscore template
         * @param {Object} obj parameters to pass in when creating the template
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