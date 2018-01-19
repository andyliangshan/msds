import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import glob from 'glob';
import pkg from '../package.json';

const isDebug = !process.argv.includes('--release');
const isIE8 = process.argv.includes('--ie8');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');
const cdn = isDebug ? '' : 'http://op1szwr44.bkt.clouddn.com';// http://cdn.lp.liuxue.com
let webPackEntries = {};
glob.sync('./public/js/*.js').map(file => {
  const filename = file.match(/(\w+)(?=\.)/)[0];  // const filename = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
  webPackEntries[filename] = file;
});
//  如果环境变量 指定了 入口文件 entry=abc 则 重置 webPackEntries
const envEntryFile = process.env.entry;
if (envEntryFile) {
  webPackEntries = {
    [envEntryFile]: `./public/js/${envEntryFile}.js`,
  };
}
console.log(webPackEntries);
console.log('isIE8: ', isIE8, 'isDebug: ', isDebug);
const config = {
  // webpack 的主目录->entry 和 module.rules.loader 选项 相对于此目录解析
  context: path.resolve(__dirname, '..'),

  output: {
    // 所有输出文件的目标路径---必须是绝对路径（使用 Node.js 的 path 模块）
    // path: path.resolve(__dirname, '../build/public/assets'),
    // 输出解析文件的目录，url 相对于 HTML 页面
    // publicPath: '/assets/',
    // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。
    pathinfo: isVerbose,
  },

  module: {
    // 模块规则（配置加载器、解析器等选项）
    rules: [
      {
        //  只在 test 和 文件名匹配 中使用正则表达式 - 在 include 和 exclude 中使用绝对路径数组 - 尽量避免 exclude，更倾向于使用 include
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../public'),
        ],
        // loader 的可选项
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,
          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            ['env', {
              targets: {
                browsers: pkg.browserslist,
              },
              modules: false,
              useBuiltIns: false,
              debug: false,
            }],
            // Experimental ECMAScript proposals---------https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
            'stage-0',
            // JSX, Flow-------https://github.com/babel/babel/tree/master/packages/babel-preset-react
            'react',
            // Optimize React code for the production build-------https://github.com/thejameskyle/babel-react-optimize
            // remove because not support ie8
            // ...isDebug ? [] : ['react-optimize'],
          ],
          plugins: [
            // Adds component stack to warning messages------https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source
            ...isDebug ? ['transform-react-jsx-source'] : [],
            // Adds __self attribute to JSX which React will use for some warnings------https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
            ...isDebug ? ['transform-react-jsx-self'] : [],
          ],
        },
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
              discardComments: { removeAll: true },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: './tools/postcss.config.js',
            },
          },
        ],
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //  resolve-url-loader may be chained before sass-loader if necessary
          use: [{
            loader: 'css-loader',
            query: {
              options: {
                modules: true,
                minimize: true,
              },
            },
          },
          {
            loader: 'less-loader',
          },
          ],
        }),
        // use: [
        //   {
        //     loader: 'style-loader',
        //   },
        //   {
        //     loader: 'css-loader',
        //     query: {
        //       options: {
        //         modules: true,
        //       },
        //     },
        //   },
        //   {
        //     loader: 'less-loader',
        //   },
        // ],
      },
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './lib/markdown-loader.js'),
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  // Don't attempt to continue if there are any errors.
  bail: !isDebug,
  cache: isDebug,
  // 精确控制要显示的 bundle 信息
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = {
  ...config,
  name: 'client',
  target: 'web',
  // entry: {
  //   client: ['babel-polyfill', './src/client.js'],
  // },
  entry: webPackEntries,

  output: {
    ...config.output,
    path: path.resolve(__dirname, '../build/public/js'),
    publicPath: `${cdn}/public/js/`,
    // publicPath 和 path的 说明：
    /**
     * publicPath使用入口文件打包后的 存放 路径， 可以继续拼接 path 指定路径
     * 组件内部使用的图片资源在dev下会打包 到 publicPath + path 下；pro下 会打包到 publicPath目录 ； 和打包入口的文件在同级目录
     * publicPath可在prod  指定cdn前缀
     */
    // publicPath: 'http://semmm.shunshunliuxue.com/public/js/', // 例如Header组件内部的相对图片会 打包到/public/js/目录下 的 (dev: pubic/js下, prod: )
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    filename: '[name].js',  //  isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    // 「附加分块(additional chunk)」的文件名模板
    // chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },

  externals: {
    jquery: 'window.jQuery',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
      __CDN__: isDebug ? '""' : '"http://op1szwr44.bkt.clouddn.com"',
    }),

    // Emit a file with assets paths----https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),

    ...isIE8 ? [] : (isDebug ? [] : [ //  eslint-disable-line
      // Minimize all JavaScript output of chunks-----https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: isVerbose,
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ]),

    //  https://github.com/webpack-contrib/extract-text-webpack-plugin
    new ExtractTextPlugin('[name]-extract.css'),
    // new ExtractTextPlugin({
    //   filename: path.posix.join('build', '[name].css'),
    // }),

    //  https://github.com/NMFR/optimize-css-assets-webpack-plugin
    //  1. 针对 extract-text-webpack-plugin 插件提取css的重复问题
    //  2. 在 1 的基础上 对提取之后的css 进行压缩
    ...!isDebug ? [new OptimizeCssAssetsPlugin({
      assetNameRegExp: /-extract\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    })] : [],

    // Webpack Bundle Analyzer----https://github.com/th0r/webpack-bundle-analyzer
    ...isAnalyze ? [new BundleAnalyzerPlugin()] : [],
  ],

  // Choose a developer tool to enhance debugging-------http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'cheap-module-source-map' : false,

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = {
  ...config,
  name: 'server',
  target: 'node',
  entry: {
    server: ['babel-polyfill', './src/server.js'],
  },

  output: {
    ...config.output,
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    ...config.module,
    // Override babel-preset-env configuration for Node.js
    rules: config.module.rules.map(rule => (rule.loader !== 'babel-loader' ? rule : {
      ...rule,
      options: {
        ...rule.options,
        presets: rule.options.presets.map(preset => (preset[0] !== 'env' ? preset : ['env', {
          targets: {
            node: parseFloat(pkg.engines.node.replace(/^\D+/g, '')),
          },
          modules: false,
          useBuiltIns: false,
          debug: false,
        }])),
      },
    })),
  },

  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
  externals: [
    /^\.\/assets\.json$/,
    (context, request, callback) => {
      const isExternal = request.match(/^[@a-z][a-z/.\-0-9]*$/i) && !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),

    // Do not create separate chunks of the server bundle-------https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    // Adds a banner to the top of each generated chunk---------https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
};

export default [clientConfig, serverConfig];
