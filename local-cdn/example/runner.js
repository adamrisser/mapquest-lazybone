var fs = require('fs');

var basedir = [__dirname, '..', 'test'].join('/');

var files = [];
var contents = fs.readdirSync(basedir);
var i;

// get all the javascript file paths

for (i = 0; i < contents.length; i++) {
    if (contents[i].indexOf('.js') > -1) {
        files.push(basedir + '/' + contents[i]);
    }
}

fs.writeFileSync('compressed.js', compressed_source, encoding='utf-8');
