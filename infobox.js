var myUtil = require('./myUtil.js'),
    async  = require('async');

var wikiText,
    symbols = {
      '&diams;': '\u2666',
      '&Ecirc;': '\xca',
      '&Theta;': '\u0398',
      '&Lambda;': '\u039b',
      '&raquo;': '\xbb',
      '&sum;': '\u2211',
      '&oacute;': '\xf3',
      '&iota;': '\u03b9',
      '&Sigma;': '\u03a3',
      '&atilde;': '\xe3',
      '&agrave;': '\xe0',
      '&nbsp;': ' ',
      '&Gamma;': '\u0393',
      '&Auml;': '\xc4',
      '&Ouml;': '\xd6',
      '&Egrave;': '\xc8',
      '&acute;': '\xb4',
      '&supe;': '\u2287',
      '&lsquo;': '\u2018',
      '&deg;': '\xb0',
      '&middot;': '\xb7',
      '&upsilon;': '\u03c5',
      '&ocirc;': '\xf4',
      '&Ugrave;': '\xd9',
      '&ndash;': '\u2013',
      '&psi;': '\u03c8',
      '&gt;': '>',
      '&notin;': '\u2209',
      '&lambda;': '\u03bb',
      '&hearts;': '\u2665',
      '&sigmaf;': '\u03c2',
      '&ge;': '\u2265',
      '&uml;': '\xa8',
      '&aring;': '\xe5',
      '&sub;': '\u2282',
      '&iexcl;': '\xa1',
      '&Aacute;': '\xc1',
      '&zeta;': '\u03b6',
      '&ne;': '\u2260',
      '&trade;': '\u2122',
      '&igrave;': '\xec',
      '&aelig;': '\xe6',
      '&there4;': '\u2234',
      '&asymp;': '\u2248',
      '&uarr;': '\u2191',
      '&gamma;': '\u03b3',
      '&yen;': '\xa5',
      '&times;': '\xd7',
      '&ouml;': '\xf6',
      '&epsilon;': '\u03b5',
      '&Prime;': '\u2033',
      '&egrave;': '\xe8',
      '&prime;': '\u2032',
      '&kappa;': '\u03ba',
      '&divide;': '\xf7',
      '&Igrave;': '\xcc',
      '&hArr;': '\u21d4',
      '&omega;': '\u03c9',
      '&ucirc;': '\xfb',
      '&Icirc;': '\xce',
      '&sigma;': '\u03c3',
      '&micro;': '\xb5',
      '&Ccedil;': '\xc7',
      '&Xi;': '\u039e',
      '&Omega;': '\u03a9',
      '&sup;': '\u2283',
      '&larr;': '\u2190',
      '&prod;': '\u220f',
      '&rsaquo;': '\u203a',
      '&Ucirc;': '\xdb',
      '&lsaquo;': '\u2039',
      '&amp;': '&',
      '&uuml;': '\xfc',
      '&yuml;': '',
      '&uacute;': '\xfa',
      '&ecirc;': '\xea',
      '&theta;': '\u03b8',
      '&laquo;': '\xab',
      '&infin;': '\u221e',
      '&dagger;': '\u2020',
      '&not;': '\xac',
      '&Ograve;': '\xd2',
      '&oslash;': '\xf8',
      '&Uuml;': '\xdc',
      '&permil;': '\u2030',
      '&cedil;': '\xb8',
      '&plusmn;': '\xb1',
      '&AElig;': '\xc6',
      '&loz;': '\u25ca',
      '&icirc;': '\xee',
      '&alpha;': '\u03b1',
      '&auml;': '\xe4',
      '&xi;': '\u03be',
      '&szlig;': '\xdf',
      '&spades;': '\u2660',
      '&euml;': '\xeb',
      '&pi;': '\u03c0',
      '&bull;': '\u2022',
      '&phi;': '\u03c6',
      '&isin;': '\u2208',
      '&iquest;': '\xbf',
      '&equiv;': '\u2261',
      '&lt;': '<',
      '&eacute;': '\xe9',
      '&ntilde;': '\xf1',
      '&le;': '\u2264',
      '&clubs;': '\u2663',
      '&pound;': '\xa3',
      '&Phi;': '\u03a6',
      '&sbquo;': '\u201a',
      '&Iuml;': '\xcf',
      '&and;': '\u2227',
      '&rArr;': '\u21d2',
      '&Eacute;': '\xc9',
      '&Ntilde;': '\xd1',
      '&rsquo;': '\u2019',
      '&euro;': '\u20ac',
      '&rdquo;': '\u201d',
      '&delta;': '\u03b4',
      '&cap;': '\u2229',
      '&quot;': '"',
      '&sect;': '\xa7',
      '&radic;': '\u221a',
      '&tau;': '\u03c4',
      '&rho;': '\u03c1',
      '&Acirc;': '\xc2',
      '&ccedil;': '\xe7',
      '&prop;': '\u221d',
      '&mu;': '\u03bc',
      '&Delta;': '\u0394',
      '&nabla;': '\u2207',
      '&forall;': '\u2200',
      '&Iacute;': '\xcd',
      '&Dagger;': '\u2021',
      '&cup;': '\u222a',
      '&sube;': '\u2286',
      '&Aring;': '\xc5',
      '&darr;': '\u2193',
      '&macr;': '\xaf',
      '&ordm;': '\xba',
      '&Oslash;': '\xd8',
      '&Otilde;': '\xd5',
      '&alefsym;': '\u2135',
      '&part;': '\u2202',
      '&Uacute;': '\xda',
      '&reg;': '\xae',
      '&ordf;': '\xaa',
      '&omicron;': '\u03bf',
      '&nu;': '\u03bd',
      '&iuml;': '\xef',
      '&ugrave;': '\xf9',
      '&curren;': '\xa4',
      '&copy;': '\xa9',
      '&ldquo;': '\u201c',
      '&Atilde;': '\xc3',
      '&para;': '\xb6',
      '&Euml;': '\xcb',
      '&harr;': '\u2194',
      '&Pi;': '\u03a0',
      '&chi;': '\u03c7',
      '&ograve;': '\xf2',
      '&acirc;': '\xe2',
      '&int;': '\u222b',
      '&or;': '\u2228',
      '&aacute;': '\xe1',
      '&Agrave;': '\xc0',
      '&Oacute;': '\xd3',
      '&exist;': '\u2203',
      '&eta;': '\u03b7',
      '&Psi;': '\u03a8',
      '&oelig;': '\u0153',
      '&iacute;': '\xed',
      '&cent;': '\xa2',
      '&Ocirc;': '\xd4',
      '&mdash;': '\u2014',
      '&minus;': '\u2212',
      '&bdquo;': '\u201e',
      '&otilde;': '\xf5',
      '&beta;': '\u03b2',
      '&rarr;': '\u2192'
    };

