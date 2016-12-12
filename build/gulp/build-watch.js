var build = require('./build');
var galv = require('galvatron');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpWebserver = require('gulp-webserver');
var del = require('del');

module.exports = gulp.series(
  build,
  function () {
    var opts = gat.opts();
    // browserSync.init({
    //     proxy: 'localhost:8000'
    // });
    gulp.watch([
      'node_modules/kickflip/src/**',
      'node_modules/kickflip/node_modules/skatejs-dom-diff/lib/**',
      'node_modules/kickflip/node_modules/skatejs-named-slots/lib/**',
      'src/**'
    ], build).on('change', galv.cache.expire)
      // .on('change', function(){
      //   setTimeout(function(){
      //     browserSync.reload();
      //   }, 2000);
      // })
      .on('error', function (error) {
        console.error(error);
      });
    return gulp.src('dist').pipe(gulpWebserver({
      host: opts.host,
      port: 8000,
      livereload: false,
      open: false//,
      // proxies: [{
      //   source: '/api',
      //   target: 'https://helix-dev.heffron-it.com.au'
      // }]
    }));
  }
);
