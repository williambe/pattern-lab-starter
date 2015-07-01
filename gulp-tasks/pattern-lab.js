'use strict';
var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function (gulp, mod, config, tasks) {
  tasks.compile.push('plBuild');
  tasks.watch.push('watch:pl');

  gulp.task('plBuild', function (cb) {
    
    function plBuild(cb) {
      exec("php " + config.plDir + "core/builder.php --generate --nocache", function (err, stdout, stderr) {
        if (err) {return cb(err);}
        if (stderr) {mod.gutil.log(stderr);}
        if (stdout) {mod.gutil.log(stdout);}
        cb();
      });
    }

    // Need to check if `public/` exists yet - i.e. is this first run?
    fs.exists(config.plDir + "public/styleguide/html/styleguide.html", function (exists) {
      if (exists) {
        plBuild(cb);
      } else {
        // It's a first run; let's make the directory and copy the initial styleguide folder out of core and into public or we'll get errors.
        exec("mkdir -p " + config.plDir + "public/styleguide/ && cp -r " + config.plDir + "core/styleguide/ " + config.plDir + "public/styleguide/", function (err, stdout, stderr) {
          if (err) {return cb(err);}
          if (stderr) {mod.gutil.log(stderr);}
          plBuild(cb);
        });
      }
    });
    
  });

  gulp.task('watch:pl', ['plBuild'], function () {
    return gulp.watch(config.plDir + 'source/**/*.{mustache,json}', [
      'plBuild'
    ]);
  });

};
