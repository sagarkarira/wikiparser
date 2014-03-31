var myUtil = require('./myUtil.js'),
    async  = require('async');

async.series([

  function(callback) {
    url = 'http://en.wikipedia.org/w/api.php?' + 
          'action=query&prop=revisions&rvprop=content&rvsection=0&format=json&titles=' +
          'Japan';

    myUtil.get(url, function(url, content, status) {
      var json = eval('(' + content + ')').query.pages;
      var key = null;
      for (var i in json) { key = i; break; }
      if (key != -1) {wikiText = json[key].revisions[0]['*'];}
      callback(wikiText);
    });
  }
], function(msg) {
  var reg = new RegExp("{{Infobox(.|\n)*\n}}", "g");
  var text = reg.exec(msg)[0];
  text = replaceAll('<!--.*-->', '', text);
  text = replaceAll('<ref.*(/>|>.*</ref>)', '', text);
  text = replaceAll('<[^>]+>', '', text);
  text = replaceAll('{{refn.*}}\n', '\n', text);

  text.split('\n|').forEach(function(item) {
    var temp = item.split(' = ');
    if (temp.length === 2 && temp[1].trim() !== '') {
      var item_name = temp[0].trim();
      var item_content = temp[1].trim();
      var find = item_content.match(/(\[\[).*?(\]\])/g);
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

      console.log(item_name, ':', item_content);
    }
  });

});

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'gm'), replace).trim();
}
