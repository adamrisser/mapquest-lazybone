require([
    'core/views/searchform', 
    'core/models/core', 
    'router', 
    'core/views/map/map'
], function (SearchForm, Model, Router, Map) {
    
    var nav = 
        '<div id="searchForm">' +
        '    <form class="form-search" onsubmit="return false;">' +
        '        <input id="searchFormTin" class="tin" type="text" name="" value="" placeholder="Enter address, business, or landmark..." />&nbsp;' +
        '        <button class="btn btn-primary" id="searchFormBtn"><span></span></button>' +
        '    </form>' +
        '</div>' +
        '<div id="map" style="width: 500px; height: 300px"></div>';
    
    test('Should be defined', 4, function () {
        ok(SearchForm);
        ok(Model);
        ok(Router);
        ok(Map);
    });
    
    module('Initialization', {
        
        setup: function () {
            $('#qunit-fixture').html(nav);
            
            this.core = {
                router: new Router({ core: self }),
                map: new Model,
                    map: new Map({
                    zoom: 7,
                    center: {
                        lat:   39.743943,
                        lng: -105.020089
                    }
                })
            };
        },
        
        teardown: function () {
            this.form.dispose();
            this.core.map.dispose();
            this.core.router.dispose();
            this.core = null;
        }
        
    });
    
    test('Can be instantiated', 1, function () {
        this.form = new SearchForm({ 
            el: '#searchForm', 
            core: this.core 
        });
        ok(this.form);
    });
    
});
