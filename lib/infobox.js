var async = require('async'),
request   = require('request');

function parseWiki(title, callback) {

  async.waterfall([
    function (cb) {
      var url = ['http://en.wikipedia.org/w/api.php?',
                'action=query&',
                'prop=revisions&',
                'rvprop=content&',
                'rvsection=0&',
                'format=json',
                '&titles=',
                title].join('');

      request(url, function(error, response, content) {
        content = JSON.parse(content);
        if (error || !content.query) { 
          callback(null, 'Query Not Found');
        } else {
          var json   = content.query.pages,
              key    = Object.keys(json);

          // If result not found.
          if (key.indexOf('-1') === 0) { 
            callback(null, 'Page Index Not Found');
          } else {
            cb(null, json[key].revisions[0]['*']);
          }
        }
      });
    },

    function (content, cb) {
      var reg    = new RegExp('{{[Ii]nfobox(.|\n)*}}', 'g'),
          result = {};

      var text   = reg.exec(content);
      if (text) {
        text = text[0];
      } else {
        callback(null, 'Infobox Not Found');
      }

      // Remove comments.
      text = replaceAll('<!--.*-->', '', text);
      // Remove reference.
      text = replaceAll('<ref.*(/>|>.*</ref>)', '', text);
      // Remove all HTML tags.
      text = replaceAll('<[^>]+>', '', text);
      // Remove page regerences.
      text = replaceAll('\{\{refn[^\}\}]*?\}\}', '', text);

      // Check each line in text.
      if (text) {
        text.split('\n|').forEach(function(item) {
          var temp = item.split(' = ');

          if (temp.length === 2 && temp[1].trim() !== '') {
            // Get left part and right part.
            var item_name    = temp[0].trim(),
                item_content = temp[1].trim().split('\n')[0];

            // Extract all simple texts inside '[[ ]]', 
            // such as [[France]], [[Language French|French]], etc.
            var find = item_content.match(/\[\[.*?\]\]/g);
            // console.log(find);
            if (find) {
              find.forEach(function(substring) {
                var arr = substring.split('|');
                if (arr.length === 1) {
                  item_content = item_content.replace(substring, 
                                                      substring.substr(2, substring.length-4));
                } else if (arr.length === 2) {
                  item_content = item_content.replace(substring, 
                                                      arr[1].substr(0, arr[1].length-2));
                }
              });
            }

            // Remove font style
            while (item_content.indexOf('{{nowrap|') !== -1) {
              item_content = item_content.replace('{{nowrap|', '');
              item_content = item_content.replace('}}', '');
            }

            while (item_content.indexOf('{{small|') !== -1) {
              item_content = item_content.replace('{{small|', '');
              item_content = item_content.replace('}}', '');
            }

            if (item_content.indexOf('{{native') !== -1) {
              find = item_content.match(/\{\{native[^\}\}]*?\}\}/g);
              if (find) {
                find.forEach(function(substring) {
                  var arr = substring.split('|');
                  item_content = item_content.replace(substring, arr[2]);
                });
              }
            }      

            // Remove list tag
            if (item_content.indexOf('{{unbulleted') !== -1) {
              find = item_content.match(/\{\{unbulleted[^\}\}]*?\}\}/g);
              if (find) {
                find.forEach(function(substring) {
                  var arr = substring.split('|');
                  arr.shift();
                  item_content = item_content.replace(substring, arr.join(',').replace('}}', ''));
                });
              }
            }      

            // Remove simple vertical list tag
            if (item_content.indexOf('{{vunblist') !== -1 && 
                item_content.split('{{').length < 3) {
              find = item_content.match(/\{\{vunblist[^\}\}]*?\}\}/g);
              if (find) {
                find.forEach(function(substring) {
                  var arr = substring.split('|');
                  arr.shift();
                  item_content = item_content.replace(substring, arr.join(',').replace('}}', ''));
                });
              }
            }

            // Remove horizon list tag
            if (item_content.indexOf('{{hlist') !== -1) {
              find = item_content.match(/\{\{hlist[^\}\}]*?\}\}/g);
              if (find) {
                find.forEach(function(substring) {
                  var arr = substring.split('|');
                  arr.shift();
                  item_content = item_content.replace(substring, arr.join(',').replace('}}', ''));
                });
              }
            }

            // Remove efn tag
            if (item_content.indexOf('{{efn') !== -1) {
              find = item_content.match(/\{\{efn[^\}\}]*?\}\}/g);
              if (find) {
                find.forEach(function(substring) {
                  item_content = item_content.replace(substring, '');
                });
              }
            }

            item_content = replaceAll('&nbsp', ' ', item_content);
            item_content = replaceAll('\n\}\}', '', item_content);
            result[item_name] = item_content;
          }
          
        });
      }
      cb(null, result);
    }
  ], function (err, result) {
    callback(err, result);
  });
}

function replaceAll(find, replace, str) {
  if(str)
    return str.replace(new RegExp(find, 'gm'), replace).trim();
  else
    return null;
}

exports.parseWiki = parseWiki;