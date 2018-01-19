/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-promise').polyfill();
// require('whatwg-fetch');
require('fetch-ie8');
require('core-js/fn/object/assign');  //  Object.assign for ie8


// require('../libs/bootstrap/dist/js/bootstrap.min');
require('../libs/bootstrap/js/tooltip');
require('../libs/bootstrap/js/tab');


if (__DEV__) {
  require('console-polyfill');
}

const React = require('react');
const ReactDOM = require('react-dom');

const findDOMNode = ReactDOM.findDOMNode;

const UtilNet = require('./core/UtilNet');
// const C = require('./core/conf');
// component public
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const SuccessModal = require('./components/SuccessModal');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const AbroadForm = require('./components/AbroadForm');
const PageInterModals = require('./components/PageInterModals/PageInterModals7');
const C = require('./core/conf');
// const Live800 = require('./components/Live800');
// component self
const unversityData = require('./components/hk/data/universityData');
const majorTabData = require('./components/usahot/ExtraData/majorTabData.json');

const BannerTest = require('./components/hk/commonComponents/BannerTest');
const Rank = require('./components/hk/unversityComponents/Rank');
const AdmisCondition = require('./components/hk/unversityComponents/AdmisCondition');
const Case = require('./components/hk/unversityComponents/Case');
const Recommend = require('./components/hk/unversityComponents/Recommend');
const Advantage = require('./components/hk/unversityComponents/Advantage');
// const Slick = require('./components//hk/commonComponents/Slick');

class HkUniversity extends React.Component {
  constructor() {
    super();
    this.state = {
      navIndex: 0,
      offers: null,
    };
    this.logo = '';
    this.banner = '';
    this.schoolname = '';
    this.condition = '';
    this.rankInfo = '';
    this.position = {};
    this.id = 205497;
  }
  componentWillMount() {
    UtilNet.generateCookiePKID();
    const pathname = location.pathname;
    const schoolParam = pathname.split('/')[4];
    this.logo = `logo_${schoolParam}`;
    this.banner = `banner_${schoolParam}`;
    this.condition = unversityData.condition[schoolParam];
    this.rankInfo = unversityData.rankInfo[schoolParam];
    if (schoolParam === 'hkust') {
      this.schoolname = '香港科技大学';
      this.id = 218855;
      this.position = {
        backgroundPositionX: '-454px',
        backgroundPositionY: '0',
      };
    }
    if (schoolParam === 'cuhk') {
      this.schoolname = '香港中文大学';
      this.id = 205498;
      this.position = {
        backgroundPositionX: '-908px',
        backgroundPositionY: '0',
      };
    }
    if (schoolParam === 'cityu') {
      this.schoolname = '香港城市大学';
      this.id = 218857;
      this.position = {
        backgroundPositionX: '-1362px',
        backgroundPositionY: '0',
      };
    }
    if (schoolParam === 'polyu') {
      this.schoolname = '香港理工大学';
      this.id = 205500;
      this.position = {
        backgroundPositionX: '0',
        backgroundPositionY: '-410px',
      };
    }
    if (schoolParam === 'hkbu') {
      this.schoolname = '香港浸会大学';
      this.id = 205502;
      this.position = {
        backgroundPositionX: '-454px',
        backgroundPositionY: '-410px',
      };
    }
    if (schoolParam === 'lingnan') {
      this.schoolname = '香港岭南大学';
      this.id = 205503;
      this.position = {
        backgroundPositionX: '-908px',
        backgroundPositionY: '-410px',
      };
    }
    if (schoolParam === 'eduhk') {
      this.schoolname = '香港教育学院';
      this.id = 205506;
      this.position = {
        backgroundPositionX: '-1362px',
        backgroundPositionY: '-410px',
      };
    }
    if (schoolParam === 'hku') {
      this.schoolname = '香港大学';
      this.id = 205497;
      this.position = {
        backgroundPositionX: '0',
        backgroundPositionY: '0',
      };
    }
  }

  componentDidMount() {
    this.fetchData(this.id, 24);
  }

  goCollege(e, url) {
    e.preventDefault();
    window.open(url, '');
  }

