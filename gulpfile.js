'use strict';

var mod = {};
var gulp = require('gulp');
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
var tasks = {
  "compile": [],
  "watch": []
};

if (config.css) {
  require('./gulp-tasks/css.js')(gulp, mod, config, tasks);
}

if (config.patternLab) {
  require('./gulp-tasks/pattern-lab.js')(gulp, mod, config, tasks);
}

gulp.task('build', ['compile']);
gulp.task('compile', tasks.compile);
gulp.task('watch', tasks.watch);
gulp.task('default', ['watch']);
