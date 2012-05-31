require(['common/views/poi', 'core/models/location', 'test/helpers/locations'], function (Poi, Location, testLocations) {

    test('Should be defined', 1, function () {
        ok(Poi);
    });
    
    module('Initialization', {
        
        setup: function () {
            this.loc = new Location(testLocations.loc1);
            this.path = 'tmpl!core/html/location';
            this.icon = new MQA.Icon('http://content.mqcdn.com/vibe/2-5-42/images/s1_big_pin_selected.png', 25, 40); 
        },
        
        teardown: function () {
            
        }
        
    });
    
    test('Can be instantiated', 1, function () {
        
        this.bar = new Poi({
            loc:  this.loc,
            path: this.path,
            icon: this.icon
        });
        
        ok(this.bar);
    });

});
