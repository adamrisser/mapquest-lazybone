require(['common/views/shape', 'core/models/location', 'test/helpers/viberesponse'], function (Shape, Location, response) {
    
    module('Initialization');
    
    test('Should be defined', 1, function () {
        ok(Shape);
    });
    
    asyncTest('Can be instantiated', 6, function () {
        
        MQA.withModule('shapes', function () {
            start();
            
            var shape = new Shape({
                geometry: response.features[0].geometry,
                properties: {
                    colorAlpha: 1.0,
                    color: '#000000',
                    borderWidth: 3,
                    fillColor: '#ff0000',
                    fillColorAlpha: 0.5
                }
            });
    
            ok(shape, 'Has been instantiated');
            
            equal(shape.shape.borderWidth, '3', 'Border width set');
            equal(shape.shape.color, '#000000', 'Border color set');
            equal(shape.shape.colorAlpha, '1', 'Border alpha set');
            equal(shape.shape.fillColor, '#ff0000', 'Background color set');
            equal(shape.shape.fillColorAlpha, '0.5', 'Background alpha set');
        });
    });
    
    
    test('That the mqa.polygon can be returned', 1, function () {
        
        var shape = new Shape({
            geometry: response.features[0].geometry,
            properties: {
                colorAlpha: 1.0,
                color: '#000000',
                borderWidth: 3,
                fillColor: '#ff0000',
                fillColorAlpha: 0.5
            }
        });
        
        equal(shape.toMQA().className, 'MQA.PolygonOverlay', 'Correct type');
    });
    
});
