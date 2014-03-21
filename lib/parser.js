var myUtil = require('./myUtil.js'),
		async  = require('async'),
		XLSX   = require('xlsx'),
		jsdom = require("jsdom"); 
		$ = require("jquery")(jsdom.jsdom().createWindow()); 

var xlsx      = XLSX.readFile('res/Countries.xlsx'),
		data      = xlsx.Sheets['Countries'],
		countries = [],
		results   = [],
		url       = null;



for (var col in data) {
	if (col[0] === '!') continue;
	if (col[0] === 'C' && col !== 'C1') {
		countries.push(data[col].v);
	}
}

// Read countries and send request to wikipedia api.
async.each(countries, function(country, callback) {
	url = 'http://en.wikipedia.org/wiki/'
			+ replaceAll(' ', '%20', country);
	console.log("url:=" + url);

	myUtil.get(url, function(content, status) {

		// var table = $('infobox geography vcard');

		// console.log(content);

		var res = $(content).find('table[class="infobox geography vcard"]').html();

		console.log("table:=" + res);
		// console.log("country:=" + country, start, end);

		results.push( {
			'url'      : url,
			'redirect' : url,
			'content'  : content
		});

		callback();
	});




}, function() {
	console.log('End:=', results.length);
});

function replaceAll(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
}
