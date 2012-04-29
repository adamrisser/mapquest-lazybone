
require(['summaryform'], function (summaryform) {
    
    module("Subscribe");
    
    test("Test that the form is initialized properly", function () {
        
        summaryForm
        // given
        
        // when
        
        // then
        
    });
    
    module("Resize");
    
    test("Test if callbacks get called", function () {
        resizer.resize();
        ok(a, "function 1 was called");
        ok(b, "function 2 was called");
    });
    
});