require(['parks/views/parks', 'core/models/core'], function (Parks, CoreModel) {
    
    module('Initialization');
    
    test('Should be defined', 1, function () {
        ok(Parks);
    });
    
    module('Data', {
        
        setup: function () {
            this.main = new Parks({
                core: {
                    model: new CoreModel()
                } 
            });
        },
        
        teardown: function () {
            
        }
    });
    
    test('Should return a promise', 1, function () {
        
    });
    
    
});
