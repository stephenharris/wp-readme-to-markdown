# grunt-wp-readme-to-markdown

> Converts WordPress readme.txt file to markdown (readme.md)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wp-readme-to-markdown --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wp-readme-to-markdown');
```

## The "wp_readme_to_markdown" task

### Overview
In your project's Gruntfile, add a section named `wp_readme_to_markdown` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wp_readme_to_markdown: {
    your_target: {
      // Target-specific file lists go here.
    },
  },
})
```

### Options

### Usage Examples

#### Default Options
WordPress `readme.txt` should live in the root of your plug-in, so typical usage would be to set the source as `readme.txt` and the destination as `readme.md`.

```js
grunt.initConfig({
  wp_readme_to_markdown: {
	your_target: {
	    files: {
	      'readme.md': 'readme.txt'
	    },
	},
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.2.0
Ensure contributors, donate link, etc have their own line.

### 0.1.0
Initial release
