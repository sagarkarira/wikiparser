#!/usr/bin/env python
# -*- coding: utf-8 -*- 

import requests
import simplejson
import pprint
import re
import string

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
}

API_URL = "http://en.wikipedia.org/w/api.php"

default_params = {
    "action": "query",
    "prop": "revisions",
    "rvprop": "content",
    "format": "json",
    "rvsection": "0",
}

def makeApiTitle(title):
    title = title.replace(' ','_')
    return title

def unescape(d):
    regex = re.compile("(%s)" % "|".join(symbols.keys()))
    out = re.sub("&amp;", "&", d)
    while True:
        m = regex.search(out)
        if m is None:
            break
        out = re.sub(m.group(0), symbols[m.group(0)], out)
    return out

def strip_comments(d):
    regex = re.compile(r"\<\!\-\-.*\-\-\>", re.MULTILINE | re.DOTALL)
    return regex.sub('', d)

def strip_refs(d):
    regex = re.compile(r"\<ref\>(.*?)\<\/ref\>", re.MULTILINE | re.DOTALL)
    return regex.sub('', d)

def strip_tables(d):
    regex = re.compile("\{\|.*\|\}", re.MULTILINE | re.DOTALL)
    return regex.sub('', d)

def strip_font(d):
    regex = re.compile(r"\'{3,5}")
    return regex.sub('', d)

def mask_titles(d):
    regex = re.compile(r"(?<!=)(={1,6})([^=]+)\1(?!=)")
    return regex.sub(lambda x: "[%s]" % x.group(0), d)

def remove_html_tags(data):
    p = re.compile(r'<.*?>')
    return p.sub('', data)

def remove_brackets(data):
    p = re.compile(r'(.*?)')
    return p.sub('', data)

def stripArraytags(data):
    data = str(data)
    data  = data.replace("\"","") #cleaning
    #data  = data.replace("'","")
    data  = data.replace("<br>",",")
    data  = data.replace("<br/>",",")
    data  = data.replace("</br>",",")
    data  = data.replace("Infobox","")
    data  = data.replace("-","")
    data  = data.replace("_","")
    data  = data.replace("{","")
    data  = data.replace("}","")
    data = data.strip()
    return data


# ##############################################################
def get_info(titles):
    
    default_params.update({"titles": makeApiTitle(titles)})
    r = requests.get(API_URL, params=default_params)
    
    if r.ok:
        data = simplejson.loads(r.content)
        key = data["query"]["pages"].keys()[0]
        text =  unicode(data["query"]["pages"][key]["revisions"][0]["*"]).encode("utf-8")
        #TODO: Parsing infobox data
	
        text = unescape(text)
        text = strip_comments(text)
        text = strip_refs(text)
        text = stripArraytags(text)
        #[[Aishwarya Rai]][[Martin Henderson]][[Nadira Babbar]][[Anupa]]
        text = " %s " % (text)
        
        # TODO: This part parsing text. Suppose If text is [[English Language |English ]] - Then output should be English
        text = re.sub("(\[\[[^\[\]]*\|)|(\[\[)|(\]\])","",text)
        text = text.replace('|','')
        text = text.replace('<br/>',',')
        text = text.replace('<br>',',')
        text = text.replace('<br />',',')
        text = text.replace('<BR>',',')
        text = text.replace('<br/ >',',')
        text = text.replace('"','')
        text = text.replace("'",'')
        text = remove_html_tags(text)
        text = re.sub(r'\([^)]*\)', '', text) # Remove text between parentheses
        data_dict = {}
        filter_dict = {}
        for each in text.split("\n"):
            temp = each.split('=')
            if len(temp) == 2:
                data_dict[temp[0]] = temp[1]
        data = dict((k.strip(), v.strip()) for k, v in data_dict.iteritems())
        #TODO: Clean Date
        # release = data.get('released','')
        # clean = ["Film","start","date","Date"]
        # for c in clean:
        #     release = release.replace(c,'')
        
        """director = filter(lambda name: bool(name.strip()), data.get('director',''))
	writer = filter(lambda name: bool(name.strip()), data.get('writer',''))
	producer = filter(lambda name: bool(name.strip()), data.get('producer',''))
	music = filter(lambda name: bool(name.strip()), data.get('music',''))
	studio = filter(lambda name: bool(name.strip()), data.get('studio',''))
	editing = filter(lambda name: bool(name.strip()), data.get('editing',''))"""
		
	return data	
        

