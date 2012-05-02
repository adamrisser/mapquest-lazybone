define(['backbone'], function (Backbone) {

    /**
     * Our directory listing.
     * @type {Backbone.View}
     */
    var Base = Backbone.View.extend({
        
        /**
         * @method
         */
        activeate: function () {
            this.render();
            this.delegateEvents();
        },
        
        /**
         * @method
         */
        deactiveate: function () {
            this.undelegateEvents();
        },

    });

    return Base;
});