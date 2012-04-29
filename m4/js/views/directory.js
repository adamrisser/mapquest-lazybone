define(['backbone'], function (Backbone) {

    /**
     * Our directory listing.
     * @type {Backbone.View}
     */
    var Directory = Backbone.View.extend({

        el: '#directory',

        /**
         * Nothing todo.    
         * @return {Directory} *this*
         */
        render: function() { }

    });

    return new Directory;
});