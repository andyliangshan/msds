****
# 项目说明
### webpack2.x, babel6.x 的基础上，抛弃了兼容ie8的许多hook；但仍然可以在ie8部署，对于新型的模块和特性使用将会收限制


## 本地开发说明
* `npm start` or `npm run dev`
  - 清理build目录
  - 执行文件复制
  - 执行less编译并自动watch
  - 执行cache 图片压缩并watch
  - webpack编译执行，`webpack-dev-middleware`使用
  - 服务端启动，并且 `browserSync` 代理， 监控编译目录重载浏览器

* **enhance**
  * 多页面入口 在入口页面很多的情况下 会拖慢开发时webapck编译速度
  * 所以可以增加自定义单一入口文件，铜鼓环境变量entry制定
  * `entry=abc npm start` or `entry=abc npm run dev`
  * 仅支持单一文件

## 测试服务部署

```bash
  ssh
  screen -r news
  git pull origin branch
  npm run build -- --ie8
  pm2 restart news
```


## 线上部署说明
* `npm run build2 --ie8`
  - 对ie8不做压缩编译 **暂时废弃**

* `npm run build2`
  - 正常线上编译  **暂时废弃**

* 正常部署
  - 1. `npm run build -- --release`
  - 2. `npm run revplacify`  l流程中版本替换有bug，若果使用此命令，请在最后执行 `npm run revReplify` 执行版本替换
  - 3. `scp -r build/ root@101.200.163.125:'/alidata/www/msds-sempc'`      pass  SEM687tax
  - **1-3 可直接执行 `sh doc/bash/prod.sh`**
  - server bash
  - `nvm use 7.9.0` or `screen -r pc`
  - `pm2 start build/server.js --name pc` or `pm2 restart pc`
  - `pm2 logs pc`

* ie8 部署
  - 1. `npm run build -- --release --ie8`
  - 2. `npm run revplacify`
  - 3. `scp -r build/ root@101.200.163.125:'/alidata/www/msds-sempc-ie8'`  pass  SEM687tax
  - **1-3 可直接执行 `sh doc/bash/prodid8.sh`**
  - server bash
  - `nvm use 7.9.0` or `screen -r pc`
  - `PORT=3008 pm2 start build/server.js --name pcie8` or `pm2 restart pcie8`
  - `pm2 logs pcie8`

 - 1. 清理
 - 2. 复制相关文件
 - 3. less prod编译
 - 4. 图片压缩
 - 5. webpack编译server和client
 - 6. 图片，css，fonts, js 做版本
 - 7. 根据版本信息 做版本引用替换
 - 8. 执行cdn替换（ejs页面的img,js,css)

* webpack前端 require 图片 cdn
 - require 命令使用路径地址，不使用相对地址

## 线上部署可能出现的问题
### `npm install` 后可能出现history和react-router版本和 package.json不一致的情况，导致ie8 出现兼容问题
### 原因可能是版本依赖问题
### 解决方案：手动卸载history和react-router，并安装对应的ie8 兼容版本
### bootstrap字体路径问题，本地手动修改less/variables.less内部的 `@icon-font-path:        "../fonts/" 修改成  "/public/fonts/";`

## 本地开发安装后 ie8 不支持解决方案
* `package.json` 文件修改 `history` 和 `react-router` 到 `"history": "^4.5.1", "react-router": "^2.8.1",` 版本
* `npm install`
* `npm uninstall history react-router` 手动卸载
* `yarn add history@1.17.0 react-router@1.0.3`
* 具体原因npm 对依赖管理的模式，可通过此方式解决


## webpack 引用图片 cdn 加速问题
* `require('../../abc.png')` 此种方式会自动 根据 环境 添加 cdn 前缀， 具体请参考 `webpack.config.js`
* `<img src = {`{__CDN__}/public/image/abc.png`} />` 方式引用图片时， 请手动添加 `__CDN__` 变量， __CDN__ 会根据环境 自动指定， dev -> '' ; prod -> 'http://cdn.lp.liuxue.com' ;

