'use strict';
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // var rootPath = process.cwd().split("/");
  // rootPath = rootPath[rootPath.length - 1];
    // console.log(rootPath);

  // Project configuration.
  grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),

    banner: '/*! Valentino4Gov <%= grunt.template.today("mm-dd-yy HH:MM:ss") %> */\n\n',

    dir: {
      src     : 'src',
      prod    : 'dist'
    },

    //deletes contents of directory
    clean: {
      prod: [
        "<%= dir.prod %>/**/*.js",
        "<%= dir.prod %>/**/*.css",
        "<%= dir.prod %>/**/*.jpg",
        "<%= dir.prod %>/**/*.gif",
        "<%= dir.prod %>/**/*.png",
        "<%= dir.prod %>/**/*.php",
        "<%= dir.prod %>/**/*.html",
        "<%= dir.prod %>/**/*.svg"
        // "<%= dir.prod %>/**/*.ogv",
        // "<%= dir.prod %>/**/*.webm",
        // "<%= dir.prod %>/**/*.mp4"
      ]
    },
    sass: {
      prod: {
        options: {
          style: 'nested',
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: '<%= dir.src %>/scss',
          src: ['*.scss'],
          dest: '<%= dir.prod %>/css',
          ext: '.css'
        }]
      }
    },

    //concatenates multiple files into one
    concat: {
      js: {
        options: {
          banner: '<%= banner %>',
          separator: ';',
        },
        files: {

          '<%= dir.prod %>/js/global-scripts-head.js': [
            '<%= dir.src %>/js/vendor/jquery-3.2.1.min.js',
            '<%= dir.src %>/js/vendor/jquery-migrate-3.0.0.min.js',
            '<%= dir.src %>/js/vendor/modernizr.js'
          ],
          '<%= dir.prod %>/js/global-scripts-tail.js': [
            // '<%= dir.src %>/js/vendor/jquery.waypoints.min.js',
            '<%= dir.src %>/js/main.js'
          ]
        }
      }
    },

    //minifies files
    uglify: {
      js: {
        files: {
          // '<%= dir.dev %>/js/global-scripts-head.js': ['<%= dir.dev %>/js/global-scripts-head.js'],
          '<%= dir.prod %>/js/global-scripts-head.js': ['<%= dir.prod %>/js/global-scripts-head.js'],
          // '<%= dir.dev %>/js/global-scripts-tail.js': ['<%= dir.dev %>/js/global-scripts-tail.js'],
          '<%= dir.prod %>/js/global-scripts-tail.js': ['<%= dir.prod %>/js/global-scripts-tail.js']
        }
      }
    },
    //makes production html files from templates and includes
    includes: {
      prod: {
        cwd: 'page_templates/',
        src: [ '**/*.html', '**/*.php'],
        dest: '<%= dir.prod %>/',
        options: {
          includePath: 'includes'
        }
      }
    },
    copy: {
      prod: {
        expand: true,
        cwd: '<%= dir.src %>/img',
        src: ['**'],
        dest: '<%= dir.prod %>/img'
      },
      data: {
        expand: true,
        cwd: '<%= dir.src %>/data',
        src: ['**'],
        dest: '<%= dir.prod %>/data'
      }
      //
      // video: {
      //   expand: true,
      //   cwd: '<%= dir.src %>/video',
      //   src: ['**'],
      //   dest: '<%= dir.prod %>/video'
      // }
    },
    //watches files and runs tasks when files are saved
    watch: {
      html: {
        files: ['page_templates/**', 'includes/**'],
        tasks: ['includes']
      },
      css: {
        files: ['<%= dir.src %>/scss/**/*.scss'],
        tasks: ['autoprefixer', 'sass', 'copy']
      },
      js: {
        files: ['<%= dir.src %>/js/**/*.js'],
        tasks: ['concat:js' , 'uglify:js', 'copy']
      },
      copy: {
        files: ['<%= dir.src %>/img/**',
                '<%= dir.src %>/data/**',
                '<%= dir.src %>/'],
        tasks: ['copy']
      },
      sassdoc: {
        files: ['<%= dir.src %>/scss/**/*.scss'],
        tasks: ['sassdoc']
      }
    },
    browserSync: {
      server: "dist",
      options: {
        ui: false,
        watchTask: true,
        proxy: 'valentino/',
        port: 3010
      },
      develop: {
        bsFiles: {
          src: [
            '<%= dir.prod %>/*.php',
            '<%= dir.prod %>/*.html',
            '<%= dir.prod %>/**/*.css',
            '<%= dir.prod %>/**/*.js'
          ]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', '> 1%', 'ie 9']
      },
      develop: {
        files: [{
          expand: true,
          cwd: '<%= dir.src %>/scss',
          src: '{,*/}*.css',
          dest: '<%= dir.prod %>/css'
        }]
      }
    },
    sassdoc: {
      default: {
        src: '<%= dir.src %>/scss/**/*.scss',
        options: {
          dest: 'sassdoc',
          verbose: true,
          display: {
            access: ['public'],
            alias: false,
            watermark: true
          },
        },
      }
    }
  });

  // grunt.loadNpmTasks('grunt-includes');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-sassdoc');
  // grunt.loadNpmTasks('grunt-sass');
  // grunt.loadNpmTasks('grunt-browser-sync');

  //tasks
  grunt.registerTask('build', ['clean', 'copy', 'sass', 'includes', 'concat:js', 'uglify:js', 'sassdoc']);
  grunt.registerTask('develop', function() {
    var tasks = ['browserSync:develop', 'watch'];
    grunt.task.run(tasks);
  });
  grunt.registerTask('default', ['watch', 'browserSync:develop']);
};