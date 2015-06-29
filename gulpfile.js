'use strict';
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer-core'),
  scsslint = require('gulp-scss-lint'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  exec = require('child_process').exec,
  config = yaml.safeLoad(fs.readFileSync('Gruntconfig.yml', 'utf8'));

gulp.task('css', function () {
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

gulp.task('plBuild', function(cb) {
  exec("php " + config.plDir + "core/builder.php --generate --nocache", function(err, stdout, stderr) {
    if (err) return cb(err);
    if (stderr) gutil.log(stderr);
    if (stdout) gutil.log(stdout);
    cb();
  });
});

gulp.task('watch:pl', ['plBuild'], function() {
  return gulp.watch(config.plDir + 'source/**/*.{mustache,json}', [
    'plBuild'
  ]);
});

gulp.task('build', ['compile']);
gulp.task('compile', ['css', 'scsslint', 'plBuild']);
gulp.task('watch', ['watch:css', 'watch:pl']);
gulp.task('default', ['compile', 'watch:css']);
