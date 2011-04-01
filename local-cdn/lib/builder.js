var js = require('./jsbuilder');
var css = require('./cssbuilder');

function combine(type, files) {
    var source;
    
    switch(type) {
        case 'js': source = js.combine(files); break;
        case 'css': source = css.combine(files); break;
        default: source = '';
    }
    
    return source;
}

function compress(type, source) {
    var compressed;
    
    switch(type) {
        case 'js': compressed = js.compress(source); break;
        case 'css': compressed = css.compress(source); break;
        default: compressed = '';
    }
    
    return compressed;
}

exports.combine = combine;
exports.compress = compress;