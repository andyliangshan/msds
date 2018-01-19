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
      activeIndex: 0,
      acdecindex: 0,
      position: 'static',
      activeIdx: 0,
      useragentIe8: false,
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

  handelShowJury(e, activeIdx) {
    e.preventDefault();
    this.setState({
      activeIdx,
    });
  }

  render() {
    const { activeIdx, useragentIe8 } = this.state;
    const titleImg = (<div className="timg"><img src={`${__CDN__}/public/img/usaAllPic/undergraduateV3/undergraduateV3-bot-text.png`} alt="" /></div>);
    const cyue = (<div className="yuyuetitle"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/glod_btn4.png`} alt="" /></div>);
    return (
      <div>
        <Header headClass={'blackHead'} />
        <div className="rel1920 banner">
          <div className="cont cont1"><div className="rel1000"></div></div>
          <div className="cont cont2"><div className="rel1000"></div></div>
        </div>
        <div className="rel1920 con1">
          <div className="rel1000">
            <div className="con-title"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/usa_v4_midschoo_tit1.png`} alt="" /></div>
            <div className="con-cont">
              {usaV4Data.con1Data && usaV4Data.con1Data.map((item, index) => {
                return (
                  <div className={`con-cont-4 ${index === 2 ? 'enddiv' : ''}`} key={Math.random()}>
                    <div className="con-cont-4-tit">{item.tit}</div>
                    <div className="con-cont-4-desc">
                      {index === 1 ? item.desc && item.desc.map((val) => {
                        return (
                          <p key={Math.random()}>{val.item}</p>
                        );
                      }) : item.desc && item.desc.map((val) => {
                        return (
                          <p key={Math.random()}><em>&nbsp;</em><i>{val.item}</i></p>
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
              {usaV4Data.con2Data && usaV4Data.con2Data.map((item, index) => {
                return (
                  <div className={`f1 ${index === 3 ? 'fn' : ''}`} key={Math.random()}>
                    <div className="f1-pic"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/usa_v4_midschoo_zsg_pel${item.id}.png`} alt="" /></div>
                    <div className="f1-box">
                      <div className="f1-box-name">{item.name}</div>
                      <div className="f1-box-desc" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                      <div className="f1-box-query">
                        <Yuyue qudao_details={'SEM/美国V4美国高中_1PC/招生官/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} blackBtn={'blackBtn'} childrens={cyue} /></div>
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
                  <Yuyue qudao_details={'SEM/美国V4美国高中_1PC/招生官视频/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} blackBtn={'blackBtn'} childrens={cyue} />
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
                        usaV4Data.jury && usaV4Data.jury.map((item, index) => {
                          return (
                            <li key={Math.random()} className={(index + 1) % 3 === 0 ? 'fl mr0' : 'fl'} onClick={(e) => this.handelShowJury(e, index)} >
                              <div className={activeIdx === index ? 'masked dn' : 'masked db'}></div>
                              <div className="jury-head">
                                <img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/${item.img}`} alt="" />
                              </div>
                              <div className={activeIdx === index ? 'jury-name db' : 'jury-name dn'}>{item.name}</div>
                            </li>
                          );
                        })
                      }
                    </ul>
                    <div className="jury-info fr">
                      <div className="info-head">
                        <img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/${usaV4Data.jury[activeIdx].img}`} alt="" />
                      </div>
                      <div className="zsg-name">
                        <strong>{usaV4Data.jury[activeIdx].name}</strong>
                      </div>
                      <div className="zsg-dsc" dangerouslySetInnerHTML={{ __html: usaV4Data.jury[activeIdx].description }}></div>
                      <div className="zsg-reverse" ><Yuyue qudao_details={'SEM/美国V4美国高中_1PC/尊享导师/预约尊享导师 '} btnTitle={'预约尊享导师'} wrapModalTitle={'预约尊享导师'} submitBtn={'提交'} blackBtn={'blackBtn'} childrens={cyue} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="re1920 con5">
          <div className="rel1000">
            <div className="con3-service">
              <h2><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/tese.png`} alt="" /></h2>
              <div className="service-info">
                {usaV4Data.infov20Data && usaV4Data.infov20Data.map((item, index) => {
                  return (
                    <div className={`infov20 ${index === 4 ? 'enddiv' : ''}`} key={Math.random()}>
                      <div className="infov20-title">{item.title}</div>
                      <div className="infov20-desc">{item.desc}</div>
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
                <div className="schoolrank-list-body">
                  <div className="rowdesc">前招生官团队美国寄宿高中录取情况（部分）</div>
                  <div className="rowHeader">
                    <div className="col-xs-3">排名</div>
                    <div className="col-xs-6">名称</div>
                    <div className="col-xs-3">录取人数</div>
                  </div>
                  {usaV4Data.rankingData.slice(0, 9).map((item) => {
                    return (
                      <div className="schoolrankrow row" key={Math.random()}>
                        <div className="col-xs-3 ranknum">{item.rank}</div>
                        <div className="col-xs-6 schoolname">{item.ename}<p>{item.cname}</p></div>
                        <div className="col-xs-3 enroll">{item.num}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="schoolrank-list-body enddiv">
                  <div className="rowdesc">前招生官团队美国寄宿高中录取情况（部分）</div>
                  <div className="rowHeader">
                    <div className="col-xs-3">排名</div>
                    <div className="col-xs-6">名称</div>
                    <div className="col-xs-3">录取人数</div>
                  </div>
                  {usaV4Data.rankingData.slice(9, 18).map((item) => {
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
          </div>
        </div>
        <AbroadForm apply_contry={'美国'} qudao_details={' SEM/美国V4美国高中_1PC/吸底表单/获得申请方案'} />
        <BotFormData bgImg={'/public/img/usaAllPic/usaV4_1/usa_v4_midschoo_bot_banner.jpg'} h2title={'和1/5留美学生一起，入读理想学校吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'联系我们'} childrens={titleImg} />
        <SuccessModal />
        <AbroadNatrue />
        <PageInterModals circle={1} time1={4000} time2={6000} time3={6000} time4={600000} ceyiceQudaoDetails={'SEM/美国V4美国高中_1PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V4美国高中_1PC/弹层/预约招生官'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

