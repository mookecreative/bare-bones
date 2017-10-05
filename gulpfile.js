
// https://css-tricks.com/gulp-for-beginners/

var gulp        = require('gulp');
    sass        = require('gulp-sass');
    browserSync = require('browser-sync').create();
    concat      = require('gulp-concat');
    // useref      = require('gulp-useref');
    uglify      = require('gulp-uglify');
    pump        = require('pump');
    // rename      = require("gulp-rename");
    // flatten     = require('gulp-flatten');
    cssnano     = require('gulp-cssnano');

// gulp.task('task-name', function() {
//   // Stuff here
// });

// Gulp Sass
gulp.task('sass', function() {
  return gulp.src('inc/scss/**/*.scss') // Source files - Gets all files ending with .scss in inc/scss
    .pipe(sass())
    .pipe(gulp.dest('inc/css')) // Destination of source file
    .pipe(browserSync.reload({
      stream: true // watched by BrowserSync
    }))
});

// Cssnano
// gulp.task('default', function() {
//   return gulp.src('inc/css/main.css')
//     .pipe(cssnano())
//     .pipe(gulp.dest('.inc/css/dist/'));
// });

// JS - useref and uglify
// gulp.task('useref', function(){
//   return gulp.src('inc/js/*.js') // Source
//     .pipe(useref())
//     // Minifies only if it's a JavaScript file
//     .pipe(gulpIf('*.js', uglify()))
//     .pipe(gulp.dest('inc/js/dist')) // Destination
// });

// JS Concat
gulp.task('concat', function() {
  return gulp.src('inc/js/*.js') // 'inc/js/libs/*.js', // bower
    .pipe(concat('main.js')) // File to concat all js files
    .pipe(gulp.dest('inc/js/src/')); // Location of files
});

// JS uglify
gulp.task('uglify', function (cb) {
  pump([
      gulp.src('inc/js/src/main.js'), // Source
      uglify(),
      gulp.dest('inc/js/dist') // Destination
    ],
    cb
  );
});

// rename via string
// gulp.src("inc/js/dist/main.js")
//   .pipe(rename("js/dist/main.min.js"))
//   .pipe(gulp.dest("./dist")); // inc/js/dist/main.min.js

// Gulp Flattern
// gulp.src(['inc/js/src/*.css'])
//   .pipe(flatten({ includeParents: 1} ))
//   .pipe(gulp.dest('inc/js/dist/'));

// BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://grunt-to-gulp-rebuild:8888/", // http://local.dev/ Replace this with your local dev environment to work with BrowserSync local host
    watchTask: true,
  })
});

// Gulp Watch
gulp.task('watch', ['browserSync', 'sass', 'concat', 'uglify'], function (){
  gulp.watch('inc/scss/**/*.scss', ['sass']);
  gulp.watch('inc/js/*.js', ['concat']);
  // gulp.watch('inc/js/dist/*.js', ['uglify']);
  gulp.watch('inc/js/**/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.php', browserSync.reload);
});
