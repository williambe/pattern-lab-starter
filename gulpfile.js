'use strict';

var mod = {};
var gulp = require('gulp');
mod.gutil = require('gulp-util');
mod.yaml = require('js-yaml');
mod.fs = require('fs');
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
