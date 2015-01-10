'use strict'

# -- Dependencies --------------------------------------------------------------

gulp       = require 'gulp'
gutil      = require 'gulp-util'
open       = require 'gulp-open'
concat     = require 'gulp-concat'
coffee     = require 'gulp-coffee'
header     = require 'gulp-header'
uglify     = require 'gulp-uglify'
connect    = require 'gulp-connect'
pkg        = require './package.json'

# -- Files ---------------------------------------------------------------------

path =
  core:
    src      : 'source/parrot.device.coffee'
    debug    : 'parrot.device.develop.js'
    standard : 'parrot.device.js'
    dist     : 'dist'

  dependency:
    ratio  : 'components/aspect-ratio/dist/aspect-ratio.js'
    parser : 'components/ua-parser-js/dist/ua-parser.min.js'

  test:
    src   : 'test/source/test.device.coffee'
    dist  : 'test/dist'
    index : 'test/index.html'

banner = [ "/**"
           " * <%= pkg.name %> - <%= pkg.description %>"
           " * @version v<%= pkg.version %>"
           " * @link    <%= pkg.homepage %>"
           " * @author  <%= pkg.author.name %> (<%= pkg.author.url %>)"
           " * @license <%= pkg.license %>"
           " */"
           "" ].join("\n")

# -- Tasks ---------------------------------------------------------------------

gulp.task 'develop', ->
  gulp.src path.core.src
  .pipe concat path.core.debug
  .pipe coffee().on 'error', gutil.log
  .pipe header banner, pkg: pkg
  .pipe gulp.dest path.core.dist
  .pipe connect.reload()
  return

gulp.task 'standard', ->
  dep = path.dependency
  gulp.src [dep.ratio, dep.parser, "#{path.core.dist}/#{path.core.debug}"]
  .pipe concat path.core.standard
  .pipe uglify()
  .pipe header banner, pkg: pkg
  .pipe gulp.dest path.core.dist
  .pipe connect.reload()
  return

gulp.task 'mocha', ->
  gulp.src path.test.src
  .pipe coffee().on 'error', gutil.log
  .pipe concat 'test.js'
  .pipe gulp.dest path.test.dist
  .pipe connect.reload()
  return

gulp.task 'server', ->
  connect.server
    port       : 8001
    root       : [__dirname, 'test']
    livereload : true
  return

gulp.task 'browser', ->
  gulp.src path.test.index
  .pipe open()
  return

gulp.task 'test', ->
  gulp.start ['develop', 'mocha', 'server', 'browser']
  gulp.watch path.core.src, ['develop']
  gulp.watch path.test.src, ['mocha']
  return

gulp.task 'dev', ->
  gulp.start ['develop']
  gulp.watch path.core.src, ['develop']
  return

gulp.task 'build', ->
  gulp.start ['develop', 'standard']
  return

gulp.task 'default', ->
  gulp.start 'build'
  return
