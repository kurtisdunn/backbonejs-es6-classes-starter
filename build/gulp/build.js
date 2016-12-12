var galv = require('galvatron');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var gulpSass = require('gulp-sass');
var gulpMinifyCss = require('gulp-clean-css');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');

module.exports = gulp.parallel(
  function () {
    return gulp.src('node_modules/jquery/dist/jquery.js').pipe(gulp.dest('dist'));
  },
  function () {
    var filterIcons = gulpFilter('{**/*,*}.?(eot|svg|ttf|woff|woff2)', { restore: true });
    var filterSass = gulpFilter('{**/*,*}.{css,scss}', { restore: true });
    var filterJs = gulpFilter('{**/*,*}.js', { restore: true });
    var filterNoBabel = gulpFilter([
      '**',
      '!**/moment/**'
    ], { restore: true });

    return galv.trace('src/lib/index.js')
      .createStream()
      // Scripts.
      .pipe(filterJs)
      .pipe(filterNoBabel)
      .pipe(galv.cache('babel', gulpBabel({'presets': ['es2015']})))
      .pipe(filterNoBabel.restore)
      .pipe(galv.cache('globalize', galv.globalize()))
      .pipe(gulpDebug({ title: 'js' }))
      .pipe(gulpConcat('index.js'))
      //.pipe(gulpUglify())
      .pipe(filterJs.restore)

    //  Styles.
      .pipe(filterSass)
      .pipe(galv.cache('scss', gulpSass()))
      .pipe(gulpDebug({ title: 'scss' }))
      .pipe(gulpConcat('index.css'))
      //.pipe(gulpMinifyCss())
      .pipe(filterSass.restore)

      // Flatten all files into `dist`.
      .pipe(gulpRename({ dirname: '.' }))

      // Icons must be in `dist/fonts`.
      // .pipe(filterIcons)
      // .pipe(gulpRename({ dirname: 'fonts' }))
      // .pipe(gulpDebug({ title: 'icons' }))
      // .pipe(filterIcons.restore)
      // Write to `dist`.
      .pipe(gulp.dest('dist'));
  }
);
