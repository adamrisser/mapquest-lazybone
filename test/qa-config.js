
require(['/js/ext/jquery.js', '/js/config.js'], function () {
    
    require(['/test/qunit.js', '/test/sinon.js', 'css!/test/qunit.css'], function () {
        
        var regex = new RegExp(/test=(.+)?/),
        
        // test parameter 
        name = window.location.href.match(regex)[1],
        
        // test urls
        test = '/test/tests/' + name + '.js';
        
        // include the tests
        require([test]);
        
    });    
});