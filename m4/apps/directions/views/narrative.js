define(['underscore', 'backbone',
    'text!directions/html/narrative.html'], 
    function (_, Backbone, template) {
    
    var Narrative = Backbone.View.extend({

    	initialize: function(options) {
    		this.html = _.template(template);
    		this.narrative = options.narrative;
    	},

    	render: function() {
    		var route = this.narrative.route;

    		this.$el.html(this.html(route));

    		return this;
    	}

    });

    return Narrative;
});