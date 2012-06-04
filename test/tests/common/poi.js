require(['common/views/poi', 'core/models/location', 'test/helpers/locations'], function (Poi, Location, testLocations) {
    
    module('Initialization', {
        
        setup: function () {
            this.loc = new Location(testLocations.loc1);
            this.path = 'tmpl!core/html/location';
            this.icon = new MQA.Icon('http://content.mqcdn.com/vibe/2-5-42/images/s1_big_pin_selected.png', 25, 40);
        },
        
        teardown: function () {
            this.loc.dispose();
            this.icon = null;
            this.path = null;
        }
        
    });
    
    test('Should be defined', 1, function () {
        ok(Poi);
    });
    
    test('Can be instantiated with a backbone location model', 2, function () {
        var poi = new Poi({
            loc:  this.loc,
            path: this.path,
            icon: this.icon
        });
        
        equal(poi.loc, this.loc.attributes, 'Location set properly');
        
        ok(poi, 'Has been instantiated');
    });
    
    test('Can be instantiated with an object (not a backbone model)', 2, function () {
        var poi = new Poi({
            loc:  testLocations.loc1,
            path: this.path,
            icon: this.icon
        });
        
        equal(poi.loc, testLocations.loc1, 'Location set properly');
        
        ok(poi, 'Has been instantiated');
    });
    
    test('That options on the poi get set properly', 4, function () {
        
        var poi = new Poi({
            loc:  this.loc,
            path: this.path,
            icon: this.icon
        });
        
        equal(poi.poi.getIcon(), this.icon, 'Icon properly set');
        
        poi = new Poi({
            loc:  this.loc,
            path: this.path
        });
        
        equal(poi.poi.getIcon().imageURL, 'http://icons.mqcdn.com/icons/stop.png', 'Default icon set');
        
        equal(poi.poi.infoContentHTML, '&nbsp;', 'Default content set');
        
        equal(poi.poi.rolloverContent, '<div class="rollover">Caruso\'s Pizzeria</div>', 'Default rollover content set');
    });
    
    module('Rendering', {
        
        setup: function () {
            this.loc = new Location(testLocations.loc1);
            this.path = 'tmpl!core/html/location';
            this.icon = new MQA.Icon('http://content.mqcdn.com/vibe/2-5-42/images/s1_big_pin_selected.png', 25, 40);
            
            $('#qunit-fixture').html('<div id="map" style="width:500px; height: 500px"></div>');
            
            this.mqa = new MQA.TileMap({
                mtype: 'osm',
                elt: $('#map')[0],
                bestFitMargin: 25,
                zoom: 7, 
                latLng: { 
                    lat: 40.074288, 
                    lng: -76.320924
                }
            });
        },
        
        teardown: function () {
            this.loc.dispose();
            this.icon = null;
            this.path = null;
            this.mqa.dispose();
        }
        
    });
    
    test('That the infowindow opens', 8, function () {
        
        var map = this.mqa,
            poi = new Poi({
                loc:  this.loc,
                path: this.path
            });
        
        stop();
       
        // get the template so we can eliminate the ajax call for testing
        require([this.path], function (tmpl) {
            
           // bypass the ajax call
            var stub = sinon.stub(poi, 'renderInfoWindow', function () {
                poi.load(tmpl);
                
                start();
                equal($('.infowindow .name').html(), 'Caruso\'s Pizzeria');
                equal($('.infowindow .street').html(), '1908 Fruitville Pike');
                equal($('.infowindow .locality').html(), 'Lancaster');
                equal($('.infowindow .region').html(), 'PA');
                equal($('.infowindow .postal-code').html(), '17601');
                equal($('.infowindow .country-name').html(), 'US');
                equal($('.infowindow .latitude').html(),  '40.074288');
                equal($('.infowindow .longitude').html(), '-76.320924');
            });
            
            map.addShape(poi.poi);
            
            map.windowManager.onPoiActivate(poi.poi, true);
        });
        
    });
    
});
