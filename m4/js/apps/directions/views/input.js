define(['underscore', 
    'backbone', 
    'directions/services/route', 
    'less!directions_inputcss'], function (_, Backbone, route) {

    var Input = Backbone.View.extend({

        /**
         * Our delegated events.
         * @type {Object}
         */
        events: {
            'blur input': 'search',
            'click .close': 'remove'
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
        template: '<div class="control"><input type="text"/><button class="close">&times;</button></div>',

        /**
         * Backbone initializer.
         * @param  {Object} options input
         * @return {void}         
         */
        initialize: function(options) {
            _.bind(this.search, this);
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

        remove: function(event) {
            this.$el.remove();
        }

    });

    return Input;

});