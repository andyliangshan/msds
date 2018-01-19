
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import WriteFilePlugin from 'write-file-webpack-plugin';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';
import lessify from './lessify';
import imgify from './imgify';
// import iconify from './iconify';

const isDebug = !process.argv.includes('--release');
process.argv.push('--watch');

const [clientConfig, serverConfig] = webpackConfig;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy);
  await run(imgify);
  // await run(iconify);
  await run(lessify);
  await new Promise((resolve) => {
    // Save the server-side bundle files to the file system after compilation
    // https://github.com/webpack/webpack-dev-server/issues/62
    clientConfig.plugins.push(new WriteFilePlugin({ log: false }));
    serverConfig.plugins.push(new WriteFilePlugin({ log: false }));

    const bundler = webpack(webpackConfig);
    webpackDevMiddleware(bundler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
    });

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();
      const server = await runServer();
      const bs = browserSync.create();
      bs.init({
        ...isDebug ? {} : { notify: false, ui: false },
        files: ['build/public/**/*', 'build/views/**/*'],  // ['public/js/*js', 'public/css/**/*.css'],
        reloadDebounce: 1000, //  等待重装事件2秒后允许更多前
        proxy: {
          target: server.host,
          // middleware: [wpMiddleware],
          proxyOptions: {
            xfwd: true,
          },
        },
      }, resolve);
    };
    bundler.plugin('done', stats => handleBundleComplete(stats));
  });
}

export default start;
