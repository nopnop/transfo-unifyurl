# transfo-unifyurl

> A [grunt-transfo](https://npmjs.org/package/grunt-transfo) stream function to copy (and transform) all relative assets along css files.

## Functionalities overview

  - **Usefull to copy/concat third-party stylesheets**
  - Copy along css all relative assets (images, fonts, ...)
  - Update `url()` to target the copied asset
  - Use md5 hash to prevent assets name collision


## Installation


```shell
npm install transfo-unifyurl --save-dev
```

See too [grunt-transfo](https://npmjs.org/package/grunt-transfo)

## Usage


```js
grunt.initConfig({
  transfo: {
    // This is a concat task. grunt-transfo allow copy task too
    concat_css: {
      src: ['src/**/*.css'],
      dest: 'build/css/compiled.css',
      options: {
        // Add unifyurl to the transformation pipeline
        transforms: [require('unifyurl')],
        // Set unifyurl options (below the default options):
        unifyurl: {
          // Assets destination: relative to the css destination path.
          dest:       './',

          // Url to the destination (default is a resolved
          // relative path based on dest value)
          url:        null,

          // List source extension to process. Other sources are ignored.
          extensions: ['.css']
        },
      },
    },
  },
})
```
