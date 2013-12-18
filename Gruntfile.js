/*
 * grunt-transfo
 * https://github.com/nopnop/grunt-transfo
 *
 * Copyright (c) 2013 Jean Ponchon
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'index.js',
        'test/unifyurl_test.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      transfo: ['tmp', 'build'],
    },

    // Configuration to be run (and then tested).
    transfo: {

      default_options: {
        src:  ['test/fixtures/**/*.css'],
        dest: 'build/default_options/style.css',
        options: {
          // Add 'transfo-unifyurl' to the transformation pipeline
          //        : require('transfo-unifyurl')
          transforms: [require('./index.js')]
        }
      },

      custom_options: {
        src:  ['test/fixtures/**/*.css'],
        dest: 'build/custom_options/style.css',
        options: {
          // Add 'transfo-unifyurl' to the transformation pipeline
          //        : require('transfo-unifyurl')
          transforms: [require('./index.js')],
          unifyurl: {
            dest: './assets',
            extensions: ['.css']
          }
        }
      },

      custom_options_url: {
        src:  ['test/fixtures/**/*.css'],
        dest: 'build/custom_options_url/style.css',
        options: {
          // Add 'transfo-unifyurl' to the transformation pipeline
          //        : require('transfo-unifyurl')
          transforms: [require('./index.js')],
          unifyurl: {
            url:  'http://static.foobar.com'
          }
        }
      },
    },


    // Unit tests.
    nodeunit: {
      transfo: ['test/unifyurl_test.js'],
    },

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-transfo');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'transfo', 'nodeunit']);


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
