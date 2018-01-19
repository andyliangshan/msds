import gulp from 'gulp';
import rev from 'gulp-rev';

function revify() {
  return new Promise(resolve => {
    gulp.src([
      'build/public/img/**/*',
      'build/public/css/**/*',
      'build/public/fonts/**/*',
      'build/public/js/*.js',
      'build/public/js/*.css',  //  extract-text-webpack-plugin 插件提取的css文件
    ], { base: 'build/public' })
      .pipe(rev())
      .pipe(gulp.dest('build/public/'))
      .pipe(rev.manifest({}))
      .pipe(gulp.dest('build/public/'))
      .on('end', () => resolve());

    // return resolve(gulp.src([
    //   'build/public/img/**/*',
    //   'build/public/css/**/*',
    //   'build/public/fonts/**/*',
    //   'build/public/js/*.js',
    //   'build/public/js/*.css',  //  extract-text-webpack-plugin 插件提取的css文件
    // ], { base: 'build/public' })
    //   .pipe(rev())
    //   .pipe(gulp.dest('build/public/'))
    //   .pipe(rev.manifest({}))
    //   .pipe(gulp.dest('build/public/')));
  });
}

export default revify;
