
// https://css-tricks.com/gulp-for-beginners/
// https://gist.github.com/atelic/8eb577e87a477a0fb411
// http://clubmate.fi/bower-and-gulp-match-made-in-heaven-also/

var gulp           = require('gulp');
    browserSync    = require('browser-sync').create();
    minifyCSS      = require('gulp-minify-css'),
    concat         = require('gulp-concat')
    uglify         = require('gulp-uglify')
    prefix         = require('gulp-autoprefixer')
    sass           = require('gulp-sass');
    mainBowerFiles = require('main-bower-files');

// Sass
gulp.task('sass', function(){
    return gulp.src('inc/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('inc/css/src'))
    .pipe(prefix('last 2 versions'))
    .pipe(concat('main.min.css')) // concatinated css file inc/css/main.css
    .pipe(minifyCSS())
    .pipe(gulp.dest('inc/css/dist')) // minified css file inc/css/dist/main.min.css
    .pipe(browserSync.reload({
      stream: true // watched by BrowserSync
    }))
});

// Bower
gulp.task('bower', function() {
  // mainBowerFiles is used as a src for the task,
  // usually you pipe stuff through a task
  return gulp.src(mainBowerFiles())
    // Then pipe it to wanted directory, I use
    // dist/lib but it could be anything really
    .pipe(gulp.dest('inc/js/libs')) // only js currently
});

// JS Concat and Uglify
gulp.task('concat', function () {
  gulp.src(['inc/js/libs/*.js' , 'inc/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('inc/js/src')); // inc/js/src/main.js

  gulp.src(['inc/js/libs/*.js' , 'inc/js/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('inc/js/dist')); // inc/js/dist/main.min.js
});

// BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://bare-bones-gulp:8888/", // http://local.dev/ Replace this with your local dev environment to work with BrowserSync local host
    watchTask: true,
  })
});

// Gulp Watch
gulp.task('watch', ['browserSync', 'sass', 'concat', 'bower'], function (){
  gulp.watch('inc/scss/**/*.scss', ['sass']);
  gulp.watch('inc/js/*.js', ['concat']);
  gulp.watch('bower_components/**', ['bower']);
  gulp.watch('inc/js/**/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.php', browserSync.reload);
});
