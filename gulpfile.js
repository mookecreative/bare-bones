// Vars
var gulp           = require('gulp');
    browserSync    = require('browser-sync').create();
    minifyCSS      = require('gulp-minify-css'),
    concat         = require('gulp-concat')
    uglify         = require('gulp-uglify')
    prefix         = require('gulp-autoprefixer')
    sass           = require('gulp-sass');
    mainBowerFiles = require('main-bower-files');
    watch          = require('gulp-watch');

// gulp-sass
gulp.task('sass', function(){
    return gulp.src('inc/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('inc/css/src'))
    .pipe(prefix('last 2 versions'))
    .pipe(concat('main.min.css')) // concatinated css file inc/css/main.css
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist')) // minified css file dist/main.min.css
    .pipe(browserSync.reload({
      stream: true // watched by BrowserSync
    }))
});

// main-bower-files - used as a src for the task, usually you pipe stuff through a task
gulp.task('bower', function() {
  return gulp.src(mainBowerFiles())
    // Pipe it to wanted directory
    .pipe(gulp.dest('inc/js/libs')) // only js currently
});

// gulp-concat & gulp-uglify
gulp.task('concat', function () {
  gulp.src(['inc/js/libs/*.js' , 'inc/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('inc/js/src')); // inc/js/src/main.js

  gulp.src(['inc/js/libs/*.js' , 'inc/js/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist')); // dist/main.min.js
});

// browser-sync
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://grunt-to-gulp-rebuild:8888/", // http://local.dev/ Replace this with your local dev environment to work with BrowserSync local host
    watchTask: true,
  })
});

// gulp-watch
gulp.task('watch', ['browserSync', 'sass', 'concat', 'bower'], function (){
  gulp.watch('inc/scss/**/*.scss', ['sass']);
  gulp.watch('inc/js/*.js', ['concat']);
  gulp.watch('bower_components/**', ['bower']);
  gulp.watch('inc/js/**/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.php', browserSync.reload);
});
