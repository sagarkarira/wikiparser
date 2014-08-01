var async = require('async'),
    request = require('request');

function parseWiki(title, callback) {
  async.waterfall([
    function (cb) {
      var url = 'http://en.wikipedia.org/w/api.php?' + 
              'action=query&prop=revisions&rvprop=content&rvsection=0&format=json&titles=' +
              title;

      request(url, function(error, response, content) {
        var json   = eval('(' + content + ')').query.pages,
            key    = null;

        // Get page key.
        for (var i in json) { key = i; break; }
        
        // If result not found.
        if (key == -1) { cb(null); }

        cb(null, json[key].revisions[0]['*']);
      });
    },

    function (content, cb) {
      var reg    = new RegExp("{{Infobox(.|\n)*}}", "g"),
          result = {};

      var text   = reg.exec(content);
      if (text) {
        text = text[0];
      } else {
        cb(null, null);
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
              var find = item_content.match(/\{\{native[^\}\}]*?\}\}/g);
              if (find) {
                find.forEach(function(substring) {
                  var arr = substring.split('|');
                  item_content = item_content.replace(substring, arr[2]);
                });
              }
            }      

            // Remove list tag
            if (item_content.indexOf('{{unbulleted') !== -1) {
              var find = item_content.match(/\{\{unbulleted[^\}\}]*?\}\}/g);
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
              var find = item_content.match(/\{\{vunblist[^\}\}]*?\}\}/g);
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
              var find = item_content.match(/\{\{hlist[^\}\}]*?\}\}/g);
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
              var find = item_content.match(/\{\{efn[^\}\}]*?\}\}/g);
              if (find) {
                find.forEach(function(substring) {
                  item_content = item_content.replace(substring, '');
                });
              }
            }

            item_content = replaceAll('&nbsp', ' ', item_content);
            item_content = replaceAll('\n\}\}', '', item_content);
            result[item_name] = item_content;
            // console.log(item_name, ':', item_content);
          }
          
        });
      }
      cb(null, result);
    }
  ], function (err, result) {
    // console.log(JSON.stringify(result));
    callback(err, result);
  });
}

function replaceAll(find, replace, str) {
  if(str)
    return str.replace(new RegExp(find, 'gm'), replace).trim();
  else
    return null;
}

// function queryAPI(title, callback) {
//   var url = 'http://en.wikipedia.org/w/api.php?' + 
//           'action=query&prop=revisions&rvprop=content&rvsection=0&format=json&titles=' +
//           title;

//   request(url, function(error, response, content) {
//     var json   = eval('(' + content + ')').query.pages,
//         key    = null;

//     // Get page key.
//     for (var i in json) { key = i; break; }
    
//     // If result not found.
//     if (key == -1) { callback(null); }

//     callback(null, json[key].revisions[0]['*']);
//   });
// }

exports.parseWiki = parseWiki;