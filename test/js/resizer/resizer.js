$(document).ready(function () {
    
    var a = false,
        b = false,
        f1 = function () { a = true; },
        f2 = function () { b = true; },
        f3 = function () { console.info('bingo'); },
        f4 = function () { console.info('bango'); };
    
    m4.util.resizer.subscribe('f1', f1);
    m4.util.resizer.subscribe('f2', f2);
    m4.util.resizer.subscribe('', f3);
    m4.util.resizer.subscribe('f4');
    
    test("Test subscribing to the resizer", function () {
        var cbs = m4.util.resizer._callbacks;
        
        // should be subscribed
        equal(cbs.f1, f1, "f1 has been subscribed");
        equal(cbs.f2, f2, "f2 has been subscribed");
        
        // shouldn't be subscribed
        notEqual(cbs.f3, f3, "f3 has not been subscribed");
        notEqual(cbs.f4, f4, "f4 has not been subscribed");
    });
    
    test("Test if callbacks get called", function () {
        m4.util.resizer.resize();
        ok(a, "function 1 was called");
        ok(b, "function 2 was called");
    });
    
    /*
    test("a basic test example", function(){
        ok(true, "this test is fine");
        var value = "hello";
        equals("hello", value, "We expect value to be hello");
    });
    
    module("Module A");
    
    test("first test within module", function(){
        ok(true, "all pass");
    });
    
    test("second test within module", function(){
        ok(true, "all pass");
    });
    
    module("Module B");
    
    test("some other test", function(){
        expect(2);
        equals(true, false, "failing test");
        equals(true, true, "passing test");
    });
    */
});