
// https://css-tricks.com/gulp-for-beginners/
// https://gist.github.com/atelic/8eb577e87a477a0fb411

var gulp        = require('gulp');
    browserSync = require('browser-sync').create();
    minifyCSS   = require('gulp-minify-css'),
    concat      = require('gulp-concat')
    uglify      = require('gulp-uglify')
    prefix      = require('gulp-autoprefixer')
    sass        = require('gulp-sass');


// Gulp Sass
// gulp.task('sass', function() {
//   return gulp.src('inc/scss/**/*.scss') // Source files - Gets all files ending with .scss in inc/scss
//     .pipe(sass())
//     .pipe(gulp.dest('inc/css')) // Destination of source file
//     .pipe(browserSync.reload({
//       stream: true // watched by BrowserSync
//     }))
// });

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

// JS Concat and Uglify
gulp.task('concat', function () {
  gulp.src(['inc/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('inc/js/src')); // inc/js/src/main.js

  gulp.src(['inc/js/*.js'])
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
gulp.task('watch', ['browserSync', 'sass', 'concat'], function (){
  gulp.watch('inc/scss/**/*.scss', ['sass']);
  gulp.watch('inc/js/*.js', ['concat']);
  gulp.watch('inc/js/**/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.php', browserSync.reload);
});
