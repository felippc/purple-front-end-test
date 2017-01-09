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
  styles: [yeoman.app + '/styles/**/*.scss'],
  vendorcss: [
    "bower_components/bootstrap/dist/css/bootstrap.css",
    "bower_components/bootstrap/dist/css/bootstrap-theme.css"
  ],
  test: ['test/spec/**/*.js'],
  testRequire: [
    yeoman.app + '/bower_components/angular/angular.js',
    yeoman.app + '/bower_components/angular-mocks/angular-mocks.js',
    yeoman.app + '/bower_components/angular-resource/angular-resource.js',
    yeoman.app + '/bower_components/angular-cookies/angular-cookies.js',
    yeoman.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    yeoman.app + '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

gulp.task('e2e', function(done) {
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

var styles = lazypipe()
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })
  //.pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, yeoman.dist + '/styles');

///////////
// Tasks //
///////////

gulp.task('styles', ['vendorcss'], function() {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('rev-and-inject', ['vendorcss'], function() {
  // existing rev-and-inject task
});

gulp.task('vendorcss', function() {
  return gulp
    // set source
    .src(paths.vendorcss)
    // write to vendor.min.css
    .pipe(concat('vendor.min.css'))
    // write to dest
    .pipe(gulp.dest(yeoman.dist + '/styles'));
});

gulp.task('lint:scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(lintScripts())
    .pipe(gulp.dest(yeoman.dist + '/scripts'));
});

gulp.task('clean:tmp', function(cb) {
  rimraf('./.tmp', cb);
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

  // var sourcePath = path.join(__dirname, yeoman.dist);
  // var port = 9000;
  // var serveFromPath = '/'//+ config.paths.buildPrefix;

  // connect()
  //   .use(serveStatic(sourcePath))
  //   .listen(port);
});

gulp.task('start:server:test', function() {
  $.connect.server({
    root: ['test', yeoman.app, yeoman.dist],
    livereload: true,
    port: 9001
  });
});

gulp.task('watch', function() {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts());

  gulp.watch('bower.json', ['bower']);
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

gulp.task('test', ['start:server:test'], function() {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

// inject bower components
gulp.task('bower', function() {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: './bower_components',
      ignorePath: '..'
    }))
    .pipe(gulp.dest(yeoman.dist));
});

///////////
// Build //
///////////

gulp.task('webpack', function(callback) {
  //return gulp.src(yeoman.app)
  //  .pipe(webpack( require('./webpack.config.js') ))
  //  .pipe(gulp.dest( yeoman.dist + '/scripts/'));
  webpack(require('./webpack.config.js'), function() {
    callback();
  });
});

gulp.task('clean:dist', function(cb) {
  rimraf(yeoman.dist, cb);
});

gulp.task('client:build', ['html', 'styles'], function() {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(paths.views.main)
    .pipe($.useref({
      searchPath: [yeoman.app, '.tmp']
    }))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({
      cache: true
    }))
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('html', function() {
  return gulp.src(yeoman.app + '/views/**/*')
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('images', function() {
  return gulp.src(yeoman.app + '/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function() {

  gulp.src('bower_components/bootstrap/dist/css/*', {
      cwd: '.'
    })
    .pipe(gulp.dest(yeoman.dist + '/styles/vendors'));
  return gulp.src(yeoman.app + '/*/.*', {
      dot: true
    })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function() {
  return gulp.src(yeoman.app + '/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function() {
  runSequence(['webpack', 'images', 'copy:extras', 'copy:fonts', 'client:build']);
});

gulp.task('default', ['build']);