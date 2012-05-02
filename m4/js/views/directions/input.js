define(['underscore', 'backbone', 'css!directions_inputcss'], function (_, Backbone) {

	var Input = Backbone.View.extend({

		events: {
			'blur input': 'resolve',
			'click .icon-remove': 'remove'
		},

		tagName: 'li',

		/**
		 * Our input template.
		 * @type {String}
		 */
		template: '<input type="text"/><i class="icon-remove"></i>',

		initialize: function(options) {

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

		resolve: function() { 
            return this.promise || (this.promise = $.ajax({
                url: 'http://open.mapquestapi.com/nominatim/v1/search',
                data: {
                    format: 'json',
                    q: this.$el.find('input').val()
                },
                cache: true,
                dataType: 'jsonp',
                jsonp: 'json_callback',
                context: this,
                success: this.setResult
            }));
		},

		setResult: function(data) {
			this.result = data;
		},

		getResult: function() {
			return this.result;
		},

		remove: function(event) {
			this.$el.remove();
		}

	});

	return Input;

});