var MyUtil = function() {};

var http    = require('http');
    request = require('request');

MyUtil.prototype.get = function(url, callback) {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(url, body, response.statusCode);
    }
  });
};

module.exports = new MyUtil();