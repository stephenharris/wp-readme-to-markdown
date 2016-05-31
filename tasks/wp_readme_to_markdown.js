/*
 * grunt-wp-readme-to-markdown
 * https://github.com/stephen/wp-readme-to-markdown
 *
 * Copyright (c) 2013 Stephen Harris
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

 grunt.registerMultiTask('wp_readme_to_markdown', 'Converts WP readme.txt file to markdown (readme.md)', function() {

	var options = this.options({
		screenshot_url: false,
		pre_convert: function( readme ){},
		post_convert: function( readme ){}
	});

	grunt.verbose.writeflags( options );
	this.files.forEach(function(f) {

		// Concat specified files.
		var readme = f.src.filter(function(filepath) {
			// Warn on and remove invalid source files (if nonull was set).
			if ( !grunt.file.exists(filepath)) {
				grunt.log.warn('Source file "' + filepath + '" not found.');
				return false;
			} else {
				return true;
			}
		}).map(function(filepath) {
			// Read file source.
			return grunt.file.read(filepath);
		}).join(grunt.util.normalizelf(' '));

		readme = options.pre_convert(readme) || readme;

		/* The following is a ported version of {@see https://github.com/benbalter/WP-Readme-to-Github-Markdown}*/

		//Convert Headings
		grunt.log.debug("Converting headings");
		readme = readme.replace( new RegExp("^=([^=]+)=*?[\\s ]*?$","gim"),"###$1###");
		readme = readme.replace( new RegExp("^==([^=]+)==*?[\\s ]*?$","mig"),"##$1##");
		readme = readme.replace( new RegExp("^===([^=]+)===*?[\\s ]*?$","gim"),"#$1#");

		//parse contributors, donate link, etc.
		grunt.log.debug("Parse contributors, donate link etc");
		var header_match = readme.match( new RegExp("([^##]*)(?:\n##|$)", "m") );
		if ( header_match && header_match.length >= 1 ) {
			var header_search = header_match[1];
			var header_replace = header_search.replace( new RegExp("^([^:\r\n*]{1}[^:\r\n#\\]\\[]+): (.+)","gim"),"**$1:** $2  ");
			readme = readme.replace( header_search, header_replace );
		}

		// Include w.org profiles for contributors.
		grunt.log.debug("Including contributors profiles");
		var contributors_match = readme.match( new RegExp("(\\*\\*Contributors:\\*\\* )(.+)", "m") );
		if ( header_match && header_match.length >= 1 ) {
			var contributors_search = contributors_match[0];
			var contributors_replace = contributors_match[1];
			var profiles = [];

			// Fill profiles.
			contributors_match[2].split(",").forEach(function(value) {
				value = value.trim();
				profiles.push("[" + value + "](https://profiles.wordpress.org/" + value + ")");
			});

			contributors_replace += profiles.join(", ");

			// Add line break.
			contributors_replace += '  ';

			readme = readme.replace( contributors_search, contributors_replace );
		}

		//guess plugin slug from plugin name
		//@todo Get this from config instead?
		grunt.log.debug("Get plugin name");
		var _match =  readme.match( new RegExp("^#([^#]+)#[\\s ]*?$","im") );

		//process screenshots, if any
		grunt.log.debug("Get screenshots");
		var screenshot_match = readme.match( new RegExp("## Screenshots ##([^#]*)","im") );
		if ( options.screenshot_url && _match && screenshot_match && screenshot_match.length > 1 ) {

			var plugin = _match[1].trim().toLowerCase().replace(/ /g, '-');

			//Collect screenshots content
			var screenshots = screenshot_match[1];

			//parse screenshot list into array
			var globalMatch = screenshots.match( new RegExp( "^[0-9]+\\. (.*)", "gim") );

			var matchArray = [], nonGlobalMatch;
			for ( var i in globalMatch ) {
				nonGlobalMatch = globalMatch[i].match(  new RegExp( "^[0-9]+\\. (.*)", 'im' ) );
				matchArray.push( nonGlobalMatch[1] );
			}

			//replace list item with markdown image syntax, hotlinking to plugin repo
			//@todo assumes .png, perhaps should check that file exists first?
			for( i=1; i <= matchArray.length; i++ ) {
				var url = options.screenshot_url;
				url = url.replace( '{plugin}', plugin );
				url = url.replace( '{screenshot}', 'screenshot-'+i );
				readme = readme.replace(  globalMatch[i-1], "### "+i+". "+ matchArray[i-1] +" ###\n!["+matchArray[i-1]+"](" + url + ")\n" );
			}
		}

		//Code blocks
		readme = readme.replace( new RegExp("^`$[\n\r]+([^`]*)[\n\r]+^`$","gm"),function( codeblock, codeblockContents ){
			var lines = codeblockContents.split("\n");
			//Add newline and indent all lines in the codeblock by one tab.
			return "\n\t" + lines.join("\n\t") + "\n"; //trailing newline is unnecessary but adds some symmetry.
		});

		readme = options.post_convert(readme) || readme;

		// Write the destination file.
		grunt.file.write( f.dest, readme );

		// Print a success message.
		grunt.log.writeln('File "' + f.dest + '" created.');
	});
});

};
