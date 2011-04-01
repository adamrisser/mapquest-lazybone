var fs = require('fs');

var cssmin = require('../ext/cssmin');

exports.combine = function(files) {
    var source = [],
        i;
    
    for (i = 0; i < files.length; i++) {
        source.push(fs.readFileSync(files[i], 'utf-8'));
    }
    
    return source.join('');
}

exports.compress = function(source) {
    return cssmin.compress(source);
}
