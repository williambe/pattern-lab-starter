'use strict';

var mod = {};
var gulp = require('gulp');
mod.gutil = require('gulp-util');
mod.yaml = require('js-yaml');
mod.fs = require('fs');
var config = mod.yaml.safeLoad(mod.fs.readFileSync('Gruntconfig.yml', 'utf8'));
var tasks = {
  "compile": [],
  "watch": [],
  "validate": []
};

if (config.css) {
  require('gulp-config-sass')(gulp, config, tasks);
}

if (config.patternLab) {
  require('gulp-config-pattern-lab')(gulp, config, tasks);
}

require('./gulp-tasks/js.js')(gulp, mod, config, tasks);

gulp.task('build', ['compile']);
gulp.task('compile', tasks.compile);
gulp.task('validate', tasks.validate);
gulp.task('watch', tasks.watch);
gulp.task('default', ['watch']);
