define(['underscore', 
    'backbone', 
    'directions/services/route', 
    'less!directions/css/input'], function (_, Backbone, route) {

    var Input = Backbone.View.extend({

        /**
         * Our delegated events.
         * @type {Object}
         */
        events: {
            'blur input': 'search',
            'click .close': 'deleteStop'
        },

        /**
         * Our root element.
         * @type {String}
         */
        tagName: 'li',

        /**
         * Backbone classname.
         * @type {String}
         */
        className: 'control-group',

        /**
         * Our input template.
         * @type {String}
         */
        template: '<span class="marker"></span><div class="control"><input type="text"/><button class="close">&times;</button></div>',

        /**
         * Backbone initializer.
         * @param  {Object} options input
         * @return {void}         
         */
        initialize: function(options) {
            _.bind(this.search, this);
            this.model.on('destroy', this.remove, this);
        },

        /**
         * Our view render method. Adds the input elements.
         * @return {Input} *this*
         */
        render: function() {
            var html = _.template(this.template);

            this.$el.html(html);

            return this;
        },

        /**
         * Resolves the location corresponding to this input.
         * @return {Promise}
         */
        resolve: function() {
            return this.promise || ( this.promise = this.search() );
        },

        /**
         * Resolve this location.
         * @param  {Object} evt event object
         * @return {Promise}    
         */
        search: function() {
            var self = this,
                target = self.$el.find('input'),
                value = target.val(),
                promise;

            if (!_.isEmpty(value)) {
                self.model.set({'input': value});
                
                promise = $.when(
                    route.search(self.model)
                )
                .done(
                    function(data) {
                        if (data.length === 0) {
                            self.$el.addClass('error');
                        }
                        else {
                            self.model.set({'results': data});
                            self.$el.addClass('success');
                        }
                    }
                );
            }

            return promise;
        },

        /**
         * Deletes this stop.
         * @param  {Object} evt event object
         * @return {void}     
         */
        deleteStop: function(evt) {
            evt.preventDefault();
            this.model.destroy();
        }

    });

    return Input;

});