print get_info('Afghanistan')
print ","
print get_info('Åland Islands')
print ","
print get_info('Albania')
print ","
print get_info('Algeria')
print ","
print get_info('American Samoa')
print ","
print get_info('Andorra')
print ","
print get_info('Angola')
print ","
print get_info('Anguilla')
print ","
print get_info('Antarctica')
print ","
print get_info('Antigua and Barbuda')
print ","
print get_info('Argentina')
print ","
print get_info('Armenia')
print ","
print get_info('Aruba')
print ","
print get_info('Australia')
print ","
print get_info('Austria')
print ","
print get_info('Azerbaijan')
print ","
print get_info('The Bahamas')
print ","
print get_info('Bahrain')
print ","
print get_info('Bangladesh')
print ","
print get_info('Barbados')
print ","
print get_info('Belarus')
print ","
print get_info('Belgium')
print ","
print get_info('Belize')
print ","
print get_info('Benin')
print ","
print get_info('Bermuda')
print ","
print get_info('Bhutan')
print ","
print get_info('Bolivia')
print ","
print get_info('Caribbean Netherlands')
print ","
print get_info('Bosnia and Herzegovina')
print ","
print get_info('Botswana')
print ","
print get_info('Bouvet Island')
print ","
print get_info('Brazil')
print ","
print get_info('British Indian Ocean Territory')
print ","
print get_info('Brunei')
print ","
print get_info('Bulgaria')
print ","
print get_info('Burkina Faso')
print ","
print get_info('Burundi')
print ","
print get_info('Cambodia')
print ","
print get_info('Cameroon')
print ","
print get_info('Canada')
print ","
print get_info('Cape Verde')
print ","
print get_info('Cayman Islands')
print ","
print get_info('Central African Republic')
print ","
print get_info('Chad')
print ","
print get_info('Chile')
print ","
print get_info('China')
print ","
print get_info('Christmas Island')
print ","
print get_info('Cocos (Keeling) Islands')
print ","
print get_info('Colombia')
print ","
print get_info('Comoros')
print ","
print get_info('Republic of the Congo')
print ","
print get_info('Democratic Republic of the Congo')
print ","
print get_info('Cook Islands')
print ","
print get_info('Costa Rica')
print ","
print get_info('Ivory Coast')
print ","
print get_info('Croatia')
print ","
print get_info('Cuba')
print ","
print get_info('Curaçao')
print ","
print get_info('Cyprus')
print ","
print get_info('Czech Republic')
print ","
print get_info('Denmark')
print ","
print get_info('Djibouti')
print ","
print get_info('Dominica')
print ","
print get_info('Dominican Republic')
print ","
print get_info('Ecuador')
print ","
print get_info('Egypt')
print ","
print get_info('El Salvador')
print ","
print get_info('Equatorial Guinea')
print ","
print get_info('Eritrea')
print ","
print get_info('Estonia')
print ","
print get_info('Ethiopia')
print ","
print get_info('Falkland Islands')
print ","
print get_info('Faroe Islands')
print ","
print get_info('Fiji')
print ","
print get_info('Finland')
print ","
print get_info('France')
print ","
print get_info('French Guiana')
print ","
print get_info('French Polynesia')
print ","
print get_info('French Southern and Antarctic Lands')
print ","
print get_info('Gabon')
print ","
print get_info('The Gambia')
print ","
print get_info('Georgia (country)')
print ","
print get_info('Germany')
print ","
print get_info('Ghana')
print ","
print get_info('Gibraltar')
print ","
print get_info('Greece')
print ","
print get_info('Greenland')
print ","
print get_info('Grenada')
print ","
print get_info('Guadeloupe')
print ","
print get_info('Guam')
print ","
print get_info('Guatemala')
print ","
print get_info('Guernsey')
print ","
print get_info('Guinea')
print ","
print get_info('Guinea-Bissau')
print ","
print get_info('Guyana')
print ","
print get_info('Haiti')
print ","
print get_info('Heard Island and McDonald Islands')
print ","
print get_info('Vatican City')
print ","
print get_info('Honduras')
print ","
print get_info('Hong Kong')
print ","
print get_info('Hungary')
print ","
print get_info('Iceland')
print ","
print get_info('India')
print ","
print get_info('Indonesia')
print ","
print get_info('Iran')
print ","
print get_info('Iraq')
print ","
print get_info('Ireland')
print ","
print get_info('Isle of Man')
print ","
print get_info('Israel')
print ","
print get_info('Italy')
print ","
print get_info('Jamaica')
print ","
print get_info('Japan')
print ","
print get_info('Jersey')
print ","
print get_info('Jordan')
print ","
print get_info('Kazakhstan')
print ","
print get_info('Kenya')
print ","
print get_info('Kiribati')
print ","
print get_info('North Korea')
print ","
print get_info('South Korea')
print ","
print get_info('Kosovo')
print ","
print get_info('Kuwait')
print ","
print get_info('Kyrgyzstan')
print ","
print get_info('Laos')
print ","
print get_info('Latvia')
print ","
print get_info('Lebanon')
print ","
print get_info('Lesotho')
print ","
print get_info('Liberia')
print ","
print get_info('Libya')
print ","
print get_info('Liechtenstein')
print ","
print get_info('Lithuania')
print ","
print get_info('Luxembourg')
print ","
print get_info('Macau')
print ","
print get_info('Republic of Macedonia')
print ","
print get_info('Madagascar')
print ","
print get_info('Malawi')
print ","
print get_info('Malaysia')
print ","
print get_info('Maldives')
print ","
print get_info('Mali')
print ","
print get_info('Malta')
print ","
print get_info('Marshall Islands')
print ","
print get_info('Martinique')
print ","
print get_info('Mauritania')
print ","
print get_info('Mauritius')
print ","
print get_info('Mayotte')
print ","
print get_info('Mexico')
print ","
print get_info('Federated States of Micronesia')
print ","
print get_info('Moldova')
print ","
print get_info('Monaco')
print ","
print get_info('Mongolia')
print ","
print get_info('Montenegro')
print ","
print get_info('Montserrat')
print ","
print get_info('Morocco')
print ","
print get_info('Mozambique')
print ","
print get_info('Burma')
print ","
print get_info('Namibia')
print ","
print get_info('Nauru')
print ","
print get_info('Nepal')
print ","
print get_info('Netherlands')
print ","
print get_info('New Caledonia')
print ","
print get_info('New Zealand')
print ","
print get_info('Nicaragua')
print ","
print get_info('Niger')
print ","
print get_info('Nigeria')
print ","
print get_info('Niue')
print ","
print get_info('Norfolk Island')
print ","
print get_info('Northern Mariana Islands')
print ","
print get_info('Norway')
print ","
print get_info('Oman')
print ","
print get_info('Pakistan')
print ","
print get_info('Palau')
print ","
print get_info('Palestinian territories')
print ","
print get_info('Panama')
print ","
print get_info('Papua New Guinea')
print ","
print get_info('Paraguay')
print ","
print get_info('Peru')
print ","
print get_info('Philippines')
print ","
print get_info('Pitcairn Islands')
print ","
print get_info('Poland')
print ","
print get_info('Portugal')
print ","
print get_info('Puerto Rico')
print ","
print get_info('Qatar')
print ","
print get_info('Réunion')
print ","
print get_info('Romania')
print ","
print get_info('Russia')
print ","
print get_info('Rwanda')
print ","
print get_info('Saint Barthélemy')
print ","
print get_info('Saint Helena, Ascension and Tristan da Cunha')
print ","
print get_info('Saint Kitts and Nevis')
print ","
print get_info('Saint Lucia')
print ","
print get_info('Collectivity of Saint Martin')
print ","
print get_info('Saint Pierre and Miquelon')
print ","
print get_info('Saint Vincent and the Grenadines')
print ","
print get_info('Samoa')
print ","
print get_info('San Marino')
print ","
print get_info('São Tomé and Príncipe')
print ","
print get_info('Saudi Arabia')
print ","
print get_info('Senegal')
print ","
print get_info('Serbia')
print ","
print get_info('Seychelles')
print ","
print get_info('Sierra Leone')
print ","
print get_info('Singapore')
print ","
print get_info('Sint Maarten')
print ","
print get_info('Slovakia')
print ","
print get_info('Slovenia')
print ","
print get_info('Solomon Islands')
print ","
print get_info('Somalia')
print ","
print get_info('South Africa')
print ","
print get_info('South Georgia and the South Sandwich Islands')
print ","
print get_info('South Sudan')
print ","
print get_info('Spain')
print ","
print get_info('Sri Lanka')
print ","
print get_info('Sudan')
print ","
print get_info('Suriname')
print ","
print get_info('Svalbard and Jan Mayen')
print ","
print get_info('Swaziland')
print ","
print get_info('Sweden')
print ","
print get_info('Switzerland')
print ","
print get_info('Syria')
print ","
print get_info('Taiwan')
print ","
print get_info('Tajikistan')
print ","
print get_info('Tanzania')
print ","
print get_info('Thailand')
print ","
print get_info('East Timor')
print ","
print get_info('Togo')
print ","
print get_info('Tokelau')
print ","
print get_info('Tonga')
print ","
print get_info('Trinidad and Tobago')
print ","
print get_info('Tunisia')
print ","
print get_info('Turkey')
print ","
print get_info('Turkmenistan')
print ","
print get_info('Turks and Caicos Islands')
print ","
print get_info('Tuvalu')
print ","
print get_info('Uganda')
print ","
print get_info('Ukraine')
print ","
print get_info('United Arab Emirates')
print ","
print get_info('United Kingdom')
print ","
print get_info('United States')
print ","
print get_info('United States Minor Outlying Islands')
print ","
print get_info('Uruguay')
print ","
print get_info('Uzbekistan')
print ","
print get_info('Vanuatu')
print ","
print get_info('Venezuela')
print ","
print get_info('Vietnam')
print ","
print get_info('British Virgin Islands')
print ","
print get_info('United States Virgin Islands')
print ","
print get_info('Wallis and Futuna')
print ","
print get_info('Western Sahara')
print ","
print get_info('Yemen')
print ","
print get_info('Zambia')
print ","
print get_info('Zimbabwe')

