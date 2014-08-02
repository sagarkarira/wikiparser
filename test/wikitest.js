var assert = require("assert");
var parseWiki = require('../index');

function checkJson(text) {
  if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    return true;
  }else{
    return false;
  }
}

describe('Wiki parser successfully.', function(done) {

  it('should return json data', function(done) {
    parseWiki('france', function(err, result) {
      assert.equal(true, checkJson(JSON.stringify(result)));
      done(err);
    });
  });

  it('should return json data', function(done) {
    parseWiki('GitHub', function(err, result) {
      assert.equal(true, checkJson(JSON.stringify(result)));
      done(err);
    });
  });

  it('should return json data', function(done) {
    parseWiki('Stoic_(film)', function(err, result) {
      assert.equal(true, checkJson(JSON.stringify(result)));
      done(err);
    });
  });

});

describe('Wiki parser need to redirect.', function(done) {

  it('should return redirection', function(done) {
    parseWiki('nodejs', function(err, result) {
      assert.equal(true, JSON.stringify(result).indexOf('REDIRECT') > -1);
      done(err);
    });
  });

});

describe('Wiki parser not found.', function(done) {

  it('should return Page Index Not Found', function(done) {
    parseWiki('nomatterwhathere', function(err, result) {
      assert.equal(true, result === 'Page Index Not Found');
      done(err);
    });
  });

  it('should return Infobox Not Found', function(done) {
    parseWiki('mocha', function(err, result) {
      assert.equal(true, result === 'Infobox Not Found');
      done(err);
    });
  });

  it('should return Query Not Found', function(done) {
    parseWiki('', function(err, result) {
      assert.equal(true, result === 'Query Not Found');
      done(err);
    });
  });

});