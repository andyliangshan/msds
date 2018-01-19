import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import run from './tools/run';
import clean from './tools/clean';
import copy from './tools/copy';
import lessify from './tools/lessify';
import imgify from './tools/imgify';
import iconify from './tools/iconify';
import revify from './tools/revify';
import bundle from './tools/bundle';
import cdnify from './tools/cdnify';

const $ = gulpLoadPlugins();

gulp.task('clean', async () => {
  await run(clean);
});

gulp.task('copy', async () => {
  await run(copy);
});

gulp.task('imagemin', async () => {
  await run(imgify);
});

gulp.task('iconify', async () => {
  await run(iconify);
});

gulp.task('lessify', async () => {
  await run(lessify);
});

gulp.task('bundle', async () => {
  await run(bundle);
});

gulp.task('revify', async () => {
  await run(revify);
  $.wait(2);
});

gulp.task('cdnify', async () => {
  await run(cdnify);
});

gulp.task('revReplace', () => {
  const manifest = gulp.src('build/public/rev-manifest.json');
  return gulp.src([
    'build/views/**/*.ejs',
    'build/public/js/**/*',
    'build/public/css/**/*'],
    { base: 'build' },
  )
    .pipe($.revReplace({
      manifest,
      replaceInExtensions: ['.js', '.css', '.html', '.ejs'],
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', () => {
  runSequence(
    'clean',
    'copy',
    'imagemin',
    'iconify',
    'lessify',
    'bundle',
    'revify',
    'revReplace',
    'cdnify',
  );
});
