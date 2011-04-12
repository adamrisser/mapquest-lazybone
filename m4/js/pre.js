
/**
 * These shortcuts are loaded before everything but the main m4 namespace.  
 * Providing commonly used shortcuts here allows for them to not be repeated
 * in each individual widget
 * 
 * * Use double underscore shortcuts when possible, 
 * * Only falling back to single underscored shortcuts in the actual separate files.
 * * Do not use an underscore for shortcuts that are enclosed in method score.
 * 
 * Notes on shortcutting.
 * 
 *      Shortcutting your javascript can lead to significantly better compression
 *      and a gain in performance.  
 *      
 *      During shortcutting, variables get compressed as such ...
 *      
 *              var myTestVariable = '', mySecondedTestVariable = '';
 *      ...becomes...
 *              var a = '', b = '';
 *          
 *      But compressors cannot shortcut nested properties and methods
 *      
 *              m4.widget.myTestMethod = function (){}
 *      ...becomes...
 *              a.widget.myTestMethod = function (){}
 *          
 *      If this method/parameter is used multiple times in a single file,
 *      it can significantly increase the size. So providing a shortcut can
 *      help keep the code base smaller.
 *      
 *              var _myTestMethod = m4.widget.myTestMethod = function (){}
 *      
 *      Now _myTestMethod can be used multiple times and it will only add 1
 *      character each time to the file size instead of 21.
 *      
 *      Shortcutting nested namespaces can also increase performace and the
 *      javascript engine can follow the direct reference to where in the namespace
 *      it is supposed to look, instead of traversing the namespace.
 *       
 * @description
 */

(function () {
      
// ended in post.js, do not 'fix' this