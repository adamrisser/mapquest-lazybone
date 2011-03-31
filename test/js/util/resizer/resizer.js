$(document).ready(function () {
    
    var resizer = m4.util.resizer,
        a = false,
        b = false,
        f1 = function () { a = true; },
        f2 = function () { b = true; },
        f3 = function () { console.info('bingo'); },
        f4 = function () { console.info('bango'); };
    
    resizer.subscribe('f1', f1);
    resizer.subscribe('f2', f2);
    resizer.subscribe('', f3);
    resizer.subscribe('f4');
    
    module("Subscribe");
    
    test("Test subscribing to the resizer", function () {
        var cbs = resizer._callbacks;
        
        // should be subscribed
        equal(cbs.f1, f1, "f1 has been subscribed");
        equal(cbs.f2, f2, "f2 has been subscribed");
        
        // shouldn't be subscribed
        notEqual(cbs.f3, f3, "f3 has not been subscribed");
        notEqual(cbs.f4, f4, "f4 has not been subscribed");
    });
    
    module("Resize");
    
    test("Test if callbacks get called", function () {
        resizer.resize();
        ok(a, "function 1 was called");
        ok(b, "function 2 was called");
    });
    
});