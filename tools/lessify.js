/**
 * Created by noodles on 2017/3/29.
 * description
 */
import gulp from 'gulp';
import gulpNotify from 'gulp-notify';
import gulpLess from 'gulp-less';
import gulpPlumber from 'gulp-plumber';
import LessPluginCleanCSS from 'less-plugin-clean-css';
import LessPluginAutoPrefix from 'less-plugin-autoprefix';

const cleancss = new LessPluginCleanCSS({ advanced: true });
const autoprefix = new LessPluginAutoPrefix({ browsers: ['last 2 versions'] });

const handleError = gulpNotify.onError({
  title: 'Gulp Error: <%= error.plugin %>',
  message: '<%= error.name %>: <%= error.toString() %>',
});

function lessify(lessfile) {
  const files = lessfile || ['./public/less/**/*.less', '!./public/less/_*.less', '!./public/less/**/*_*.less'];
  const distFile = `./build/${lessfile}`.replace('less', 'css');  //  ./build/public/css/usa/usaCollege.less
  const distFileDir = distFile.split('/').slice(0, distFile.split('/').length - 1).join('/'); //  ./build/public/css/usa
  const dist = lessfile ? distFileDir : './build/public/css';

  return new Promise(resolve => {
    gulp.src(files)
      .pipe(gulpPlumber().on('error', handleError))
      .pipe(gulpLess({
        plugins: [autoprefix, cleancss],
      }).on('error', handleError))
      .pipe(gulp.dest(dist))
      .on('end', () => resolve());

    // return resolve(gulp.src(['./public/less/**/*.less', '!./public/less/_*.less', '!./public/less/**/*_*.less'])
    //   .pipe(gulpPlumber().on('error', handleError))
    //   .pipe(gulpLess({
    //     plugins: [autoprefix, cleancss],
    //   }).on('error', handleError))
    //   .pipe(gulp.dest('./build/public/css')));
  });
}

export default lessify;
