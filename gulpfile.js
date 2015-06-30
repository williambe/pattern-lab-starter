'use strict';

var mod = {},
  gulp = require('gulp');
mod.gulp = gulp;
mod.gutil = require('gulp-util');
mod.sass = require('gulp-sass');
mod.sourcemaps = require('gulp-sourcemaps');
mod.postcss = require('gulp-postcss');
mod.autoprefixer = require('autoprefixer-core');
mod.scsslint = require('gulp-scss-lint');
mod.yaml = require('js-yaml');
mod.fs = require('fs');
mod.exec = require('child_process').exec;
var config = mod.yaml.safeLoad(mod.fs.readFileSync('Gruntconfig.yml', 'utf8'));

require('./gulp-tasks/css.js')(gulp, mod, config);

gulp.task('plBuild', function(cb) {
  mod.exec("php " + config.plDir + "core/builder.php --generate --nocache", function(err, stdout, stderr) {
    if (err) return cb(err);
    if (stderr) mod.gutil.log(stderr);
    if (stdout) mod.gutil.log(stdout);
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
