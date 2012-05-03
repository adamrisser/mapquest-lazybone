define({
    
    version: '0.1',
    
    load: function (name, req, onLoad, config) {
        
        // find if this is a path set thru require.conf.path
        // require will try and prepend .js to the file name (and 
        // there is nothing you can do about it) so blow it away
        var url = require.toUrl(name).replace(/\.js$/, '') + '.less';
        
        req(['text!' + url, 'lessmin'], function (lessText) {
            
            var styleElem;
            
            (new less.Parser()).parse(lessText, function (err, css) {
                if (err) {
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(err);
                    }
                }
                else {
                    styleElem = document.createElement('style');
                    styleElem.type = 'text/css';
                    
                    if (styleElem.styleSheet) {
                        styleElem.styleSheet.cssText = css.toCSS();
                    } else { 
                        styleElem.appendChild( document.createTextNode( css.toCSS() ) );
                    }
                    
                    document.getElementsByTagName("head")[0].appendChild( styleElem );
                }
                
                onLoad(styleElem);
            });

        });     
    }
    
});
