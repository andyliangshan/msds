/**
 * Created by noodles on 2017/4/20.
 * description
 */
import cp from 'child_process';
import { exec } from './lib/cp';
import pkg from '../package.json';

const isIE8 = !process.argv.includes('--ie8');

const limit = async type => {
  let execStr = `npm run ${type} -- --release`;
  if (isIE8 && type === 'bundle') {
    execStr = `npm run ${type} -- --release --ie8`;
  }
  const start = new Date().getTime();
  await exec(execStr);
  const end = new Date().getTime() - start;
  console.log(`run ${type} -- release 耗时 ${end}`);
};

async function build2() {
  await limit('clean');
  await limit('copy');
  await limit('imgify');
  await limit('iconify');
  await limit('lessify');
  await limit('bundle');
  await limit('revify');
  await limit('revplacify');
  await limit('cdnify');

  if (process.argv.includes('--docker')) {
    cp.spawnSync('docker', ['build', '-t', pkg.name, '.'], { stdio: 'inherit' });
  }
}

export default build2;
