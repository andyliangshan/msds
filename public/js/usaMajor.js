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

const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Live800 = require('./components/Live800/Live800');
const majorTabData = require('./components/usahot/ExtraData/majorTabData.json');
// const ServiceProcess = require('./components/usahot/ServiceProcess/ServiceProcess');
const ServiceProcess = require('./components/ServiceProcess/ServiceProcess');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const Yuyue = require('./components/Yuyue/Yuyue1');
const AbroadNatrue = require('./components/usahot/AbroadNature/AbroadNatrue');
const PageInterModals = require('./components/PageInterModals/PageInterModals2');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityMajor');
const C = require('./core/conf');

class UsaReMajor extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      acdecindex: 0,
      position: 'static',
    };
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
      const $wTop = $('#shunDoWhat-header').offset().top;
      const $pTop = $('#shunsocity-price').offset().top;
      if (sTop >= 450) {
        if (this.state.position === 'static') {
          this.state.position = 'fixed';
          $('.tab-header').addClass('fixednav');
        }
      } else {
        if (this.state.position === 'fixed') {  // eslint-disable-line
          this.state.position = 'static';
          $('.tab-header').removeClass('fixednav');
        }
      }
      if (sTop >= $wTop && sTop < $pTop) {
        $('.tab-header li').removeClass('active');
        $('.fixednav li').eq(4).addClass('active');
      } else if (sTop >= $pTop) {
        $('.tab-header li').removeClass('active');
        $('.fixednav li').eq(5).addClass('active');
      } else {
        $('.tab-header li').removeClass('active');
        $('.tab-header li').eq(this.state.activeIndex).addClass('active');
      }
    });
  }

  leftBtnClick(evt) {
    evt.preventDefault();
    this.setState({
      activeIndex: this.state.activeIndex <= 0 ? this.state.activeIndex = 3 : this.state.activeIndex -= 1,
    });
  }

  rightBtnClick(evt) {
    evt.preventDefault();
    this.setState({
      activeIndex: this.state.activeIndex >= 3 ? this.state.activeIndex = 0 : this.state.activeIndex += 1,
    });
  }
  fetchData(classifs) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/list/',
        query: { country: '美国', project: classifs },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data.results;
      },
    });
    return d;
  }

  handClickVisitor(evt, acdecindex) {
    evt.preventDefault();
    evt.stopPropagation();
    setTimeout(() => {
      $(evt.currentTarget).find('.small').css({ diplay: 'none', width: '0px' })
        .end()
        .siblings()
        .find('.small')
        .css({ diplay: 'block', width: '119px' });
      $(evt.currentTarget).addClass('active').find('.big').addClass('active')
        .animate({
          width: '402px',
        }, 1000)
        .end()
        .siblings()
        .removeClass('active')
        .find('big')
        .removeClass('active');
    }, 100);
    this.setState({
      acdecindex,
    });
  }

  gotopage(evt, top) {
    $('html,body').animate({
      scrollTop: $(top).offset().top,
    }, 1000);
  }

  handClickBtn(evt, activeIndex) {
    evt.preventDefault();
    $('body,html').animate({ scrollTop: 450 }, 1000);
    this.setState({
      activeIndex,
    });
  }

  render() {
    const masterData = this.fetchData('硕士');
    const underGraduateData = this.fetchData('本科');
    const midData = this.fetchData('高中');
    const allData = [];
    allData.push(...masterData, ...underGraduateData, ...midData);
    const bData = [];
    while (allData.length) {
      const index = ~~(Math.random() * allData.length); // eslint-disable-line
      bData.push(allData[index]);
      allData.splice(index, 1);
    }
    const bannerChildren = (<div className="rel1100"></div>);

    const { acdecindex } = this.state;
    const detailData = majorTabData.detailData[acdecindex];
    return (
      <div id="usa-major">
        <Header />
        <Banner bg={`${__CDN__}/public/img/usa-hot/hotbanner/usa-major-banner.png`} childrens={bannerChildren} />
        <div className="rel1920">
          <div className="tab-header">
            <div className="rel1100">
              <ul className="row nav" role="tablist">
                {majorTabData.byone.map((item, index) => {
                  return (
                    <li role="presentation" onClick={(evt) => this.handClickBtn(evt, index)} className={`col-xs-3 ${index === this.state.activeIndex ? 'active' : ''}`} key={Math.random()}>
                      <a href={`#role${index + 1}`} aria-controls={`#role${index + 1}`} role="tab" data-toggle="tab" aria-expanded={index === 0 ? 'true' : 'false'}>{item.lidata}</a>
                    </li>
                  );
                })}
              </ul>
              <ul className="tab-fixed">
                <li onClick={evt => this.gotopage(evt, '#shunDoWhat-header')}>
                  <a href="javascript:void(0)">顺顺能给你什么？</a>
                </li>
                <li onClick={evt => this.gotopage(evt, '#shunsocity-price')}>
                  <a href="javascript:void(0)">顺顺靠谱么？</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rel1100">
            <div className="majorbox_con tab-content">
              <img src={require('../../public/img/usaAllPic/major/tab-left.png')} alt="" className="tab-img tab-left" onClick={evt => this.leftBtnClick(evt)} />
              <img src={require('../../public/img/usaAllPic/major/tab-right.png')} alt="" className="tab-img tab-right" onClick={evt => this.rightBtnClick(evt)} />
              {majorTabData.major_info.map((item, index) => {
                return (
                  <div role="tabpanel" className={`tab-pane major-tab-content ${index === this.state.activeIndex ? 'active' : ''}`} key={Math.random()} id={`role${index + 1}`}>
                    <div className="introduction">
                      <img src={require(`../../public/img/usaAllPic/major/${item.introduction.src}`)} alt="" />
                      <div className="introduction-info">
                        <p>{item.introduction.ptitle1}</p>
                        <span>{item.introduction.pinfo1}</span>
                        <p className="p2">{item.introduction.ptitle2}</p>
                        <span>{item.introduction.pinfo2}</span>
                      </div>
                    </div>
                    <div className="conditionAll">
                      <div className="condition">
                        <h2>{item.condition.chead}</h2>
                        {
                          item.condition.idata.map((citem) => {
                            return (
                              <p key={Math.random()}>
                                <b></b>
                                <em>{citem.ctitle}</em>
                                <span>{citem.cinfo}</span>
                              </p>
                            );
                          })
                        }
                        <Live800 classes={'live800 condition-btn'} title={item.condition.clink} type={'a'} tips={item.condition.clink} />
                      </div>
                      <div className="ask">
                        <p>点击想了解的专业，立即获得一对一咨询！</p>
                        <ul className="ask-table row">
                          {
                            item.ask.askList.map((asklist, aindex) => {
                              return (
                                <li className={`col-xs-3 ${(aindex === 3 || aindex === 7 || aindex === 11) ? 'four' : ''}`} key={Math.random()}>
                                  <div>
                                    {aindex === 11 ? <a href={item.ask.asrc} target="_blank" className="ask-one last">更多 &gt;&gt;</a> : <Live800 classes={'live800 ask-one'} title={asklist} type={'a'} tips={asklist} />}
                                  </div>
                                </li>
                              );
                            })
                          }
                        </ul>
                        <a href="http://lp.liuxue.com/usa/version3/schoolranking_2/" target="_blank" className="ask-btn">{item.ask.abtn}</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="shunDoWhat-header" id="shunDoWhat-header">
              <h3>顺顺能帮你做什么？</h3>
            </div>
          </div>
        </div>
        <ServiceProcess circleColor="#6730d4" arrowColor="arrow-color" borderStyle="border-style" />
        <div className="rel1920">
          <div className="rel1100">
            <div className="teacherh">
              <h2>顶尖师资·前哈佛招生委员带领常青藤外教</h2>
              <div className="teh-wrapper clearfix">
                <div className="teh-box">
                  {majorTabData.detailData.map((item, index) => {
                    return (
                      <div className={`teh-box-list ${index === acdecindex ? 'active' : ''}`} key={Math.random()} >
                        <div className="small" ref="small" onClick={evt => this.handClickVisitor(evt, index)}>
                          <img src={`/public/img/usaAllPic/major/guwenxiao${index}.png`} alt="" />
                        </div>
                        <div className={`big ${index === acdecindex ? 'active' : ''}`}>
                          <img src={`/public/img/usaAllPic/major/guwenqt_${index}.png`} alt="" />
                          <div className="detail" >
                            <p>{detailData.name}</p>
                            <div><em></em><div className="intro">{detailData.tips1}</div></div>
                            <div><em></em><div className="intro">{detailData.tips2}</div></div>
                            <div><em></em><div className="intro w200">{detailData.tips3}</div></div>
                            <div><em></em><div className="intro w180">{detailData.tips4}</div></div>
                            <Yuyue wrapModalTitle="向他提问" btnTitle="向他提问" submitBtn="提交" qudao_details="SEM/美国V3热门专业PC/外教/预约" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            {majorTabData.ActivityhData.map((item) => {
              return (
                <div className="bgActivity" key={Math.random()}>
                  <h2 dangerouslySetInnerHTML={{ __html: item.t1 }}></h2>
                  <div className="bgA-content">
                    <img src={item.img} alt="" />
                    <div className="co-right">
                      <h3>{item.t2}</h3>
                      <p>专为留美学生定制，如<Live800 classes={'live800'} title={'美国国会实习'} type={'a'} tips={'美国国会实习'} />、<Live800 classes={'live800'} title={'哈佛耶鲁实验室项目'} type={'a'} tips={'哈佛耶鲁实验室项目'} />、 <Live800 classes={'live800'} title={'名校影响力训练营'} type={'a'} tips={'名校影响力训练营'} />、<Live800 classes={'live800'} title={'国际期刊论文发表'} type={'a'} tips={'国际期刊论文发表'} />、<Live800 classes={'live800'} title={'500强实习'} type={'a'} tips={'500强实习'} />、<Live800 classes={'live800'} title={'机器人训练营'} type={'a'} tips={'机器人训练营'} />、<Live800 classes={'live800'} title={'夏威夷志愿者'} type={'a'} tips={'夏威夷志愿者'} />等活动，从科研能力、论文能力、社会责任感等各方面设置活动，更加符合美国院校的录取要求，提高录取率！</p>
                      <p className="second">{item.content2}</p>
                      <Live800 classes={'live800 purple'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="schoolrank-list">
              <div className="schoolrank-list-header">
                2017美国录取案例（持续更新中 ...）
              </div>
              <div className="schoolrank-list-body">
                {bData.map((item) => {
                  return (
                    <div className="schoolrankrow row" key={Math.random()}>
                      <div className="col-xs-2 ranknum">{item.name}</div>
                      <div className="col-xs-3 schoolname">{item.chinese_name}</div>
                      <div className="col-xs-1 location">{item.project}</div>
                      <div className="col-xs-3 enroll">
                        {item.exams.length ? item.exams.map((v) => {
                          return (<em key={Math.random()}>{v.exam_type} : {v.score || '暂无'}</em>);
                        }) : <em key={Math.random()}>暂无</em>}
                      </div>
                      <div className="col-xs-3 conditionfee">{item.school_name}</div>
                    </div>
                  );
                })}
              </div>
              <div className="querybtn"><Live800 classes={'live800'} title={'选顺顺·帮你申到理想'} type={'a'} tips={'选顺顺·帮你申到理想'} /></div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100 pd30">
            <div className="fservice">
              <h2>极致服务—申请透明可跟踪，服务不满闪电退费</h2>
              <div className="fs-left">
                {majorTabData.serviceData.map((item) => {
                  return (
                    <div key={Math.random()} className="l-top">
                      <p><em></em>{item.t1}</p>
                      <p className="spe">{item.text}</p>
                    </div>
                  );
                })}
                <p className="xuehua"><img src={require('../../public/img/usaAllPic/major/xuehua.png')} alt="" />顺顺承诺，服务不满意，确认无误15天内退款</p>
              </div>
              <div className="fs-right">
                <img src={require('../../public/img/usaAllPic/major/qq.png')} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100 centerBanner">
            <div className="find">
              <Live800 classes={'live800 live8001'} title={'抓住这次机会'} type={'a'} tips={'抓住这次机会'} />
            </div>
          </div>
        </div>
        <SocityShun />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V3热门专业PC/底部表单/申请方案'} />
        <BotFormData h2title={'和1/5留美学生一起，入读理想学校吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'找顺顺·读名校'} />
        <SuccessModal />
        <AbroadNatrue />
        <PageInterModals circle={2} time1={10000} time2={10000} time3={10000} ceyiceQudaoDetails={'SEM/美国V3热门专业PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V3热门专业PC/弹层/报名'} />
      </div>
    );
  }
}

ReactDOM.render(<UsaReMajor />, document.getElementById('app'));

