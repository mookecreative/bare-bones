module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Compiles all js files into one
        concat: {
            dist: {
                src: [
                    'includes/js/*.js',
                ],
                dest: 'includes/js/scripts/main.js',
            }
        },

        // Minifis file
        uglify: {
            build: {
                src: 'includes/js/scripts/main.js',
                dest: 'includes/js/scripts/main.min.js'
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
            dest: 'includes/css/main.min.css'
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'watch']);

};
