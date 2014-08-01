var assert = require("assert");
var parser = require('../infobox.js');

describe('Wiki Parser', function(){
  it('should return -1 when the value is not present', function(done) {
    parser.parseWiki('france', function(err, result) {
      assert.equal(true, JSON.stringify(result).length > 1);
      console.log(result);
      done(err);
    });
  });
});