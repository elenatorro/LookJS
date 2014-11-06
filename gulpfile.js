/********* Variables *********/
/** Paths **/
var destinationPath = 'testpage';
var assetsPath = '/assets'
var styleRootPath = 'less'
var styleDestPath = destinationPath + assetsPath + '/css';
var scriptRootPath = 'lib'
var scriptDestPath = destinationPath + assetsPath + '/scripts';
var viewPath = destinationPath + '/views'

/** Extensions **/
var styleRootExtension = '/*.less'
var styleDestExtension = '/*.css'
var scriptExtension = '/*.js'

/********* Dependencies *********/
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');

/************* Files *************/
gulp.task('scripts', function() {
    return gulp.src(scriptRootPath + scriptExtension)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(scriptDestPath))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(scriptDestPath));
});

/************* Others *************/
gulp.task('lint', function() {
    return gulp.src(scriptRootPath + scriptExtension)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('style', function () {
  gulp.src(styleRootPath + styleRootExtension)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(styleDestPath));
});

gulp.task('default', ['lint', 'style', 'scripts']);
