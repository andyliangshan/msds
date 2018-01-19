
import path from 'path';
import cp from 'child_process';
import webpackConfig from './webpack.config';

// Should match the text string used in `src/server.js/server.listen(...)`
const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;

let server;
let pending = true;
const [, serverConfig] = webpackConfig;
const serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);

// Launch or restart the Node.js server
function runServer() {
  return new Promise((resolve) => {
    function onStdOut(data) { //  data.toString('utf8') -> The server is running at http://localhost:3000/
      const time = new Date().toTimeString();
      const match = data.toString('utf8').match(RUNNING_REGEXP);

      process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
      process.stdout.write(data);

      if (match) {
        server.host = match[1]; //  localhost:3000
        server.stdout.removeListener('data', onStdOut);
        server.stdout.on('data', x => process.stdout.write(x));
        pending = false;
        resolve(server);
      }
    }

    if (server) {
      server.kill('SIGTERM');
    }

    server = cp.spawn('node', [serverPath], {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });

    //  同一个server 实例， pending 只在第一次启动时 为true， 后续对该实例 操作是 pending 为false， 所以当server 退出时，控制台会直接打印错误信息，并等待重启
    //  如果 另一个 server 实例 启动，相当于 同一个端口启动两个server实例，pending 为true，此时会 抛出异常并自动退出。
    if (pending) {
      server.once('exit', (code, signal) => {
        if (pending) {
          throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
        }
      });
    }

    server.stdout.on('data', onStdOut);
    server.stderr.on('data', x => process.stderr.write(x));

    return server;
  });
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runServer;
