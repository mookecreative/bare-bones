/*================ Variables ================*/

var gulp           = require('gulp');
    browserSync    = require('browser-sync').create();
    minifyCSS      = require('gulp-minify-css'),
    concat         = require('gulp-concat')
    uglify         = require('gulp-uglify')
    prefix         = require('gulp-autoprefixer')
    sass           = require('gulp-sass');
    watch          = require('gulp-watch');
    plumber        = require('gulp-plumber');

/*================ gulp-sass ================*/

gulp.task('sass', function(){
  gulp.src('inc/scss/**/*.scss')
    .pipe(plumber())
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

/*================ gulp-concat & gulp-uglify ================*/

gulp.task('concat', function () {
  // inc/js/src/main.js
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/gsap/TweenlineMax.js',
    'inc/js/libs/*.js',
    'inc/js/*.js'
  ])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('inc/js/src'));

  // dist/main.min.js
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/gsap/TweenlineMax.js',
    'inc/js/libs/*.js',
    'inc/js/*.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

/*================ browser-sync ================*/

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://local.dev", // Replace this with your local dev environment to work with BrowserSync local host
    watchTask: true,
  })
});

/*================ gulp-watch ================*/

gulp.task('watch', ['browserSync', 'sass', 'concat'], function (){
  gulp.watch('inc/scss/**/*.scss', ['sass']);
  gulp.watch('inc/js/*.js', ['concat']);
  gulp.watch('inc/js/**/*.js', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.php', browserSync.reload);
});
