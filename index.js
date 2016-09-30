'use strict';

var _ = require('lodash');
var nodePath = require('path');
var os = require('os');

/**
* A Metalsmith plugin that allows content to be included (nested)
* within other content by including the file path in the document
*
* @return {Function}
*/
function include(config) {
 config = _.assign({
   pattern: '^include (.*)',
   ignoreMissing: false,
 }, config || {});

 var formatPath = function(inputPath) {
   return inputPath.split(nodePath.sep);
 };

 var isWindows = function() {
  return os.platform() === 'win32';
 };

 var exp = new RegExp(config.pattern, 'gmi');
 var replace = function(files, file, content, exp) {
   return content.replace(exp, function(match, path) {
     // here we make path use whatever slash it needs
     var newPath = path.split(/\/|\\/);
     newPath = (isWindows() ? newPath.join('\\') : newPath.join('/'));

     if (files[newPath]) {
       file.includes.push(file);
       return replace(files, file, files[newPath].contents.toString(), exp);
     }

     return (config.ignoreMissing) ? '' : '"' + newPath + '" file not found.';
   });
 };

 return function(files, metalsmith, done) {
   _.forEach(files, function(file, path) {
     var newPath = path.split(/\/|\\/);
     newPath = (isWindows() ? newPath.join('\\') : newPath.join('/'));
     file.includes = [];
     if (newPath) {
       newPath.contents = replace(files, file, file.contents.toString(), exp);
     }
   });

   done();
 };
}

/**
* Expose `include`.
*/

module.exports = include;
