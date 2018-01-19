import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import pkg from '../package.json';
import run, { format } from './run';
import lessify from './lessify';
import imgify from './imgify';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  await makeDir('build');
  await Promise.all([
    writeFile('build/package.json', JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js',
        pm2: 'pm2 start server.js',
      },
    }, null, 2)),
    copyFile('LICENSE.txt', 'build/LICENSE.txt'),
    copyDir('public/domain', 'build/public'),
    copyDir('src/views', 'build/views'),
    copyDir('public/libs', 'build/public/libs'),
    copyDir('public/js/vendor', 'build/public/js/vendor'),
    copyDir('public/libs/bootstrap/fonts/', 'build/public/fonts/'),
  ]);

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch([
      'public/fonts/**/*',      //  ok
      'public/img/**/*',        //  ok
      'public/libs/**/*',       //  ok
      'public/js/vendor/**/*',  //  ok
      'src/views/**/*',         //  ok
      'public/less/**/*',
    ], { ignoreInitial: true });

    watcher.on('all', async (event, filePath) => {
      const start = new Date();
      const src = path.relative('./', filePath);
      const dist = path.join('build/', src.startsWith('src') ? path.relative('src', src) : src);
      let fileType; //  判定 less 等文件
      switch (event) {
        case 'add':
        case 'change':
          // 监听.less文件，执行编译 并 复制到build目录
          if (dist.indexOf('.less') > -1) {
            fileType = '.less';
            const realLess = dist.replace('build/', '');
            console.log('////////////....', realLess);  //  public/less/usa/usaCollege.less
            //  less 编译监控的文件分为两种：
            // 1._开头的公共文件public/less/_mixins.less etc.），会自动编译所有引用文件；2.正常的页面less文件（public/less/usa/usaCollege.less etc.），只对该页面的less执行编译
            const privateFile = realLess.split('/')[realLess.split('/').length - 1];  //  usaCollege.less or _abc.less
            if (privateFile.startsWith('_')) { //  private file
              await run(lessify);
            } else {
              await run(lessify, realLess);
            }
            break;
          }
          // 监听图片，执行压缩 并 复制到build目录
          if (/\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/.test(dist)) {
            const realImg = dist.replace('build/', '');
            await run(imgify, realImg);
            break;
          }
          await makeDir(path.dirname(dist));
          await copyFile(filePath, dist);
          break;
        case 'unlink':
        case 'unlinkDir':
          cleanDir(dist, { nosort: true, dot: true });
          break;
        default:
          return;
      }
      const end = new Date();
      const time = end.getTime() - start.getTime();

      if (fileType === '.less') {
        console.log(`[${format(end)}] ${event} '${dist.replace('build/', '')}' after ${time} ms`);
      } else {
        console.log(`[${format(end)}] ${event} '${dist}' after ${time} ms`);
      }
    });
  }
}

export default copy;