### 对于页面逻辑较少，样式为主的sem pc页面，react0.14.x将完全够用，只是开发中应格外小心，对于新模块等要时刻保证ie8的兼容性
  - 抛弃 `import` 等关键字
  - 使用commonjs的 `module.exports` 等
  - `withStyle` 高级功能 很可惜不能再兼容ie8，所以项目使用js和css分离

### ie兼容性参考
  * [阿里ued兼容文章](http://www.aliued.com/?p=3240)
  * [react-ie8-github兼容说明](https://github.com/xcatliu/react-ie8)
  * react-ie8 [官网参考文档](http://react-ie8.xcatliu.com/react/docs/getting-started.html)


### ie8 兼容fetch方式
* 入口处引入兼容文件（适用内部子组件）：
```javascript
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-promise').polyfill();
require('fetch-ie8');
```

* 说明：
  - es5-shim 请自行参考文档
  - `es6-promise` 使用方式必须 为 `require('es6-promise').polyfill();`
  - 经测试 网上的`require('es6-promise')`方式， 不会填充Promise到i8全局环境， ie8使用fetch仍会抛错
  - [官方说明](https://github.com/stefanpenner/es6-promise#auto-polyfill)
  - `fetch-ie8` 为ie8 替换为原生ajax方式，而 `es6-promise` 则为ie8提供了Promise的支持；两者缺一不可

* 使用方式，具体请参考[官方文档](https://github.com/camsong/fetch-ie8)
  - get
```javascript
fetch('/api').then(res => res.json())
.then(data => alert(data.name));
```

  - post (just for json)

```javascript
fetch('/api/post', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'noodles',
        login: 'noodles',
      }),
    })
.then(res => res.json())
.then(data => alert(data.msg));
```

  - post (just for form data)

```javascript
    fetch('/api/phoneCode', {
      method: 'post',
      body: new Fromdata(ele),
    }).then(res => res.json())
      .then(data => alert(data));
```

* Fetch请求默认不带cookie，但是这可以通过 fetch(url, {credentials: 'same-origin'})设置同域，fetch(url, {credentials: 'include'})设置跨域

## React js编写规范
* 不要使用 `import` 关键字， `import` 会解析生成 `Object.defineProperty`,ie8 error
* 因为 `import` 将会在require之前解析引入模块 `import react` before `require('es5-shim')`.
* 必须使用 `const React = require('react');`
* 组件定义规范：
  - 文件引用使用 `require` 关键字
  - 组件导出使用 `module.exports = xxx` 或者 `exports.xx = xx`
  - 组件内部独立样式使用：推荐等级 1 > 2 > 3
    - 1.样式和组件代码分离： 具体页面按需引用
    - 2.使用内联样式对象  `const style = {backgroundColor: '#907a7a'};`；`<div style={style}></div>`
    - 3.使用require加载独立组件样式
      - `require('./Header.less')`
      - 必须是less文件
* `public/less` 目录下less编译是通过gulp-less实现并watch

## 插件使用
* `babel-plugin-add-module-exports`
  - 在webpack2.x是 会导致 exports is not defined
  - 请参考 [add-module-exports和webpack2.x](https://ntucker.true.io/ntucker/webpack-2-uncaught-referenceerror-exports-is-not-defined/)

*  `optimize-css-assets-webpack-plugin` 详情请参考 [官方文档](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
  - 针对 `extract-text-webpack-plugin` 插件提取css后 解决css类 重复的问题
  - 解决 `extract-text-webpack-plugin` 提取之后 进行 css mini。


## 使用react-router
### [文档1](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)
### [文档2](https://segmentfault.com/a/1190000002801128)

## react 生命周期 以父容器调用子组件为例[article](https://segmentfault.com/a/1190000004168886) [article2](https://segmentfault.com/a/1190000003691119)
### es6 方式的声明周期
* constructor(props)
  - getDefaultProps
  - getInitialState

* componentWillMount
  - 在完成首次渲染之前调用，此时仍可以修改组件的state。
  - **允许我们初始化前最后一次对state进行修改，而不会触发重新渲染**。

* render
  - 创建虚拟DOM，该方法具有特殊的规则：
    - 1.只能通过this.props和this.state访问数据
    - 2.可以返回null、false或任何React组件
    - 3.只能出现一个顶级组件（不能返回数组）
    - 4.不能改变组件的状态
    - 5.不能修改DOM的输出

* componentDidMount
  - 真实的DOM被渲染出来后调用，在该方法中可通过React.findDOMNode(component)访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。
  - React.findDOMNode is deprecated. Please use ReactDOM.findDOMNode from require('react-dom') instead.
  - 在服务端中，该方法不会被调用

* componentWillReceiveProps(nextProps)
  - 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。

```javascript
componentWillReceiveProps: function (nextProps) {
    if (nextProps.bool) {
        this.setState({
            bool: true
        });
    }
}
```

* shouldComponentUpdate(nextProps, nextState)
  - 组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法，通常不需要使用以避免出现bug。
  - 在出现应用的瓶颈时，可通过该方法进行适当的优化。
  - 在首次渲染期间或者调用了forceUpdate方法后，该方法不会被调用

* componentWillUpdate(nextProps, nextState)
  - 接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state

* componentDidUpdate(prevProps, prevState)
  - 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
  - 可以操作改变state

* componentWillUnmount
  - 组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。

### 未涉及state变动 子组件执行流程

```bash
constructor
componentWillMount
render
componentDidMount
```

### 父组件涉及state变动 子组件执行流程

```bash
constructor
componentWillMount
render
componentDidMount
-------父容器state更新后
componentWillReceiveProps
componentWillUpdate
render
componentDidUpdate
```

### 更周期函数说明

### 总结
* 组件首次装配是执行流程是 constructor -> componentWillMount -> render -> componentDidMount
* 父容器state变动，子组件update重新渲染时 componentWillReceiveProps -> componentWillUpdate -> render -> componentDidUpdate
* 子组件内部自发改变state时 执行流程 componentWillUpdate -> componentDidUpdate

## 内部jquery使用的方式
* [managing-jquery-plugin-dependency-in-webpack](http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack)

## slick 轮播插件使用说明
* [官网文档](http://kenwheeler.github.io/slick/)
* code

```html
<div className="slick-wrap">
  <div className="slick-items">
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
    <div><h3>5</h3></div>
    <div><h3>6</h3></div>
  </div>
</div>
```

```javascript
componentDidMount() {
  $('.slick-items').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
  });
}
```
  - `componentDidMount` 初始化slick组件
  - 具体参数和demo 请参考官方使用
```
  -  `新增公共组件ServiceProcess` 使用
  <ServiceProcess circleColor="#84b8ff" borderStyle="border-style" arrowColor="arrow-color" title={serviceTitle} />
  -  默认是美国，
  - title: <h3 className="serviceProcess-header">
      <span className="first">定制流程——针对美国的服务流程，录取不到就退款</span>
    </h3>,
  - borderStyle: '',
  - country: 'usa',
  - circleColor: '',
  - arrowColor: '',
  - arrowHidden: '',
  使用的less文件加入这段css，颜色根据UI调整
  .right {
        .arrow-color {
          border-left-color: #6730d4;
        }

        .arrow-hidden {
          border-left-color: #ebeef6;
        }
      }

      .left {
        .arrow-color {
          border-right-color: #6730d4;
        }

        .arrow-hidden {
          border-right-color: #ebeef6;
        }
      }

      .bottom {
        .arrow-color {
          border-top-color: #6730d4;
        }

        .arrow-hidden {
          border-top-color: #ebeef6;
        }
      }
    }
