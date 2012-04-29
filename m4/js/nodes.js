/**
 * Main namespace
 * @namespace
 */
define(['jquery'], function ($) {
    
    return {
        
        body: $('body'),
        window: $(window),
        
        map:  $('#map'),
        pane: $('#pane'),
        add: $('#add'),
        gallery: $('#gallery'),
        
        searchForm: $('#searchForm'),
        searchFormBtn: $('#searchFormBtn'),
        searchFormTin: $('#searchFormTin')
        
    };
    
});