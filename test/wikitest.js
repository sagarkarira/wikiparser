var assert = require("assert");
var parser = require('../lib/infobox.js');

describe('Wiki parser successfully.', function(done) {

  it('should return json data', function(done) {
    parser.parseWiki('france', function(err, result) {
      assert.equal(true, JSON.stringify(result).length > 1);
      done(err);
    });
  });

  it('should return json data', function(done) {
    parser.parseWiki('Stoic_(film)', function(err, result) {
      assert.equal(true, JSON.stringify(result).length > 1);
      done(err);
    });
  });

});

describe('Wiki parser not found.', function(done) {

  it('should return Page Index Not Found', function(done) {
    parser.parseWiki('nomatterwhathere', function(err, result) {
      assert.equal(true, result === 'Page Index Not Found');
      done(err);
    });
  });

  it('should return Query Not Found', function(done) {
    parser.parseWiki('', function(err, result) {
      assert.equal(true, result === 'Query Not Found');
      done(err);
    });
  });

});