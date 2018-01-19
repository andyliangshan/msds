/**
 * Created by noodles on 2017/3/29.
 * description
 */
/* eslint global-require: 0 */
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-promise').polyfill();
// require('whatwg-fetch');
require('fetch-ie8');

if (__DEV__) {
  require('console-polyfill');
}

const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('./components/Link');
const Footer = require('./components/Footer');
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Activity = require('./components/usahot/Activity');
const Live800 = require('./components/Live800');
const CommonModal = require('./components/CustomModal');

class Chart extends React.Component {

  componentWillMount() {
    // console.log('ok');
    // fetch('/api').then((response) => {
    //   console.log(response.headers.get('Content-Type'))
    //   console.log(response.headers.get('Date'))
    //   console.log(response.status)
    //   console.log(response.statusText)
    // });
    console.log($('body'));
    console.log('%cscript Activated....', 'font-size:100px;color:#fff;text-shadow:0 1px 0#ccc,0 2px 0  #c9c9c9 ,0 3px 0  #bbb ,0 4px 0  #b9b9b9 ,0 5px 0  #aaa ,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
  }

  btnClick(evt) {
    alert(evt.target);
    fetch('/api').then(res => res.json())
      .then(data => alert(data.name));

    fetch('/api/phoneCode', {
      method: 'post',
      headers: {
        Accept: 'application/json,test/plain,*/*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: { name: 'wgx' },
    }).then(res => res.json())
      .then(data => alert(data));
  }

  render() {
    const bannerChildren = (<div className="rel1100">
      <div className="querybtn">
        <a href="javascript:void(0)" className="activity-btn po">测试选校</a>
        <Live800 classes={'live800 live8001'} title={'立即咨询'} type={'a'} tips={'院校首页banner'} />
      </div>
    </div>);

    return (
      <div>
        <Header />
        <Banner bg={'/public/img/list-banner.png'} childrens={bannerChildren} />
        <Activity />
        <div className="rel1100">
          <div className="ivy-school">
            <div className="ivy-school-title clearfix">
              <span><img src={require('../img/usa-hot/cct.png')} alt="" /></span>
              <h2>常青藤</h2>
            </div>
            <ul className="ivy-school-list clearfix list-unstyled">
              <li className="first-li">
                <img src={require('../img/usa-hot/hf.png')} alt="" />
                <p>哈佛</p>
                <a href="#"></a>
              </li>
              <li>
                <img src={require('../img/usa-hot/yl.png')} alt="" />
                <p>耶鲁</p>
                <a href="#"></a>
              </li>
              <li>
                <img src={require('../img/usa-hot/plsd.png')} alt="" />
                <p>普林斯顿</p>
                <a href="#"></a>
              </li>
              <li>
                <img src={require('../img/usa-hot/glby.png')} alt="" />
                <p>哥伦比亚</p>
                <a href="#"></a>
              </li>
              <li>
                <img src={require('../img/usa-hot/stf.png')} alt="" />
                <p>斯坦福</p>
                <a href="#"></a>
              </li>
              <li>
                <img src={require('../img/usa-hot/bl.png')} alt="" />
                <p>布朗</p>
                <a href="#"></a>
              </li>
              <li>
                <img src={require('../img/usa-hot/kne.png')} alt="" />
                <p>康奈尔</p>
                <a href="#"></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="hot-school ivy-school">
              <div className="hot-school-title clearfix">
                <span><img src={require('../img/usa-hot/fire.png')} alt="" /></span>
                <h2>热门录取院校</h2>
              </div>
              <ul className="hot-school-list ivy-school-list clearfix list-unstyled">
                <li className="first-li">
                  <img src={require('../img/usa-hot/ny.png')} alt="" />
                  <p>纽约大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/hsd.png')} alt="" />
                  <p>华盛顿大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/bsd.png')} alt="" />
                  <p>波士顿大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/bxfny.png')} alt="" />
                  <p>宾夕法尼亚</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/yhhpjs.png')} alt="" />
                  <p>约翰霍普金斯</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/kndg.png')} alt="" />
                  <p>康涅狄格大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/xc.png')} alt="" />
                  <p>雪城大学</p>
                  <a href="#"></a>
                </li>
              </ul>
              <ul className="hot-school-list ivy-school-list clearfix list-unstyled">
                <li className="first-li">
                  <img src={require('../img/usa-hot/pd.png')} alt="" />
                  <p>普渡大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/knjml.png')} alt="" />
                  <p>卡内基梅隆</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/dk.png')} alt="" />
                  <p>杜克大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/pzb.png')} alt="" />
                  <p>匹兹堡大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/ehe.png')} alt="" />
                  <p>俄亥俄州立大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/lqst.png')} alt="" />
                  <p>罗切斯特大学</p>
                  <a href="#"></a>
                </li>
                <li >
                  <img src={require('../img/usa-hot/jz.png')} alt="" />
                  <p>加州大学</p>
                  <a href="#"></a>
                </li>
              </ul>
              <div className="hot-school-buttoon">
                <p className="po"><a href="http://zt.shunshunliuxue.cn/usa/version3/schoolranking_1/">热门院校排名</a></p>
                <p>问问专家怎么选</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={evt => this.btnClick(evt)}>
          abc
        </button>
        <CommonModal title={'abc'} />
        <Link className={'abc'} to="/admin">Admin</Link>
        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<Chart />, document.getElementById('app'));
