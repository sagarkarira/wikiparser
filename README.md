[Wikipedia Infobox](http://en.wikipedia.org/w/api.php) parser
======

A simple parser in node.js for wikipedia markdown text.

Particularly, this parser only works for Infobox.

## Install

	npm install

## Run

  node infobox.js

## Result

	conventional_long_name : French Republic
	common_name : France
	image_flag : Flag of France.svg
	image_coat : Armoiries république française.svg
	symbol_type : National emblem
	national_motto : {{native phrase|fr|"Liberté, égalité, fraternité"|italics=off}}
	englishmotto : "Liberty, Equality, Fraternity"
	national_anthem : "La Marseillaise"File:La Marseillaise.ogg
	image_map : EU-France.svg
	image_map2 : Outre-mer en sans Terre Adelie.png
	map2_width : 250px
	map_caption2 : Territory of the French Republic
	capital : Paris
	largest_city : capital
	official_languages : French
	demonym : French
	...

## Reference

- [Wikipedia API](http://en.wikipedia.org/w/api.php)

- [Syntax of Wiki Markup](http://en.wikipedia.org/wiki/Help:Wiki_markup)