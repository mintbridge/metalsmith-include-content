/* globals describe, it */
'use strict';

var path = require('path');
var expect = require('chai').expect;
var Metalsmith = require('metalsmith');
var equal = require('assert-dir-equal');

var includeContent = require('..');

describe('metalsmith-include-content', function() {
  it('should include the correct files, including nested includes and warn about missing files', function(done) {
    new Metalsmith('spec/fixture/default')
      .use(includeContent())
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/default/expected', 'spec/fixture/default/build');
        done();
      });
  });

  it('should include the correct files, including nested includes and ignore missing files', function(done) {
    new Metalsmith('spec/fixture/ignore')
      .use(includeContent({
        ignoreMissing: true,
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/ignore/expected', 'spec/fixture/ignore/build');
        done();
      });
  });

  it('should using a custom pattern include the correct files, including nested includes and ignore missing files', function(done) {
    new Metalsmith('spec/fixture/pattern')
      .use(includeContent({
        pattern: 'includeContentFrom (.*)',
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/pattern/expected', 'spec/fixture/pattern/build');
        done();
      });
  });

  it('should only include contents in files that match the specified file pattern', function(done) {
    new Metalsmith('spec/fixture/filePattern')
      .use(includeContent({
        filePattern: '**/*.txt'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/filePattern/expected', 'spec/fixture/filePattern/build');
        done();
      });
  });
});