async.series([

  function(callback) {
    url = 'http://en.wikipedia.org/w/api.php?' + 
          'action=query&prop=revisions&rvprop=content&rvsection=0&format=json&titles=' +
          'france';

    myUtil.get(url, function(url, content, status) {
      var json = eval('(' + content + ')').query.pages;
      var key = null;
      for (var i in json) { key = i; break; }
      if (key != -1) {wikiText = json[key].revisions[0]['*'];}
      callback(wikiText);
    });
  }
], function(msg) {
  console.log('got text');
  msg = unescape(msg);
  msg = strip_comments(msg);
  msg = strip_refs(msg);
  msg = strip_array_tages(msg);
  msg = remove_html_tags(msg);

  msg.split('\n|').forEach(function(item) {
    var temp = item.split('=');
    if (temp.length - 1 === 1) {
      console.log(temp[0].trim(), ':', temp[1].trim());
    }
  });

});


function unescape(text) {
  // console.log(text);
  text  = replaceAll('&amp;', '&', text);
  for (var item in symbols) {
    // console.log(item);
    text = replaceAll(item, symbols[item], text);
  }
  // console.log(text);
  return text;
}

function strip_comments(text) {
  // console.log(text);
  text = replaceAll('<!--.*-->', '', text);
  // console.log(text);
  return text;
}

function strip_refs(text) {
  // console.log(text);
  text = replaceAll('\<ref\>(.*?)\<\/ref\>', '', text);
  // console.log(text);
  return text;
}

function strip_tables(text) {

}

function strip_font(text) {

}

function mask_titles(text) {

}

function remove_html_tags(text) {
  // console.log(text);
  text = replaceAll('\<.*?\>', '', text);
  // console.log(text);
  return text;
}

function remove_brackets(text) {

}

function strip_array_tages(text) {
  text = replaceAll('(\[\[[^\[\]]*\|)|(\[\[)|(\]\])', '', text);
  text = replaceAll('|', '', text);
  text = replaceAll('<br>', ',', text);
  text = replaceAll('<BR>', ',', text);
  text = replaceAll('<br/>', ',', text);
  text = replaceAll('<br/ >', ',', text);
  text = replaceAll('<br />', ',', text);
  text = replaceAll('</br>', ',', text);
  text = replaceAll('Infobox', '', text);
  text = replaceAll('-', '', text);
  text = replaceAll('_', '', text);
  text = replaceAll("'", '', text);
  text = replaceAll('"', '', text);
  text = replaceAll('{', '', text);
  text = replaceAll('}', '', text);
  text = text.trim();
  return text;
}


function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace).trim();
}
