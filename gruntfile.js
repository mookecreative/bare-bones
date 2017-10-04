module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatinates bower files into main structure
        bower_concat: {
         all: {
           dest: {
            'js': 'inc/js/libs/bower.js',
            'css': 'inc/scss/external/_bower.scss'
           },
           dependencies: {
             'underscore': 'jquery',
           },
           bowerOptions: {
             relative: false
           }
         }
       },

        // Compiles all js files into one
        concat: {
            dist: {
                src: [
                    'inc/js/libs/*.js', // bower
                    'inc/js/*.js',
                ],
                dest: 'inc/js/src/main.js',
            }
        },

        // Minifis file
        uglify: {
            build: {
                src: 'inc/js/src/main.js',
                dest: 'inc/js/dist/main.min.js'
            }
        },

        // Compile Sass
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'inc/css/main.css': 'inc/scss/main.scss'
            }
          }
        },

        // Minifis css
        cssmin: {
          options: {
            'processImport': false
          },
          my_target: {
            src: 'inc/css/*.css',
            dest: 'inc/css/dist/main.min.css'
          }
        },

        // Shows popups
        notify: {
            cssmin:{
                options:{
                    title: "CSS",
                    message: "Files have been compiled successfully"
                }
            },
            uglify:{
                options:{
                    title: "Javascript",
                    message: "Files have been compiled successfully"
                }
            },
        },

        // Watches files being saved, automatically updates
        watch: {
            scripts: {
                files: ['inc/js/**/*.js'],
                tasks: ['concat', 'uglify', 'notify:uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['inc/scss/**/*.scss'],
                tasks: ['sass', 'cssmin', 'notify:cssmin']
            }
        },

        // BrowserSync
        browserSync: {
           dev: {
               bsFiles: {
                   src : [
                      'inc/css/dist/main.min.css',
                      'inc/js/dist/main.min.js',
                      '/*.html',
                      '/*.php'
                   ]
               },
               options: {
                    proxy: "http://local.dev/", // Replace this with your local dev environment to work with BrowserSync local host
                    watchTask: true,
                    // server: './'
               }
           }
       }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['bower_concat', 'concat', 'uglify', 'sass', 'cssmin', 'browserSync', 'watch']);

};
