'use strict';
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var scsslint = require('gulp-scss-lint');

module.exports = function (gulp, mod, config, tasks) {
  tasks.watch.push('watch:css');
  tasks.compile.push('css');
  tasks.validate.push('scsslint');
  
  gulp.task('css', function () {
    return gulp.src(config.scssDir + '**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(postcss(
        [
          autoprefixer({
            "browsers": [
              'last 2 versions'
            ]
          })
        ]
      ))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./css'));
  });


  gulp.task('watch:css', ['css'], function () {
    return gulp.watch(config.scssDir + '**/*.scss', [
      'css',
      'scsslint'
    ]);
  });

  gulp.task('scsslint', function () {
    return gulp.src(config.scssDir + '**/*.scss')
      .pipe(scsslint({
        'config': '.scss-lint.yml',
        'bundleExec': true
      }));
  });

};
