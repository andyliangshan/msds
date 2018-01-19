import gulp from 'gulp';
import gulpIconfont from 'gulp-iconfont';
import gulpIconfontCss from 'gulp-iconfont-css';

function iconify() {
  return new Promise(resolve => {
    gulp.src('public/img/svgs/*.svg')
      .pipe(gulpIconfontCss({
        fontName: 'msds',
        path: 'public/less/_icons.less',  //  使用的模板less文件
        targetPath: '../less/icons.less', //  生成的目标less文件
        fontPath: '../fonts/',            //  生成字体文件目录
      }))
      .pipe(gulpIconfont({
        fontName: 'msds',
      }))
      .pipe(gulp.dest('public/css/fonts/'))
      .pipe(gulp.dest('build/public/fonts/'))
      .on('end', () => resolve()); //  会在build 生成定义的 targetPath指定的less/icons.less文件，可忽略

    // return resolve(gulp.src('public/img/svgs/*.svg')
    //   .pipe(gulpIconfontCss({
    //     fontName: 'msds',
    //     path: 'public/less/_icons.less',  //  使用的模板less文件
    //     targetPath: '../less/icons.less', //  生成的目标less文件
    //     fontPath: '../fonts/',            //  生成字体文件目录
    //   }))
    //   .pipe(gulpIconfont({
    //     fontName: 'msds',
    //   }))
    //   .pipe(gulp.dest('public/fonts/'))
    //   .pipe(gulp.dest('build/public/fonts/'))); //  会在build 生成定义的 targetPath指定的less/icons.less文件，可忽略
  });
}

export default iconify;
