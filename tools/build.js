/**
 * 线上部署执行流程
 * 1. 清理
 * 2. 复制相关文件
 * 3. less prod编译
 * 4. 图片压缩
 * 5. webpack编译server和client (移除 assest.json会对所有入口文件做对应关系，所以就自动为js做了版本化处理)
 * 6. 图片，css，fonts 做版本（1.js内部require 2.页面直接饮用）    todo
 * 7. 根据版本信息 做版本引用替换
 * 8. 执行cdn替换               todo
 * qs：todo
 * 1. webpack前端 require 图片 cdn
 */
import cp from 'child_process';
import run from './run';
import clean from './clean';
import copy from './copy';
import lessify from './lessify';
import imgify from './imgify';
import iconify from './iconify';
import revify from './revify';
import revplaciry from './revplacify';
import bundle from './bundle';
import cdnify from './cdnify';
import pkg from '../package.json';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
  await run(clean);
  await run(copy);
  await run(imgify);
  await run(iconify);
  await run(lessify);
  await run(bundle);
  if (process.argv.includes('--release') && !process.argv.includes('--ie8')) {
    await run(revify);
    await run(revplaciry);
    await run(cdnify);
  }

  if (process.argv.includes('--docker')) {
    cp.spawnSync('docker', ['build', '-t', pkg.name, '.'], { stdio: 'inherit' });
  }
}

export default build;
