/**
 * Created by andy on 17/10/12.
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

const UtilNet = require('./core/UtilNet');

// public
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const PageInterModals = require('./components/PageInterModals/PageInterModals8');
const AbroadForm = require('./components/AbroadForm');
const TestEnroll = require('./components/TestEnroll/TestEnroll');
const SuccessModal = require('./components/SuccessModal');

// data
const majorTabData = require('./components/usahot/ExtraData/majorTabData.json');
const schoolRankingV4Data = require('./components/usahot/ExtraData/schoolrankingV4Data.json');
const usaV4Data = require('./components/usahot/ExtraData/usaV4Data.json');
// self
const HeaderInfo = require('./components/usahot/SchoolrankingV4/HeaderInfo');
const Teacher = require('./components/usahot/Teacher/Teacher');
const ServiceProcess = require('./components/ServiceProcess/ServiceProcess');
const Excellence = require('./components/usahot/MiddleV4/Excellence');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityService');
const Rank = require('./components/usahot/SchoolrankingV4/ranking');

class UsaSchoolRankingV4 extends React.Component {

  constructor() {
    super();
    this.state = {
      cacheMap: {},
      activeIdx: 0,
    };
  }
  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  render() {
    const bannerChildren = (<div className="rel1100"></div>);
    const bgColor = (<div className="bg-color"></div>);
    const teacherTitle = (<div className="teacher-title">顶尖师资——前哈佛招生委员带领常青藤外教</div>);
    const socityH2 = (<h2>顺顺留学<em>品牌介绍</em></h2>);
    const rankDataAll = schoolRankingV4Data.rankNav;
    return (
      <div id="middlev4">
        <Header />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-banner.jpg`} childrens={bannerChildren} />
        <HeaderInfo headerInfoData={schoolRankingV4Data.headerData} />
        <div className="rel1920">
          {rankDataAll.map((item, index) => {
            return (
              <div className="conbox" key={Math.random()}>
                <div className={`bgwidth ${(index % 2 === 0) ? 'bgrank' : ''}`} key={Math.random()}>
                  <div className="mainTitle">{item.commonTitle}<em>{item.changeTitle}</em></div>
                  <Rank rankNav={schoolRankingV4Data.rankNav[index]} firstIds={item.item[0].alias} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="rel1920 teshu">
          <div className="rel1000">
            <div className="h2title">顺顺留学的<em>独特优势</em></div>
            <Teacher usaV4Data={usaV4Data} title={teacherTitle} qudaoDetails={'SEM/美国V4排名PC/外教/向他提问'} />
            <ServiceProcess />
            <Excellence majorTabData={majorTabData} ref="excellence" />
          </div>
        </div>
        <SocityShun mainClass={'caotesesd'} h2={socityH2} subtitle={'顺顺留学是上市教育集团——“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。'} />
        <BotFormData h2title={'和1/5留美学生一起，入读理想学校吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'立即咨询'} bgColor={bgColor}>
          <div className="descinfo">
            {schoolRankingV4Data.descinfoData && schoolRankingV4Data.descinfoData.map((item, index) => {
              return (
                <div className={`${index === 2 ? 'infox enddiv' : 'infox'} ${index === 1 ? 'second' : ''}`} key={Math.random()}>
                  <div className="infox-pic"><img src={`${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-bot-icon${item.index}.png`} alt="" /></div>
                  <div className="infox-title">{item.title}</div>
                  <div className="infox-subtitle">{item.subTitle}</div>
                </div>
              );
            })}
          </div>
        </BotFormData>
        <PageInterModals country="usa" circle={1} time1={6000} time2={8000} ceyiceQudaoDetails={'SEM/美国V4排名PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V4排名PC/弹层/报名'} />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V4中学PC/吸底表单/获得申请方案'} />
        <TestEnroll qudao_details={'SEM/美国V4排名PC/院校排名/测录取率'} h2title={'评估录取率'} btnSubmitTitle={'提交'} modelId="middleV4" defaultIam="本科生" defaultProject={'硕士'} />
        <SuccessModal />
      </div>
    );
  }
}

ReactDOM.render(<UsaSchoolRankingV4 />, document.getElementById('app'));
