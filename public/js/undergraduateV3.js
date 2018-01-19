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

require('../libs/slick-carousel/slick/slick');
require('../libs/slick-carousel/slick/slick.less');
require('../libs/slick-carousel/slick/slick-theme.less');
require('../libs/bootstrap/js/tooltip');

const UtilNet = require('./core/UtilNet');

const Header = require('./components/Header');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const Yuyue = require('./components/Yuyue/Yuyue2');
const Live800 = require('./components/Live800/Live800');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const AbroadNatrue = require('./components/usahot/AbroadNature/AbroadNatrue');
const PageInterModals = require('./components/PageInterModals/PageInterModals9');
const usaV4Data = require('./components/usahot/ExtraData/usaV4Data.json');


class UserAgent extends React.Component {

  constructor() {
    super();
    this.state = {
      useragentIe8: false,
      activeIndex: 0,
    };
  }

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
    if (navigator.appName === 'Microsoft Internet Explorer' && navigator.appVersion.match(/8./i) == '8.') { // eslint-disable-line
      const $this = this;
      $this.setState({
        useragentIe8: true,
      });
    }
    $('.banner').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    });
  }

  handMouseOverShowCase(evt, activeIndex) {
    evt.preventDefault();
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { activeIndex, useragentIe8 } = this.state;
    const titleImg = (<div className="timg"><img src={`${__CDN__}/public/img/usaAllPic/undergraduateV3/undergraduateV3-bot-text.png`} alt="" /></div>);
    const cyue = (<div className="yuyuetitle"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/glod_btn4.png`} alt="" /></div>);
    const caseData = usaV4Data.caseDadaUndergraduate[activeIndex];
    return (
      <div>
        <Header headClass={'blackHead'} />
        <div className="rel1920 banner">
          <div className="cont cont1"><div className="rel1000"></div></div>
          <div className="cont cont2"><div className="rel1000"></div></div>
        </div>
        <div className="rel1920 con1">
          <div className="rel1000">
            <div className="con-title"><img src={`${__CDN__}/public/img/usaAllPic/undergraduateV3/undergraduateV3-tit1.png`} alt="" /></div>
            <div className="con-cont">
              {usaV4Data.undergraduateCon1Data && usaV4Data.undergraduateCon1Data.map((item, index) => {
                return (
                  <div className={`con-cont-4 ${index === 3 ? 'enddiv' : ''}`} key={Math.random()}>
                    <div className="con-cont-4-tit">{item.tit}</div>
                    <div className="con-cont-4-desc">
                      {item.desc && item.desc.map((val) => {
                        return (
                          <p key={Math.random()}>{val.item}</p>
                        );
                      })}
                    </div>
                    <div className="querybtn"><Live800 classes={'live800 advisory'} title={'了解更多>>'} type={'a'} tips={'了解更多>>'} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="rel1920 con2">
          <div className="rel1000">
            <div className="con2-title"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/usa_v4_midschoo_tit2.png`} alt="" /></div>
            <div className="con2-list">
              {usaV4Data.undergraduateCon2Data && usaV4Data.undergraduateCon2Data.map((item, index) => {
                return (
                  <div className={`f1 ${index === 2 ? 'fn' : ''}`} key={Math.random()}>
                    <div className="f1-pic"><img src={`${__CDN__}/public/img/usaAllPic/undergraduateV3/undergraduateV3-zhsg${item.id}.png`} alt="" /></div>
                    <div className="f1-box">
                      <div className="f1-box-name">{item.name}</div>
                      <div className="f1-box-desc" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                      <div className="f1-box-query">
                        <Yuyue qudao_details={'SEM/美国V3美国本科PC/招生官/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} blackBtn={'blackBtn'} childrens={cyue} /></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="zhaosg-video" id="zhaosg-video">
              <div className="video">
                {useragentIe8 ? <div className="showimg"><img src={`${__CDN__}/public/img/enAllPic/home/poster.png`} alt="" /></div> :
                <video id="video" poster="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/home/poster.png" controls="true" height="100%" width="100%">
                  <source src="http://op1szwr44.bkt.clouddn.com/media/video/Erinn%20Andrews%20Case%20Study%201_1_0809-1.mp4" type="video/mp4" />
                </video>}
              </div>
              <div className="videodesc">
                <div className="videodesc-title">Erinn独家采访：中国学生申请美国名校</div>
                <div className="videodesc-ant">
                  <p>标准化成绩对结果影响多大？</p>
                  <p>课外活动重要么？</p>
                  <p>什么样的活动更受名校招生官青睐？</p>
                  <p>中国学生应该怎么提升综合竞争力？</p>
                  <Yuyue qudao_details={'SEM/美国V3美国本科PC/招生官视频/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} blackBtn={'blackBtn'} childrens={cyue} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 con3">
          <div className="rel1000">
            <div className="con3-title"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/usa_v4_midschoo_tit3.png`} alt="" /></div>
            <div className="con3-box">
              <div className="jury-wraper">
                <div className="jury-content wd1000">
                  <div className="jury-main clearfix">
                    <ul className="jury-list fl">
                      {
                        usaV4Data.undergraduateJuryData && usaV4Data.undergraduateJuryData.map((item, index) => {
                          return (
                            <li key={Math.random()} className={(index + 1) % 4 === 0 ? 'fl mr0' : 'fl'} >
                              <div className="jury-head">
                                <img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/${item.img}`} alt="" />
                              </div>
                              <div className="jury-info">
                                <div className="jury-cname">{item.name}</div>
                                <div className="jury-desc" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                              </div>
                              <div className="jury-query"><Yuyue qudao_details={'SEM/美国V3美国本科PC/尊享导师/预约尊享导师 '} btnTitle={'预约尊享导师'} wrapModalTitle={'预约尊享导师'} submitBtn={'提交'} blackBtn={'blackBtn'} childrens={cyue} /></div>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="re1920 con5">
          <div className="rel1000">
            <div className="con3-service">
              <h2><img src={`${__CDN__}/public/img/usaAllPic/undergraduateV3/undergraduateV3-tit2.png`} alt="" /></h2>
              <div className="service-info">
                {usaV4Data.con5Data && usaV4Data.con5Data.map((item, index) => {
                  return (
                    <div className={`infov20 line${index + 1}`} key={Math.random()}>
                      <div className="infov20-title">{item.tit}</div>
                      <div className="infov20-desc">
                        {item.desc.map(val => {
                          return (
                            <p key={Math.random()}>{val.item}</p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 section con4">
          <div className="rel1100">
            <div className="schoolrank">
              <div className="con4-title"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/usa_v4_midschoo_tit4.png`} alt="" /></div>
              <div className="schoolrank-list-header"><em>顺顺名校录取榜</em>只给你最满意的结果</div>
              <div className="schoolrank-list">
                <div className="schoolrank-list-body cob1">
                  <div className="rowdesc">尊享前招生官&外籍团队2015-2017本科录取情况（部分）</div>
                  <div className="rowHeader">
                    <div className="col-xs-3">排名</div>
                    <div className="col-xs-6">名称</div>
                    <div className="col-xs-3">录取人数</div>
                  </div>
                  {usaV4Data.schoolData.slice(0, 6).map((item) => {
                    return (
                      <div className="schoolrankrow row" key={Math.random()}>
                        <div className="col-xs-3 ranknum">{item.rank}</div>
                        <div className="col-xs-6 schoolname">{item.ename}<p>{item.cname}</p></div>
                        <div className="col-xs-3 enroll">{item.num}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="schoolrank-list-body enddiv cob1">
                  <div className="rowdesc">尊享前招生官&外籍团队2015-2017本科录取情况（部分）</div>
                  <div className="rowHeader">
                    <div className="col-xs-3">排名</div>
                    <div className="col-xs-6">名称</div>
                    <div className="col-xs-3">录取人数</div>
                  </div>
                  {usaV4Data.schoolData.slice(6, 12).map((item) => {
                    return (
                      <div className="schoolrankrow row" key={Math.random()}>
                        <div className="col-xs-3 ranknum">{item.rank}</div>
                        <div className="col-xs-6 schoolname">{item.ename}<p>{item.cname}</p></div>
                        <div className="col-xs-3 enroll">{item.num}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="schoolrank-list-body cob2">
                  <div className="rowdesc">尊享前招生官&外籍团队2015-2017本科录取情况（部分）</div>
                  <div className="rowHeader">
                    <div className="col-xs-3">排名</div>
                    <div className="col-xs-6">名称</div>
                    <div className="col-xs-3">录取人数</div>
                  </div>
                  {usaV4Data.schoolData.slice(12, 20).map((item) => {
                    return (
                      <div className="schoolrankrow row" key={Math.random()}>
                        <div className="col-xs-3 ranknum">{item.rank}</div>
                        <div className="col-xs-6 schoolname">{item.ename}<p>{item.cname}</p></div>
                        <div className="col-xs-3 enroll">{item.num}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="schoolrank-list-body enddiv cob2">
                  <div className="rowdesc">尊享前招生官&外籍团队2015-2017文理学院录取情况（部分）</div>
                  <div className="rowHeader">
                    <div className="col-xs-3">排名</div>
                    <div className="col-xs-6">名称</div>
                    <div className="col-xs-3">录取人数</div>
                  </div>
                  {usaV4Data.schoolData.slice(20, 28).map((item) => {
                    return (
                      <div className="schoolrankrow row" key={Math.random()}>
                        <div className="col-xs-3 ranknum">{item.rank}</div>
                        <div className="col-xs-6 schoolname">{item.ename}<p>{item.cname}</p></div>
                        <div className="col-xs-3 enroll">{item.num}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="casebox">
              <div className="caseimg">
                {usaV4Data.caseImgId && usaV4Data.caseImgId.map((item, index) => {
                  return (
                    <div className={`caseimgPic ${index === activeIndex ? 'active' : ''}`} onMouseEnter={(evt) => this.handMouseOverShowCase(evt, index)} key={Math.random()}>
                      <img src={`${__CDN__}/public/img/usaAllPic/undergraduateV3/undergraduateV3-mx${item.id}.png`} alt="" />
                    </div>
                  );
                })}
              </div>
              <div className="caseinfodesc">
                <div className="caseinfodesc-title">{caseData.title}</div>
                <div className="caseBaseinfo">
                  <div className="caseBaseinfo-name">{caseData.name}</div>
                  <div className="caseBaseinfo-offer">{caseData.offer}<em>{caseData.offerCont}</em></div>
                  <div className="caseBaseinfo-school">{caseData.school}<em>{caseData.schoolCont}</em></div>
                  <div className="caseBaseinfo-condition">{caseData.condition}<em>{caseData.conditionCont}</em></div>
                  <div className="caseBaseinfo-requires">{caseData.requires}</div>
                  <div className="caseBaseinfo-requires-desc">
                    {caseData.requiresDesc.map(ival => {
                      return (
                        <p key={Math.random()}>{ival.item}</p>
                      );
                    })}
                  </div>
                </div>
                <div className="semicircle">
                  <div className="left-circle"></div>
                  <div className="dotted-line"></div>
                  <div className="right-circle"></div>
                </div>
                <div className="caseindoIb">
                  <div className="caseindoIb-title">{caseData.caseindoIbTitle}</div>
                  {caseData.caseUbdi.map(vals => {
                    return (
                      <div key={Math.random()}>
                        <div className="caseindoIb-subtitle">{vals.caseindoIbSubtitle}</div>
                        <div className="caseindoIb-desc" dangerouslySetInnerHTML={{ __html: vals.caseindoIbDesc }}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 con6">
          <div className="rel1000">
            <div className="applymeritals">
              <div className="applymeritals-title"><img src={`${__CDN__}/public/img/usaAllPic/undergraduateV3/undergraduateV3-tit4.png`} alt="" /></div>
              <div className="applymeritalsTab">
                {usaV4Data.meritalsData.map((item, index) => {
                  return (
                    <div className={`applymeritalsTab-cont ${index === 1 ? 'enddiv' : ''}`} key={Math.random()}>
                      <div className="applymeritalsTab-cont-title">{item.title}</div>
                      <div className="responsesiveTable">
                        <div className="responsesiveTable-title">{item.subTitle}</div>
                        <div className="responsesiveTablebox">
                          {item.list.map(vals => {
                            return (
                              <div className="responsesiveTablebox-cont" key={Math.random()}>
                                <div className="responsesiveTablebox-cont-name">{vals.item}</div>
                                <div className="responsesiveTablebox-cont-query"><Live800 classes={'live800 advisory'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V3美国本科PC/吸底表单/获得申请方案'} />
        <BotFormData bgImg={'/public/img/usaAllPic/usaV4_1/usa_v4_midschoo_bot_banner.jpg'} h2title={'和1/5留美学生一起，入读理想学校吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'联系我们'} childrens={titleImg} />
        <SuccessModal />
        <AbroadNatrue />
        <PageInterModals circle={1} time1={4000} time2={6000} time3={6000} time4={600000} ceyiceQudaoDetails={'SEM/美国V3美国本科PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V3美国本科PC/弹层/预约招生官'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

