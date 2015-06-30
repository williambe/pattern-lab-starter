'use strict';
module.exports = function (gulp, mod, config, tasks) {
  tasks.watch.push('watch:css');
  tasks.compile.push('css');
  
  gulp.task('css', function () {
    return gulp.src(config.scssDir + '**/*.scss')
      .pipe(mod.sourcemaps.init())
      .pipe(mod.sass({
        outputStyle: 'expanded'
      }).on('error', mod.sass.logError))
      .pipe(mod.postcss(
        [
          mod.autoprefixer({
            "browsers": [
              'last 2 versions'
            ]
          })
        ]
      ))
      .pipe(mod.sourcemaps.write())
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
      .pipe(mod.scsslint({
        'config': '.scss-lint.yml',
        'bundleExec': true
      }));
  });

};
