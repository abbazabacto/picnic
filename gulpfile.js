var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var express = require('gulp-express');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var KarmaServer = require('karma').Server;

var root = path.normalize(__dirname, '../');

gulp.task('default', ['serve', 'watch']);

gulp.task('serve', function(){
  //run api server
  express.run(['api/index.js'])
  
  //run dev server
  browserSync.init({
    server: {
      // Serve up our build folder
      baseDir: root
    }
  });
});

gulp.task('watch', ['build'], function(){
  watch([
    path.join(root, 'src/**/*.js')
  ], function(){
    gulp.start('babelify');
  });
  
  watch([
    path.join(root, 'sass/**/*.scss')
  ], function(){
    gulp.start('sass');
  });
  
  browserSync.watch([
    path.join(root, 'dist/*.js'),
    path.join(root, 'index.html'),
    path.join(root, 'dist/*.css')
  ]).on('change', browserSync.reload);
});

gulp.task('build', ['sass', 'babelify']);

gulp.task('sass', function(){
  return gulp.src('./sass/picnic.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('babelify', ['karma'], function () {
  return browserify({ entries: './src/picnic.js', debug: true })
    .transform('babelify', { presets: ['es2015'] })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('picnic.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});

gulp.task('test', ['karma']);

gulp.task('karma', function(done){
  new KarmaServer({
    configFile: path.join(root, 'karma.conf.js'),
    singleRun: true
  }, function(exitStatus){
    done(exitStatus ? "There are failing unit tests" : undefined);
  }).start();
});