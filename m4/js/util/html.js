/**
 * HTML templating class.
 * 
 * - HTML strings are stored in _m._html 
 * - HTML strings are accessible by filename (ex _m._html.filename)
 * - HTML strings are in the mustache.js templating format
 * 
 * @fileoverview
 */
(function () {

    Html = {
        
        /**
         * Get HTML by group
         * @param  {String} key      key to HTML string
         * @param  {Object} view     view to mesh with template
         * @param  {Object} partials mustache partial views
         * @return {String}
         * @method
         */
        get: function (key, view, partials) {
            return Mustache.to_html(__m._html[key], view, partials || null);
        }
        
    };
    
    /**
     * Export into public namespace. 
     */
    __util.Html = Html;
    
}());