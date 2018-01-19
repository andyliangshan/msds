/**
 * Created by '苏萧' on 2017/7/26.
 */
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
const Header = require('./components/usahot/Zhaosg/Header');
const IntZsg = require('./components/usahot/Zhaosg/IntZsg');
const IntActivity = require('./components/usahot/Zhaosg/IntActivity');
const IntOffers = require('./components/usahot/Zhaosg/IntOffers');
const HeLiang = require('./components/usahot/Zhaosg/HeLiang');
const IntProcess = require('./components/usahot/Zhaosg/IntProcess');
const IntInfo = require('./components/usahot/Zhaosg/IntInfo');
const IntCRP = require('./components/usahot/Zhaosg/IntCRP');
const ZsgMari = require('./components/usahot/Zhaosg/ZsgMari');
// public
const Banner = require('./components/Banner');
const Live800 = require('./components/Live800/Live800');
const majorTabData = require('./components/usahot/ExtraData/majorTabData.json');
const AbroadForm = require('./components/AbroadForm');
// const ServiceProcess = require('./components/ServiceProcess/ServiceProcess');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const Yuyue = require('./components/Yuyue/Yuyue2');
const PageInterModals = require('./components/PageInterModals/PageInterModals6');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityTs');
const usaZhaosgData = require('./components/usahot/ExtraData/usaZhaosgData.json');
const C = require('./core/conf');

class UsaZhaosg extends React.Component {
  constructor() {
    super();
    this.state = {
      position: 'static',
      cash: false,
    };
    this.rankingdata = [];
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
      if (sTop > 706) {
        if (this.state.position === 'static') {
          this.state.position = 'fixed';
          $('.subnav').addClass('fixednav');
        }
      } else {
        if (this.state.position === 'fixed') {  // eslint-disable-line
          this.state.position = 'static';
          $('.subnav').removeClass('fixednav');
        }
      }

      if (sTop > 716 && sTop < 2231) {
        $('.subnavIn li').eq(0).find('a').addClass('active')
          .end()
          .siblings()
          .find('a')
          .removeClass('active');
      } else if (sTop > 2232 && sTop < 2833) {
        $('.subnavIn li').eq(1).find('a').addClass('active')
          .end()
          .siblings()
          .find('a')
          .removeClass('active');
      } else if (sTop > 2234 && sTop < 3607) {
        $('.subnavIn li').eq(2).find('a').addClass('active')
          .end()
          .siblings()
          .find('a')
          .removeClass('active');
      } else if (sTop > 3608) {
        $('.subnavIn li').eq(3).find('a').addClass('active')
          .end()
          .siblings()
          .find('a')
          .removeClass('active');
      } else {
        $('.subnavIn li').find('a').removeClass('active');
      }
    });
    const underGraduateData = this.fetchData('本科', 150);
    const midData = this.fetchData('高中', 80);
    this.rankingdata = underGraduateData.concat(midData);
    this.rankingdata.sort(this.sort);
  }

  sort() {
    return Math.random() > 0.5 ? -1 : 1;
  }

  gotopage(evt, top) {
    $(evt.currentTarget).addClass('active').parent().siblings()
      .find('a')
      .removeClass('active');
    $('html,body').animate({
      scrollTop: top,
    }, 1000);
  }

  fetchData(ids, num) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/elastic/',
        query: {
          filters: JSON.stringify({
            year: [2016, 2017],
            project: [ids],
            country: ['美国'],
            // school_ordering_range: [0, 1000],
          }),
          order_by: JSON.stringify(['school__order', 'school__id']),
          page_size: num,
        },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data.results;
        this.setState({
          cash: true,
        });
      },
    });
    return d;
  }

  render() {
    const bannerChildren = (<div className="wd1000 banner-head">
      <div className="yuyue-wraper">
        <Live800 classes={'live800 advisory'} title={'咨询详情'} type={'a'} tips={'活动详情'} />
        <Yuyue qudao_details={'SEM/美国招生官PC/banner/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} />
      </div>
    </div>);
    return (
      <div id="usa-zhaosg">
        <Header />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/zhaosg/banner-head-new.jpg`} childrens={bannerChildren} />
        <div className="rel1920 navmenu">
          <div className="rel1920">
            <nav className="subnav">
              <ul className="wd1000 clearfix navbar subnavIn" id="mainNav1">
                {usaZhaosgData.tabnav.map((item) =>
                  <li key={Math.random()}><a href="javascript:void(0)" onClick={(evt) => this.gotopage(evt, item.top)}><em>●</em>{item.name}</a></li>,
                )}
              </ul>
            </nav>
            <div>
              <IntZsg zsgData={usaZhaosgData.tabcontent.zsg} juryData={usaZhaosgData.tabcontent.jury} />
              <IntActivity activityData={usaZhaosgData.tabcontent.activity} />
              <IntOffers bData={this.rankingdata} />
              <HeLiang />
              <IntProcess />
              {/* <ServiceProcess /> */}
              <IntInfo />
              <IntCRP majorTabData={majorTabData} />
              <ZsgMari />
            </div>
            <SocityShun mainClass={'caotese'} h2={'顺顺留学·靠谱的留学机构'} subtitle={'顺顺留学是上市教育集团--“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。'} />
          </div>
        </div>
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国招生官PC/吸底表单/申请方案'} />
        <BotFormData h2title={'和1/5留美学生一起，入读理想学校吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'立即咨询'} />
        <PageInterModals circle={2} time1={10000} time2={10000} ceyiceQudaoDetails={'SEM/美国招生官PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国招生官PC/弹层/报名'} />
      </div>
    );
  }
}

ReactDOM.render(<UsaZhaosg />, document.getElementById('app'));

