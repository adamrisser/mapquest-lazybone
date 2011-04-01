var url = require('url');
var fs = require('fs');
var mime = require('mime');

var config = require('./lib/config');
var builder = require('./lib/builder');

function writeResponse(response, content, contentType) {
    contentType = contentType || 'text/html';
    
    response.writeHead(200, {'Content-Type': contentType});
    response.end(content);
};

exports.serve = function(config) {
    return function(req, res, next) {
        var parts = url.parse(req.url).pathname.split('/'),
            contentType = mime.lookup(req.url),
            type = parts[1],
            bundleName = parts[2],
            files = config.getFiles(type, bundleName),
            content;
            
        if (! files) {
            next();
            return;
        }
        
        content = builder.combine(type, files);
        
        if (config.compress) {
            content = builder.compress(type, content);
        }
        
        writeResponse(res, content, contentType);
    }
}

exports.deploy = function(config) {
    var dir = config.deployDir;
    
    // collect a listing of the file structure and files in the static dir,
    // removing any files that are part of the bundles
    
    
    // create the deploy dir if it doesn't exist
    
    try {
        fs.statSync(dir);
    } catch (e) {
        fs.mkdirSync(dir, 0755);
    }
    
    // first go through and create all the bundles
    
    var types = ['js','css'],
        type,
        files,
        bundles,
        bundle,
        content,
        i;
    
    for (i = 0; i < types.length; i++) {
        type = types[i];
        bundles = config.getBundles(type);
        
        for (bundle in bundles) {
            
            files = config.getFiles(type, bundle);
            
            if (! files) { continue; }
            
            content = builder.combine(type, files);
            
            if (config.compress) {
                content = builder.compress(type, content);
            }
            
            fs.writeFileSync(dir + bundle, content, 'utf-8');
        }
    }
    
    // then go through and copy the remaining individual static assets, creating
    // the sub directories as needed
    
}

exports.config = config;
