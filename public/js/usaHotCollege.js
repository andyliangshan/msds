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

const College = require('./pages/usaHotCollege/College');
const CollegeDetail = require('./pages/usaHotCollege/CollegeDetail');

require('../libs/bootstrap/js/tooltip');

const UtilNet = require('./core/UtilNet');

UtilNet.generateCookiePKID();
window.onload = () => {
  UtilNet.replaceUtmSourceLink();
};

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={College} />
    <Route path="(:name)" component={CollegeDetail}
           onEnter={
             ({ params }, replace) => {
               if (__DEV__) {
                 console.log('onEnter', typeof replace, params);
               }
             }
           }
    />
    <Route path="*" component={College} />
  </Router>
), document.getElementById('app'));
