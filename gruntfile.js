module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatinates bower files into main structure
        bower_concat: {
         all: {
           dest: {
            'js': 'includes/js/libs/bower.js',
            'css': 'includes/scss/external/_bower.scss'
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
                    'includes/js/libs/*.js', // bower
                    'includes/js/*.js',
                ],
                dest: 'includes/js/src/main.js',
            }
        },

        // Minifis file
        uglify: {
            build: {
                src: 'includes/js/src/main.js',
                dest: 'includes/js/dist/main.min.js'
            }
        },

        // Compile Sass
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'includes/css/main.css': 'includes/scss/main.scss'
            }
          }
        },

        // Minifis css
        cssmin: {
          options: {
            'processImport': false
          },
          my_target: {
            src: 'includes/css/*.css',
            dest: 'includes/css/dist/main.min.css'
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
                files: ['includes/js/**/*.js'],
                tasks: ['concat', 'uglify', 'notify:uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['includes/scss/**/*.scss'],
                tasks: ['sass', 'cssmin', 'notify:cssmin']
            }
        },

        // BrowserSync
        browserSync: {
           dev: {
               bsFiles: {
                   src : [
                      'includes/css/dist/main.min.css',
                      'includes/js/dist/main.min.js',
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
