
require(['/m4/js/ext/jquery.js', '/m4/js/config.js'], function () {
    
    require(['/test/qunit.js', 'css!/test/qunit.css'], function () {
        
        var regex = new RegExp(/test=(.+)?/),
        
        // test parameter 
        name = window.location.href.match(regex)[1],
        
        // test urls
        test = '/test/tests/' + name + '.js';
        
        // include the tests
        require([test]);
        
    });    
});