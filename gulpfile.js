// Generated on 2017-01-06 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var webpack = require('webpack');
var serveStatic = require('serve-static');
var concat = require('gulp-concat');
var connect = require('connect');
var path = require('path');
var protractor = require("gulp-protractor").protractor;

var yeoman = {
  app: require('./bower.json').appPath || 'src/main/webapp/app',
  dist: 'src/main/webapp/dist'
};

var paths = {
  scripts: [yeoman.app + '/scripts/**/*.js'],
  testRequire: [
    yeoman.app + '/bower_components/angular/angular.js',
    yeoman.app + '/bower_components/angular-route/angular-route.js'
  ],
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

gulp.task('e2e-test', function(done) {
  var args = ['--baseUrl', 'http://localhost:9001'];
  gulp.src(["./test/protractor/*.js"])
    .pipe(protractor({
      configFile: "protractor.config.js",
      args: args
    }))
    .on('error', function(e) { throw e; });
});

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

///////////
// Tasks //
///////////

gulp.task('lint:scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(lintScripts())
    .pipe(gulp.dest(yeoman.dist + '/scripts'));
});

gulp.task('start:client', ['start:server'], function() {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.app, yeoman.dist],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  });
});

gulp.task('watch', function() {
  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());
  gulp.watch('bower.json', ['bower']);
  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());
});

gulp.task('serve', function(cb) {
  runSequence('build', ['lint:scripts'], ['start:client'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

///////////
// Build //
///////////

gulp.task('webpack', function(callback) {
  webpack(require('./webpack.config.js'), function() {
    callback();
  });
});

gulp.task('clean:dist', function(cb) {
  rimraf(yeoman.dist, cb);
});

gulp.task('client:build', ['html'], function() {
  var jsFilter = $.filter('**/*.js');

  return gulp.src(paths.views.main)
    .pipe($.useref({
      searchPath: [yeoman.app, '.tmp']
    }))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe(jsFilter.restore())
    .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('html', function() {
  return gulp.src(yeoman.app + '/views/**/*')
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('copy:extras', function() {
  return gulp.src(yeoman.app + '/*/.*', {
      dot: true
    })
    .pipe(gulp.dest(yeoman.dist));
});


gulp.task('build', ['clean:dist'], function() {
  runSequence(['webpack', 'copy:extras', 'client:build']);
});

gulp.task('default', ['build']);
