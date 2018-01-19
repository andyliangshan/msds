/* eslint object-shorthand: 0 */
import gulp from 'gulp';
import revReplace from 'gulp-rev-replace';

const manifest = gulp.src('build/public/rev-manifest.json');

function revplacify() {
  return new Promise(resolve => {
    gulp.src(
      [
        'build/views/**/*.ejs',
        'build/public/css/**/*',
      ],
      { base: 'build' },
    ).pipe(revReplace({
      manifest: manifest,
      replaceInExtensions: ['.css', '.js', '.html', '.ejs'],
    }))
      .pipe(gulp.dest('build'))
      .on('end', () => resolve());

    // return resolve(gulp.src(
    //   [
    //     'build/views/**/*.ejs',
    //     'build/public/css/**/*',
    //   ],
    //   { base: 'build' },
    // ).pipe(revReplace({
    //   manifest: manifest,
    //   replaceInExtensions: ['.css', '.js', '.html', '.ejs'],
    // }))
    //   .pipe(gulp.dest('build')));
  });
}

export default revplacify;
