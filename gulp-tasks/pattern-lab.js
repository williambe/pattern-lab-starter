'use strict';
module.exports = function (gulp, mod, config, tasks) {
  tasks.compile.push('plBuild');
  tasks.watch.push('watch:pl');
  
  gulp.task('plBuild', function (cb) {
    mod.exec("php " + config.plDir + "core/builder.php --generate --nocache", function (err, stdout, stderr) {
      if (err) return cb(err);
      if (stderr) mod.gutil.log(stderr);
      if (stdout) mod.gutil.log(stdout);
      cb();
    });
  });

  gulp.task('watch:pl', ['plBuild'], function () {
    return gulp.watch(config.plDir + 'source/**/*.{mustache,json}', [
      'plBuild'
    ]);
  });
};
