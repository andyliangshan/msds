require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* eslint-disable max-len */


const port = process.env.PORT || 3000;
/* harmony export (immutable) */ __webpack_exports__["d"] = port;

const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
/* harmony export (immutable) */ __webpack_exports__["e"] = host;

const debug = false;
/* unused harmony export debug */


const rootPath = __WEBPACK_IMPORTED_MODULE_0_path___default.a.normalize(`${__dirname}/..`);
/* harmony export (immutable) */ __webpack_exports__["a"] = rootPath;
  //  ./

const cookieSession = {
  expire: 7 * 24 * 3600 * 1000, // 7天,
  cookieSecret: 'msds-sempc-cookie',
  sessionSecret: 'msds-sempc-session',
};
/* harmony export (immutable) */ __webpack_exports__["b"] = cookieSession;

const redis = {
  host: '127.0.0.1',
  port: 6379,
  db: 0,
};
/* harmony export (immutable) */ __webpack_exports__["c"] = redis;



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pretty_error__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_compression__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_method_override__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_method_override___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_method_override__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_session__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_connect_redis__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_connect_redis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_connect_redis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ejs_locals__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ejs_locals___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ejs_locals__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_cors__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_serve_favicon__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_serve_favicon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_serve_favicon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__middlewares_midParams__ = __webpack_require__(12);
/* eslint no-underscore-dangle: 0 */

// import fs from 'fs';















const app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
const RedisStore = __WEBPACK_IMPORTED_MODULE_8_connect_redis___default()(__WEBPACK_IMPORTED_MODULE_7_express_session___default.a);


global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
// //
// // Register Node.js middleware
// // -----------------------------------------------------------------------------
app.locals.ENV = "production";
app.locals.ENV_DEVELOPMENT = false;
app.engine('ejs', __WEBPACK_IMPORTED_MODULE_9_ejs_locals___default.a);
app.set('views', __WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals._layoutFile = 'layout.ejs';
app.use(__WEBPACK_IMPORTED_MODULE_11_serve_favicon___default()(`${__WEBPACK_IMPORTED_MODULE_12__config__["a" /* rootPath */]}/build/public/favicon.ico`));
app.use(__WEBPACK_IMPORTED_MODULE_5_compression___default()());
app.use('/public', __WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.raw());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.text());
app.use(__WEBPACK_IMPORTED_MODULE_7_express_session___default()({
  secret: __WEBPACK_IMPORTED_MODULE_12__config__["b" /* cookieSession */].sessionSecret,
  store: new RedisStore({
    port: __WEBPACK_IMPORTED_MODULE_12__config__["c" /* redis */].port,
    host: __WEBPACK_IMPORTED_MODULE_12__config__["c" /* redis */].host,
    db: __WEBPACK_IMPORTED_MODULE_12__config__["c" /* redis */].db,
  }),
  resave: false,
  saveUninitialized: true,
  name: 'pc.sem.sid',
}));

/**
 * -------------------for cors  X-Frame-Options: Allow-From http://www.growingio.com---------------------
 */
app.all('*', (req, res, next) => {
  res.header('X-Frame-Options', 'ALLOW-FROM http://www.growingio.com');
  next();
});
app.use(__WEBPACK_IMPORTED_MODULE_10_cors___default()());
//  -----------------------growingio header and cors settings end----------------------------------------


if (false) {
  app.enable('trust proxy');
}
app.use(__WEBPACK_IMPORTED_MODULE_6_method_override___default()());

app.use(__WEBPACK_IMPORTED_MODULE_13__middlewares_midParams__["a" /* default */].midParams);
app.use('/api', __webpack_require__(5).default);
app.use('/', __webpack_require__(8).default);
app.use('/usa', __webpack_require__(9).default);
app.use('/en', __webpack_require__(6).default);
app.use('/hk', __webpack_require__(7).default);

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new __WEBPACK_IMPORTED_MODULE_4_pretty_error___default.a();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  res.status(err.status || 500);
  res.send(err);
});

