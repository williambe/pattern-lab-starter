'use strict';
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer-core'),
  scsslint = require('gulp-scss-lint'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  config = yaml.safeLoad(fs.readFileSync('Gruntconfig.yml', 'utf8'));

gulp.task('styles', function () {
  return gulp.src(config.scssDir + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss(
      [
        autoprefixer({
          browsers: [
            'last 2 versions'
          ]
        })
      ]
    ))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

gulp.task('styles:watch', ['styles'], function () {
  return gulp.watch(config.scssDir + '**/*.scss', [
    'styles',
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

gulp.task('build', ['compile']);
gulp.task('compile', ['styles', 'scsslint']);
gulp.task('default', ['compile', 'styles:watch']);