  fetchData(id, num) { // 获取数据
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/elastic/',
        query: {
          filters: JSON.stringify({
            // year: [2016, 2017],
            project: ['本科', '硕士'],
            country: ['香港'],
            school_dmc_id: id,
            // school_ordering_range: [0, 1000],
          }),
          // order_by: JSON.stringify(['school__order', 'school__id']),
          page_size: num,
        },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        this.setState({
          offers: data.results,
        });
      },
    });
    return d;
  }

  switchNav(ev, index) { // 点击走你
    const e = ev || window.event;
    e.preventDefault();
    this.setState({
      navIndex: index,
    });
    const targetRef = findDOMNode(this.refs[e.target.getAttribute('data-ref')]);
    const targetHeight = targetRef.offsetTop;
    const speed = Math.floor(targetHeight / 800);
    const scrollMove = (scrollTo, count, time) => {
      const scrollFrom = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const every = 10;
      const scrollTop = parseInt(scrollTo, 10);
      time /= every; // eslint-disable-line
      const interval = setInterval(() => {
        count += 1; // eslint-disable-line
        document.body.scrollTop = document.documentElement.scrollTop = (((scrollTop - scrollFrom) / time) * count) + scrollFrom; // eslint-disable-line
        if (count >= time) {
          clearInterval(interval);
        }
      }, every);
    };
    scrollMove(targetHeight, speed, 250);
  }

  render() {
    const { navIndex, offers } = this.state;
    const logo = `${__CDN__}/public/img/hk/v1/university/${this.logo}.png`;
    const banner = `${__CDN__}/public/img/hk/v1/university/${this.banner}.png`;
    const BannerChild = <BannerTest bannerTest={unversityData.bannerTest} title="免费条件测评" country="香港" project="本科" qudao_details={`SEM/香港V1名校_${this.schoolname}PC/banner/预约评测`} />;
    return (
      <div className="university" id="hkFam">
        <Header />
        <Banner bg={banner} childrens={BannerChild} />
        <SuccessModal />
        <div className="content">
          <div className="nav-wraper">
            <nav className="nav wd1000 clearfix" ref="tab">
              <div className="select-unversity fl">
                <a className="logo"><img className="" src={logo} alt="" /></a>
                <span className="">{this.schoolname}</span>
                <a className="allow-down"></a>
                <ul className="university-list">
                  {
                    unversityData.nav.university.map(item =>
                      <li key={Math.random()} onClick={e => this.goCollege(e, item.url)}><a href={item.url} target="_blank">{item.name}</a></li>,
                    )
                  }
                </ul>
              </div>
              <ul className="nav-list fl">
                {
                  unversityData.nav.table.map((item, index) =>
                    <li key={Math.random()} className={index === (unversityData.nav.table.length - 1) ? 'last-nav' : ''}>
                      <span className={index === navIndex ? 'active' : ''} data-ref={item.ref} onClick={(e) => this.switchNav(e, index)}>{item.name}</span>
                    </li>,
                  )
                }
              </ul>
            </nav>
          </div>
          <Rank schoolname={this.schoolname} rankInfo={this.rankInfo} ref="rank" />
          <AdmisCondition schoolname={this.schoolname} ref="admis" condition={this.condition} />
          <Case schoolname={this.schoolname} offers={offers} ref="case" />
          <Recommend schoolname={this.schoolname} ref="recomend" position={this.position} />
          <Advantage majorTabData={majorTabData} schoolname={this.schoolname} ref="advantage" />
          <BotFormData h2title={'顺顺留学，让88.7%学生入读理想院校'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'咨询一下'} />
        </div>
        <PageInterModals circle={2} time1={10000} time2={10000} ceyiceQudaoDetails={`SEM/香港V1名校_${this.schoolname}PC/弹层/测一测`} baomingQudaoDetail={`SEM/香港V1名校_${this.schoolname}PC/排名/测录取率`} />
        <AbroadForm apply_contry={'香港'} modelId="hkScholl" qudao_details={`SEM/香港V1名校_${this.schoolname}PC/吸底表单/获得申请方案`} />
      </div>
    );
  }
}

ReactDOM.render(<HkUniversity />, document.getElementById('app'));
