'use strict';

var _ = require('lodash');
var multimatch = require('multimatch');

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

  var exp = new RegExp(config.pattern, 'gmi');

  var replace = function(files, file, path, content, exp) {
    if (multimatch(path, config.filePattern || '**/*').length == 0) {
      return content;
    }

    return content.replace(exp, function(match, path) {
      if (files[path]) {
        file.includes.push(file);
        return replace(files, file, path, files[path].contents.toString(), exp);
      }

      return (config.ignoreMissing) ? '' : '"' + path + '" file not found.';
    });
  };

  return function(files, metalsmith, done) {
    _.forEach(files, function(file, path) {
      file.includes = [];
      files[path].contents = replace(files, file, path, file.contents.toString(), exp);
    });

    done();
  };
}

/**
 * Expose `include`.
 */

module.exports = include;
