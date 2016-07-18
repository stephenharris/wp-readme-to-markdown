# grunt-wp-readme-to-markdown

> Converts WordPress readme.txt file to markdown (readme.md)

## Getting Started
This plugin requires Grunt `>=0.4.1`

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

#### screenshot_url
Type: `String`/`Bool`    
Default value: `false`

*Prior to 2.0.0 the default value had been `http://ps.w.org/{plugin}/assets/{screenshot}.png`. Please see [#14](https://github.com/stephenharris/wp-readme-to-markdown/issues/14) for the reasons for the change.* 

The url/path used for the screenshot images. If left as `false`, no screenshot images will be included. Alternatively you can provide a:

 1. A relative path to the images (commited to the repo) `assets/{screenshot}.png`
 2. A URL to a website hosting the images: `http://example.com/{screenshot}.png`
 3. The wordpress.org hosted screenshots**\***: `http://ps.w.org/{plugin}/assets/{screenshot}.png`

There are placeholders to available for use in the URL structure. `{plugin}` is replaced by the plug-in name (as determined by the readme) and `{screenshot}` is replaced by `screenshot-X` where `X` is a number indexing the screenshots (starting from 1). 

**\*** Actual URL of the wordpress.org hosted screenshots can vary. Please see [#14](https://github.com/stephenharris/wp-readme-to-markdown/issues/14) for details.

#### pre_convert
Type: `function`    
Default value: `noop`

A function which filters the value of the original readme file before it is converted. You should return the (modified) content. Returning a `false` value has the same effect as not providing a callback at all: the original readme file content is used.

#### post_convert
Type: `function`    
Default value: `noop`

A function which filters the value of the converted readme content immediately before it is written to file. You should return the (modified) content. Returning a `false` value has the same effect as not providing a callback at all: the converted readme content is written to file unchanged.

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

### 2.0.1 - 18th July 2016
- Updated peerDependencies - see http://gruntjs.com/blog/2016-02-11-grunt-1.0.0-rc1-released

### 2.0.0 - 31st May 2016
- **Breaking change:** The default value of `screenshot_url` has been changed from `http://ps.w.org/{plugin}/assets/{screenshot}.png` to `false`. By default no screenshot images are included in the generated `readme.md`. Please see [#14](https://github.com/stephenharris/wp-readme-to-markdown/issues/14) for details.
- Contributors have their links to their wordpress.org profile automatically inserted. [#12](https://github.com/stephenharris/wp-readme-to-markdown/issues/12)
- Added `pre_convert` and `post_convert` options

### 1.0.0
- Changed the default value of the screen short URL
- Fix for the fact lines with colons are being parsed as if they were readme tags. Fixes [#3](https://github.com/stephenharris/wp-readme-to-markdown/issues/3). ). Thanks to @marcochiesi.

### 0.9.0
Add support for code blocks in WordPress readme (with caveat, see [#7](https://github.com/stephenharris/wp-readme-to-markdown/issues/7). )

### 0.8.0
Add `screenshot_url` option

### 0.7.0
Handle new lines in a "OS-agnostic" way. Fixes [#4](https://github.com/stephenharris/wp-readme-to-markdown/issues/4).
Added unit tests
Linted code

### 0.6.0
Fix bug where plug-in name has multiple spaces: replace all spaces with hypens.

### 0.5.0
Fixes bug where screenshots section is missing

### 0.4.0
Don't capture new lines when wrapping in asterisks.

### 0.3.0
Fixes bug with semicolon present in lists.

### 0.2.0
Ensure contributors, donate link, etc have their own line.

### 0.1.0
Initial release
