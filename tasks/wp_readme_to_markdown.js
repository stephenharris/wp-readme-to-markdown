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

		/* The following is a ported version of {@see https://github.com/benbalter/WP-Readme-to-Github-Markdown}*/

		//Convert Headings 
		grunt.log.debug("Converting headings");
		readme = readme.replace( new RegExp("^=([^=]+)=*?[\s ]*?\n","gim"),"###$1###\n");	
		readme = readme.replace( new RegExp("^==([^=]+)==*?[\s ]*?\n","mig"),"##$1##\n");
		readme = readme.replace( new RegExp("^===([^=]+)===*?[\s ]*?\n","gim"),"#$1#\n");

		//parse contributors, donate link, etc.
		grunt.log.debug("Parse contributors, donate link etc");
		readme = readme.replace( new RegExp("^([^:\n\*]{1}[^:\n#\\]\\[]+): (.+)","gim"),"**$1:** $2  ");

		//guess plugin slug from plugin name
		//@todo Get this from config instead?
		grunt.log.debug("Get plugin name");
		var _match =  readme.match( new RegExp("^#([^#]+)#[\s ]*?\n","i") );	

		//process screenshots, if any
		var screenshot_match = readme.match( new RegExp("## Screenshots ##([^#]*)","im") );
		if ( _match && screenshot_match.length > 1 ) {
			
			var plugin = _match[1].trim().toLowerCase().replace(' ', '-');
	
			//Collect screenshots content	
			var screenshots = screenshot_match[1];

			//parse screenshot list into array
			var globalMatch = screenshots.match( new RegExp( "^[0-9]+\. (.*)", "gim") );

			var matchArray = [], nonGlobalMatch;
			for ( var i in globalMatch ) {
				nonGlobalMatch = globalMatch[i].match(  new RegExp( "^[0-9]+\. (.*)", 'im' ) );
				matchArray.push( nonGlobalMatch[1] );
			}
		
			//replace list item with markdown image syntax, hotlinking to plugin repo
			//@todo assumes .png, perhaps should check that file exists first?
			for( i=1; i <= matchArray.length; i++ ) {
				readme = readme.replace(  globalMatch[i-1], "### "+i+". "+ matchArray[i-1] +" ###\n!["+matchArray[i-1]+"](http://s.wordpress.org/extend/plugins/"+plugin+"/screenshot-"+i+".png)\n" );
			}
		}
		// Write the destination file.
		grunt.file.write( f.dest, readme );
	
		// Print a success message.
		grunt.log.writeln('File "' + f.dest + '" created.');
	});
});

};
