/**
 * Created by noodles on 2017/6/14.
 * description
 */
/* eslint global-require: 0 */
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-promise').polyfill();
// require('whatwg-fetch');
require('fetch-ie8');
require('core-js/fn/object/assign');  //  Object.assign for ie8

if (__DEV__) {
  require('console-polyfill');
}

const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
// const hashHistory = require('react-router').hashHistory;
const createHashHistory = require('history/lib/createHashHistory');

const history = createHashHistory({
  queryKey: false,
});

const Yupei = require('./pages/yupei/Yupei');
const Ielts = require('./pages/yupei/Yasi');
const Toelf = require('./pages/yupei/Toelf');

require('../libs/bootstrap/js/tooltip');
require('../libs/bootstrap/js/tab');

const UtilNet = require('./core/UtilNet');

UtilNet.generateCookiePKID();
window.onload = () => {
  UtilNet.replaceUtmSourceLink();
};

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={Yupei} />
    <Route path="/ielts" component={Ielts} />
    <Route path="/toelf" component={Toelf} />
    <Route path="*" component={Yupei} />
  </Router>
), document.getElementById('app'));
