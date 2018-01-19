/**
 * Created by noodles on 2017/3/29.
 * description
 */
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';

let isDebug = !process.argv.includes('--release');
//  线上编译时， 可根据参数 区分是否对全部图片进行压缩
//  如果只涉及 js等文件改动 可直接忽略 图片压缩   npm run imgify -- --release --add
//  使用限制说明：dist目录的图片必须是经过压缩的，否则 直接复制 的是未压缩图片
const isAddImgForBuild = process.argv.includes('--add');
console.log(isAddImgForBuild);
//  如果增加了 --add 参数，则强制 idDebug 为 true
if (isAddImgForBuild) {
  isDebug = true;
}

function imgify(imgfile) {
  const files = imgfile || 'public/img/**/*';
  const dist = imgfile || 'public/img/';
  const filesArr = [files, '!public/img/svgs/**/*'];
  return new Promise(resolve => {
    isDebug ? //  eslint-disable-line
      gulp.src(filesArr).pipe(gulp.dest('build/public/img/')).on('end', () => resolve()) :
      gulp.src(filesArr)
        .pipe(cache(imagemin({
          progressive: true,  // 类型：Boolean 默认：false 无损压缩jpg图片
          svgoPlugins: [{ removeViewBox: false }],  // 不要移除svg的viewbox属性
          use: [pngquant()], // 使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest(`build/${dist}`))
        .on('end', () => resolve());

    // return isDebug ? resolve(gulp.src(filesArr).pipe(gulp.dest('build/public/img/'))) :
    //   resolve(gulp.src(filesArr)
    //     .pipe(cache(imagemin({
    //       progressive: true,  // 类型：Boolean 默认：false 无损压缩jpg图片
    //       svgoPlugins: [{ removeViewBox: false }],  // 不要移除svg的viewbox属性
    //       use: [pngquant()], // 使用pngquant深度压缩png图片的imagemin插件
    //     })))
    //     .pipe(gulp.dest(`build/${dist}`)));
  });
}

export default imgify;
