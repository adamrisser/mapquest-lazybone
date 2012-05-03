define(['underscore', 'backbone', 'less!directions_inputcss'], function (_, Backbone) {

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
			_.bind(this.resolve, this);

			// this.model.on('change:stops', this.resolve);
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
			console.log('showing ambiguities...');
		},

		remove: function(event) {
			this.$el.remove();
		}

	});

	return Input;

});