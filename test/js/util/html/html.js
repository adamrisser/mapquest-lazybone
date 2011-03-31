$(document).ready(function () {
    
    test("Get HTML", function () {
        
        
        
        var adr = {
            road: '222 Cobblestone rd',
            city: 'Lancaster',
            state: 'PA',
            postcode: '17601',
            country: 'United States',
        };
        
        var html = _m.util.Html.get('result', {
            hasStreet:  !!adr.road,
            hasCity:    !!adr.city,
            hasState:   !!adr.state,
            hasZip:     !!adr.postcode,
            hasCountry: !!adr.country,
            street:  adr.road,
            city:    adr.city,
            state:   adr.state,
            zip:     adr.postcode,
            country: adr.country
        });
        
        equal(cbs.f1, f1, "f1 has been subscribed");
        
    });
    
    module("Resize");
    
});