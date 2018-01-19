/* eslint global-require: 0 import/no-dynamic-require: 0 */
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

require('../libs/bootstrap/js/tooltip');
require('../libs/bootstrap/js/tab');

const UtilNet = require('./core/UtilNet');
// self
const Nav = require('./components/england/homeComponents/Nav');
const NavContent = require('./components/england/homeComponents/NavContent');
const Rank = require('./components/england/homeComponents/Rank');
const Activity = require('./components/england/homeComponents/Activity');
const Offers = require('./components/england/homeComponents/Offers');
const enHomeData = require('./components/england/data/homeData.json');

// public
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const IntCRP = require('./components/usahot/Zhaosg/IntCRP');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityMajor');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const majorTabData = require('./components/usahot/ExtraData/majorTabData.json');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');
const Teacher = require('./components/usahot/Teacher/Teacher');
const ServiceProcess = require('./components/usahot/ServiceProcess/ServiceProcess1');
const Live800 = require('./components/Live800/Live800');
const PageInterModals = require('./components/PageInterModals/PageInterModals');
const usaV4Data = require('./components/usahot/ExtraData/usaV4Data.json');
const C = require('./core/conf');

class EnHome extends React.Component {
  constructor() {
    super();
    this.state = {
      activIndex: 0,
      loading: true,
      cacheMap: {},
      position: 'static',
    };
    this.offersData = [];
  }

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
    const doc = document;
    $(window).scroll(() => {
      const sTop = $(doc).scrollTop();
      if (sTop > 450) {
        if (this.state.position === 'static') {
          this.state.position = 'fixed';
          $('.nav-wraper').addClass('fixednav');
        }
      } else {
        if (this.state.position === 'fixed') {  // eslint-disable-line
          this.state.position = 'static';
          $('.nav-wraper').removeClass('fixednav');
        }
      }
      if (sTop > 490 && sTop < 1080) {
        $('.nav-wraper li').eq(0).addClass('active').siblings()
        .removeClass('active');
      } else if (sTop > 1080 && sTop < 1680) {
        $('.nav-wraper li').eq(1).addClass('active').siblings()
        .removeClass('active');
      } else if (sTop > 1680 && sTop < 2290) {
        $('.nav-wraper li').eq(2).addClass('active').siblings()
        .removeClass('active');
      } else if (sTop > 2290 && sTop < 3040) {
        $('.nav-wraper li').eq(3).addClass('active').siblings()
        .removeClass('active');
      } else if (sTop > 3040 && sTop < 5490) {
        $('.nav-wraper li').eq(4).addClass('active').siblings()
        .removeClass('active');
      } else if (sTop > 5490) {
        $('.nav-wraper li').eq(5).addClass('active').siblings()
        .removeClass('active');
      }
    });
    const middleOffers = this.fetchData('高中');
    const benkeOffers = this.fetchData('本科');
    const postgraduateOffers = this.fetchData('硕士');
    this.offersData = middleOffers.concat(benkeOffers, postgraduateOffers);
    this.offersData.sort(() => {
      return 0.5 - Math.random();
    });
    if (this.state.cacheMap.en_ranking_2017) return;
    this.rankFetchData('en_ranking_2017');
  }

  fetchData(ids) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/list/',
        query: { country: '英国', project: ids },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data.results;
        this.setState({
          loading: false,
        });
      },
    });
    return d;
  }

  switchRank(alias) {
    const { cacheMap } = this.state;
    if (cacheMap[alias]) return;
    this.rankFetchData(alias);
  }

  rankFetchData(ids, asy = false) {
    if (this.state.cacheMap[ids]) {
      return this.state.cacheMap[ids];
    }
    let d;
    const { cacheMap } = this.state;
    const self = this;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://sem.major.shunshunliuxue.com/ranking/college',
        query: { country: 'en', ranking: ids },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: asy,
      success: data => {
        const res = data.data.college_list[ids];
        cacheMap[ids] = res;
        d = res;
        self.setState({
          cacheMap,
        });
      },
    });
    return d;
  }

  render() {
    const bannerChildren = (<div className="rel1100"></div>);
    const floatChildren = (<div className="float"><Live800 classes={'live800 catch'} type="a" title={'抓住这次机会'} tips={'抓住这次机会'} /></div>);
    const { cacheMap } = this.state;
    return (
      <div className="en-home" id="en-home">
        <Header />
        <Banner bg={`${__CDN__}/public/img/enAllPic/home/banner-head.png`} childrens={bannerChildren} />
        <Nav navData={enHomeData.navContent} />
        <NavContent contentData={enHomeData.applyContent} />
        <Rank rankNav={enHomeData.rankNav} rankData={cacheMap} cacheMap={cacheMap} switchRank={alias => this.switchRank(alias)} />
        <div className="wd1000">
          <ServiceProcess mantitle="顺顺能帮你做什么？" />
          <Teacher usaV4Data={usaV4Data} />
          <Activity />
          <Offers offersData={this.offersData} />
          <Banner bg={`${__CDN__}/public/img/enAllPic/home/float.png`} childrens={floatChildren} />
        </div>
        <IntCRP majorTabData={majorTabData} />
        <SocityShun mainClass={'caotese'} h2={'顺顺留学·靠谱的留学机构'} subtitle={''} />
        <BotFormData h2title={'顺顺英国，只给你最满意的结果！'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'立即咨询'} />
        <TestEnroll qudao_details={'SEM/英国v2院校排名PC/排名/测试录取率'} h2title={'测试录取率'} btnSubmitTitle={'提交'} />
        <TestEnroll qudao_details={'SEM/英国v2首页PC/研究生/去评估'} h2title={'评估研究生'} btnSubmitTitle={'提交'} modelId="master" />
        <TestEnroll qudao_details={'SEM/英国v2首页PC/本科/去评估'} h2title={'评估本科'} btnSubmitTitle={'提交'} modelId="undergraduate" />
        <AbroadForm apply_contry={'英国'} qudao_details={'SEM/英国v2首页PC/底部/获得申请方案'} />
        <SuccessModal />
        <PageInterModals country="uk" circle={1} time1={5000} time2={7000} time3={7000} time4={600000} ceyiceQudaoDetails={'SEM/英国v2首页PC/弹层/测一测/'} baomingQudaoDetail={'SEM/英国v2首页PC/弹层/报名/'} baogao="newhk" />
        {/* <PageInterModals country="uk" circle={1} time1={10000} time2={10000} time3={10000} ceyiceQudaoDetails={'SEM/英国v2首页PC/弹层/测一测/'} baomingQudaoDetail={'SEM/英国v2首页PC/弹层/报名/'} /> */}
      </div>
    );
  }
}

ReactDOM.render(<EnHome />, document.getElementById('app'));
