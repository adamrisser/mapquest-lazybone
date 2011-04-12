/**
 * Results List
 * 
 * The results list is displayed on the summary pane after locations
 * have been added to the model.
 * @description
 */
define(['js/nodes.js', 'js/util/html.js', 'css!css/results.css'], function (nodes, Html) {
    
    var _model = m4.model,
    
    Result = Backbone.View.extend({
        
        /**
         * Parent element of view
         * @property
         */
        el: nodes.pane,
        
        /**
         * Initialize the view. Bind it to the model
         * @constructor
         */
        initialize: function () {
            var self = this;
            
            // When a model gets added, it will render in the left pane
            _model.core.bind("add", function (loc) { 
                self.render(loc);
            });
        },
        
        /**
         * Render the view to the page
         * @method
         */
        render: function (loc) {
            var adr = loc.getAddress(),
            
            html = Html.get('result', {
                hasStreet:  !!adr.road,
                hasCity:    !!adr.city,
                hasState:   !!adr.state,
                hasZip:     !!adr.postcode,
                hasCountry: !!adr.country,
                street:  adr.road,
                city:    adr.city,
                state:   adr.state,
                zip:     adr.postcode,
                country: adr.country
            });
            
            this.el.append(html);
        }
        
    });
    
    // Export into public namespace. 
    return new Result();

});