/* eslint-disable no-console */
app.listen(__WEBPACK_IMPORTED_MODULE_12__config__["d" /* port */], () => {
  console.log(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_12__config__["d" /* port */]}/`);
});
/* eslint-enable no-console */


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_fetch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_agent__ = __webpack_require__(10);




const router = new __WEBPACK_IMPORTED_MODULE_0_express__["Router"]();


router.get('/', (req, res) => {
  res.json({
    name: 'abc',
  });
});

router.post('/post', (req, res) => {
  res.json({
    msg: 'ok',
  });
});

router.post('/phoneCode/', async (req, res, next) => {
  try {
    res.json({
      msg: '获取成功',
      errorcode: 0,
      timeout: 60,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/abroadPlan', async (req, res, next) => {
  const datas = req.body;
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__core_fetch__["a" /* default */])('http://cache.lp.liuxue.com/api/util/abroadPlan', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(datas),
    headers: {
      'Content-Type': 'application/json',
      referer: req.headers.referer,
      cookie: req.headers.cookie, //  string
    },
  }).then(resp => resp.json()).then(data => {
    res.json(data);
  }).catch(err => {
    next(err);
  });
});

router.post('/cache', async (req, res, next) => {
  try {
    const body = req.body;
    const data = await __WEBPACK_IMPORTED_MODULE_2__core_agent__["a" /* default */].post('http://cache.lp.shunshunliuxue.com/api/cache', body, {});
    res.json(data);
  } catch (err) {
    next(err);
  }
  // const body = req.body;
  // fetch('http://cache.lp.liuxue.com/api/cache', {
  //   method: 'post',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data);
  //     res.json(data);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});
// 请求offers数量
router.post('/offers', async (req, res, next) => {
  try {
    const data = await __WEBPACK_IMPORTED_MODULE_2__core_agent__["a" /* default */].get('https://crpapi.shunshunliuxue.com/offers/count/', {});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);



const router = new __WEBPACK_IMPORTED_MODULE_0_express__["Router"]();

// 英国新版首页
router.get('/v2/home/', async (req, res, next) => {
  try {
    res.render('en/enHome', {
      title: '英国留学网',
    });
  } catch (err) {
    next(err);
  }
});

// 英国留学中介机构
router.get('/agent/', async (req, res, next) => {
  try {
    res.render('en/enAgent', {
      title: '英国留学中介机构',
    });
  } catch (err) {
    next(err);
  }
});

// 英国中学
router.get('/v2/midschool/', async (req, res, next) => {
  try {
    res.render('en/enMiddle', {
      title: '英国中学',
    });
  } catch (err) {
    next(err);
  }
});

// 英国名校
router.get('/famschool/', async (req, res, next) => {
  try {
    res.render('en/enFamous', {
      title: '英国名校',
    });
  } catch (err) {
    next(err);
  }
});

// 英国商科
router.get('/v2/major/sk/', async (req, res, next) => {
  try {
    res.render('en/enshangke', {
      title: '英国商科申请计划',
    });
  } catch (err) {
    next(err);
  }
});

// 英国院校排名 url: /en/v2/schoolranking/
router.get('/v2/schoolranking/', async (req, res, next) => {
  try {
    res.render('en/schoolranking', {
      title: '英国院校排名',
    });
  } catch (err) {
    next(err);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/**
 * Created by andy on 17/8/28.
 */


const router = new __WEBPACK_IMPORTED_MODULE_0_express__["Router"]();

// 香港研究生
router.get('/v1/master/', async (req, res, next) => {
  try {
    res.render('hk/v1/master', {
      title: '香港研究生-专业 · 高效 · 透明',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/v1/fam/:name', async (req, res, next) => {
  console.log(req.params.name);
  const name = req.params.name;
  let title = '';
  switch (name) {
    case 'hku':
      title = '香港大学';
      break;
    case 'hkust':
      title = '香港科技大学';
      break;
    case 'cuhk':
      title = '香港中文大学';
      break;
    case 'cityu':
      title = '香港城市大学';
      break;
    case 'polyu':
      title = '香港理工大学';
      break;
    case 'hkbu':
      title = '香港浸会大学';
      break;
    case 'lingnan':
      title = '香港岭南大学';
      break;
    case 'eduhk':
      title = '香港教育学院';
      break;
    default:
      title = '香港大学';
  }
  try {
    res.render('hk/v1/university', {
      title: `${title}-专业 · 高效 · 透明`,
    });
  } catch (err) {
    next(err);
  }
});

// 香港研究生 美洽
router.get('/v1/master/mq/', async (req, res, next) => {
  try {
    res.render('hk/v1/masterMeiqia', {
      title: '香港研究生-专业 · 高效 · 透明',
    });
  } catch (err) {
    next(err);
  }
});
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);



const router = new __WEBPACK_IMPORTED_MODULE_0_express__["Router"]();
// const urls = {
//   cases: 'https://crpapi.shunshunliuxue.com/offers/list/',  //  ?offer_id__in=541,594,740,866案例
//   caseDetail: 'https://crpapi.shunshunliuxue.com/offers/detail/',
// };

// 默认为301 到语培页面
router.get('/', async (req, res, next) => {
  try {
    res.redirect('/index.html');
  } catch (err) {
    next(err);
  }
});

//  高考后留学
router.get('/gaokaohou/', async (req, res, next) => {
  try {
    res.render('gaokaohou/index', {
      title: '高考后留学',
    });
  } catch (err) {
    next(err);
  }
});

//  语培页面路由
router.get('/index.html', async (req, res, next) => {
  try {
    res.render('other/yupei', {
      title: '托福培训_雅思培训_GRE培训_SAT培训_GMAT培训-顺顺语培',
      keywords: '顺顺语培专注于各科出国考试，全方位覆盖托福、雅思、GRE、GMAT、SAT、ACT、SSAT、小托福、AEAS、AP、A-level以及各种能力提升课程,为各阶段学生提供针对性强、提分效果好的一对一及班课课程。',
      description: '托福培训,雅思培训,GRE培,SAT培训,GMAT培训',
    });
  } catch (err) {
    next(err);
  }
});

// 费用页面V2版本
router.get('/fee/v2/', async (req, res, next) => {
  try {
    res.render('fee/v2', {
      title: '留学费用一览',
    });
  } catch (err) {
    next(err);
  }
});

// service页面V2版本
router.get('/service/v2/', async (req, res, next) => {
  try {
    res.render('service/v2', {
      title: '顺顺留学-专业·透明·高效',
    });
  } catch (err) {
    next(err);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);



const router = new __WEBPACK_IMPORTED_MODULE_0_express__["Router"]();

router.get('/hot/home', async (req, res, next) => {
  try {
    res.render('usa/hotCollegeList', {
      title: '美国热门院校首页',
    });
  } catch (err) {
    next(err);
  }
});

// 美国留学中介机构
router.get('/agent/', async (req, res, next) => {
  try {
    res.render('usa/usaAgent', {
      title: '美国留学中介机构',
    });
  } catch (err) {
    next(err);
  }
});

// 美国院校排名 usa/version3/schoolranking_2/
router.get('/version3/schoolranking_2/', async (req, res, next) => {
  try {
    res.render('usa/schoolranking_2', {
      title: '美国大学最新排名',
    });
  } catch (err) {
    next(err);
  }
});

// 美国院校排名 usa/version4/schoolranking/
router.get('/version4/schoolranking/', async (req, res, next) => {
  try {
    res.render('usa/schoolrankingV4', {
      title: '美国大学最新排名',
    });
  } catch (err) {
    next(err);
  }
});

// 美国version3_1中学 usa/version3/midschool_1
router.get('/version3/midschool_1/', async (req, res, next) => {
  try {
    res.render('usa/midschoolV1', {
      title: '美国中学',
    });
  } catch (err) {
    next(err);
  }
});
// 美国version4_1中学 usa/version4/midschool
router.get('/version4/midschool/', async (req, res, next) => {
  try {
    res.render('usa/usaMiddleV4', {
      title: '美国中学',
    });
  } catch (err) {
    next(err);
  }
});

// 美国version4_1中学 usa/version4/midschool_1
router.get('/version4/midschool_1/', async (req, res, next) => {
  try {
    res.render('usa/usaVersion4_1', {
      title: '美国中学',
    });
  } catch (err) {
    next(err);
  }
});

// 美国热门专业 usa/version3/major
router.get('/version3/major/', async (req, res, next) => {
  try {
    res.render('usa/usaMajor', {
      title: '美国热门专业',
    });
  } catch (err) {
    next(err);
  }
});

// 美国本科 usa/version3/undergraduate
router.get('/version3/undergraduate/', async (req, res, next) => {
  try {
    res.render('usa/undergraduateV3', {
      title: '美国本科',
    });
  } catch (err) {
    next(err);
  }
});

// 美国V4-聚合页 usa/version4/home
router.get('/version4/home/', async (req, res, next) => {
  try {
    res.render('usa/usaVersion4', {
      title: '美国留学新手必读',
    });
  } catch (err) {
    next(err);
  }
});

// 美国V4-聚合页 usa/version4/home
router.get('/version4/home_1/', async (req, res, next) => {
  try {
    res.render('usa/usaVersion4Home1', {
      title: '美国留学新手必读',
    });
  } catch (err) {
    next(err);
  }
});

// 名校招生官巡回评审会 usa/zhaosg/
router.get('/zhaosg/', async (req, res, next) => {
  try {
    res.render('usa/usaZhaosg', {
      title: '名校招生官巡回评审会',
    });
  } catch (err) {
    next(err);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_superagent__);


__webpack_require__(27)(__WEBPACK_IMPORTED_MODULE_0_superagent___default.a);

const generateError = (err) => {
  return Object.assign(err.response ? err.response.body :
    { code: err.code }, err.response ? err.response.error :
    { status: 500 }, { raw: err });
};

const timeout = 120 * 1000;

/* harmony default export */ __webpack_exports__["a"] = ({
  get: (path, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a
      .get(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json');

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),

  put: (path, data, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.put(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json')
      .send(data);

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),

  post: (path, data, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json')
      .send(data);

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),

  del: (path, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.del(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json');

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_fetch__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(1);
/* unused harmony reexport Request */
/* unused harmony reexport Headers */
/* unused harmony reexport Response */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localFetch; });





__WEBPACK_IMPORTED_MODULE_1_node_fetch___default.a.Promise = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a;
__WEBPACK_IMPORTED_MODULE_1_node_fetch__["Response"].Promise = __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${__WEBPACK_IMPORTED_MODULE_2__config__["e" /* host */]}${url}`;
}

function localFetch(url, options) {
  return __WEBPACK_IMPORTED_MODULE_1_node_fetch___default()(localUrl(url), options);
}




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/**
 * Created by noodles on 2017/5/2.
 * description
 */



const midParams = async (req, res, next) => {
  try {
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(res.locals, {
      __DEV__: false, //  eslint-disable-line
      title: '',
      description: '',
      keywords: '',
    });
    next();
  } catch (err) {
    next();
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  midParams,
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("ejs-locals");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("superagent-retry");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map