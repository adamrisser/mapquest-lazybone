define(['underscore', 'backbone', 'css!directions_inputcss'], function (_, Backbone) {

	var Input = Backbone.View.extend({

		events: {
			'click .remove': 'remove'
		},

		tagName: 'li',

		/**
		 * Our input template.
		 * @type {String}
		 */
		template: '<input type="text"/><span class="remove"></span>',

		/**
		 * Our view render method. Adds the input elements.
		 * @return {Input} *this*
		 */
		render: function() {
			var html = _.template(this.template);

			this.$el.html(html);

			return this;
		},

		remove: function(event) {
			this.$el.remove();
		}

	});

	return Input;

});