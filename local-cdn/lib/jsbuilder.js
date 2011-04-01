var fs = require('fs'),
    uglifyjs = require('uglify-js'),
    parser = uglifyjs.parser,
    uglify = uglifyjs.uglify;

exports.combine = function(files, wrap) {
    
    var source = [''],
        hasHTML = false,
        content,
        file,
        i = 0;
    
    while (file = files[i++]) {
        
        var tmp = file.split('/').pop().split('.'),
            filename  = tmp[0],
            extension = tmp[1];
        
        content = fs.readFileSync(file, 'utf-8');
        
        if (extension == 'html') {
            
            // only do this once or not at all if no html files are present
            if (!hasHTML) {
                source.push("\nm4._html = {};\n\n");
                hasHTML = true;
            }
            
            // escape single quotes, remove tabs and line breaks
            content = content.replace("'", "\\'").replace(/\n/g, "").replace(/\t/g, "");
            
            // append the HTML source as a string onto the m4._html namespace
            source.push("m4._html." + filename + " = '" + content + "';\n\n");
        }
        else {
            source.push("\n\n"+content);
        }
    }
    
    return source.join('');
}

exports.compress = function(source) {
    var ast;

    try {
        ast = parser.parse(source);
    } catch (e) {
        console.log('Error parsing js source: ' + e);
        return source;
    }

    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);

    return uglify.gen_code(ast);
}
