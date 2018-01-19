/**
 * Created by noodles on 2017/4/5.
 * description  执行build/views 下所有ejs文件内部cdn替换
 */
/* eslint no-useless-escape: 0 quotes: 0 */
import glob from 'glob';
import { readFile, writeFile } from './lib/fs';
import { exec } from './lib/cp';

const targetPath = './build/views/**/*.ejs';
const ignores = [/layout/, /^_/];
const cdn = `http:\\/\\/semm.shunshunliuxue.com`; //  只针对bash命令中 / 的转义
const cdn2 = 'http://op1szwr44.bkt.clouddn.com';// http://cdn.lp.liuxue.com

/**
 * 根据ignores正则数组，对一组文件进行正则过滤
 * @param files 正则表达式数组
 */
const filterFunc = files => {
  const cdnFiles = [];  //  new Set();
  files.map(file => {
    const filenameNoExt = file.match(/(\w+)(?=\.)/)[0];
    /**
     * 使用匿名函数保存过滤数组 匹配次数
     */
    +function (filename) {  /* eslint wrap-iife: 0 no-unused-expressions: 0 */
      const filterCount = ignores.length;
      let initialCount = 0;
      for (let i = 0; i < filterCount; i++) {
        if (ignores[i].test(filename)) {
          break;
        }
        initialCount++; /* eslint no-plusplus: 0 */
      }
      //  筛选出匹配后到的文件
      if (initialCount === 2) {
        cdnFiles.push(file);
      }
    }(filenameNoExt);
  });
  return cdnFiles;
};

/**
 * find ./test.ejs ./layout.ejs -type f -exec perl -i -p -e 's/"{0}\/js\//http:\/\/semm.shunshunliuxue.com\/js\//g' {} \;
 * @param files 文件数组 或单个文件
 * @param type 替换类型(js|css|img)
 */
const getCmd = (files, type) => `find ${Array.isArray(files) ? files.join(' ') : files} -type f -exec perl -i -p -e 's/"{0}\\/${type}\\//${cdn}\\/${type}\\//g' {} \\;`;

/**
 * todo bash命令有bug，cdn替换时可能会造成某些文件没有替换，请使用 cdnify2；此方法仅作代码参考，不当做线上使用条件
 * @returns {Promise.<void>}
 */
async function cdnify() { /* eslint no-unused-vars: 0 */
  const cdnFiles = filterFunc(glob.sync(targetPath));
  await Promise.all([
    exec(getCmd(cdnFiles, 'js')),
    exec(getCmd(cdnFiles, 'css')),
    exec(getCmd(cdnFiles, 'img')),
  ]);
}

/**
 * 同步执行替换，不考虑性能
 * @returns {Promise.<void>}
 */
async function cdnify2() {
  const cdnFiles = filterFunc(glob.sync(targetPath));
  for (let i = 0, len = cdnFiles.length; i < len; i++) {
    const start = Date.now();
    const file = cdnFiles[i];
    const fileStr = await readFile(file); /* eslint no-await-in-loop: 0*/
    writeFile(file, fileStr.replace(/\/(public)\//g, `${cdn2}/$1/`));
    console.log(`执行cdn文件：${file} ; 操作耗时：${Date.now() - start}ms`);
  }
}

export default cdnify2;
