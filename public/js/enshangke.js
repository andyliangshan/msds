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
const enskData = require('./components/usahot/ExtraData/enskData.json');
const majorTabData = require('./components/usahot/ExtraData/majorTabData.json');
const ServiceProcess = require('./components/usahot/ServiceProcess/ServiceProcess2');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const Yuyue = require('./components/Yuyue/Yuyue1');
const AbroadNatrue = require('./components/usahot/AbroadNature/AbroadNatrue');
const PageInterModals = require('./components/PageInterModals/PageInterModals5');
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
      const $eTop = $('#enter').offset().top - 60;
      const $sTop = $('#school').offset().top - 60;
      const $wTop = $('#shunDoWhat-header').offset().top - 60;
      const $pTop = $('#shunsocity-price').offset().top - 60;
      if (sTop >= 450) {
        if (this.state.position === 'static') {
          this.state.position = 'fixed';
          $('.header-nav').addClass('fixednav');
        }
      } else {
        if (this.state.position === 'fixed') {  // eslint-disable-line
          this.state.position = 'static';
          $('.header-nav').removeClass('fixednav');
        }
      }
      if (sTop >= $eTop && sTop < $sTop) {
        $('.header-nav li').removeClass('active');
        $('.header-nav li').eq(1).addClass('active');
      } else if (sTop >= $sTop && sTop < $wTop) {
        $('.header-nav li').removeClass('active');
        $('.fixednav li').eq(2).addClass('active');
      } else if (sTop >= $wTop && sTop < $pTop) {
        $('.header-nav li').removeClass('active');
        $('.fixednav li').eq(3).addClass('active');
      } else if (sTop >= $pTop) {
        $('.header-nav li').removeClass('active');
        $('.fixednav li').eq(4).addClass('active');
      } else {
        $('.header-nav li').removeClass('active');
        $('.header-nav li').eq(this.state.activeIndex).addClass('active');
      }
    });
  }

  fetchData(classifs, pageSize) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/list/',
        query: { country: '英国', offer_major_type: '商科', project: classifs, page_size: pageSize },
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

  gotopage(evt, idname) {
    $('html,body').animate({
      scrollTop: $(idname).offset().top - 60,
    }, 1000);
  }

  openPanel(evt) {
    evt.preventDefault();
    const base800 = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=72111';
    const opened = `${base800}&clientId=${window.jzlvisitor_id.substr(0, 16)}`;
    /* eslint-disable */
    const centerWidth = window.innerWidth / 2 - 245;
    const centerHeight = window.innerHeight / 2 - 260;
    window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=520');
    /* eslint-enable */
  }

  render() {
    const masterData = this.fetchData('硕士', 75);
    const underGraduateData = this.fetchData('本科', 15);
    const allData = [];
    allData.push(...masterData, ...underGraduateData);
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
      <div id="en-sk">
        <Header />
        <Banner bg={`${__CDN__}/public/img/enAllPic/shangkePlan/en-sk-banner.png`} childrens={bannerChildren} />
        <div className="rel1920">
          <div className="header-nav">
            <div className="rel1100">
              <ul>
                {enskData.navTitle.map((item, index) => {
                  return (
                    <li style={{ marginRight: index === 4 ? '0' : '30px' }} key={Math.random()} onClick={evt => this.gotopage(evt, item.jump)} className={`${index === this.state.activeIndex ? 'active' : ''}`}>
                      <a href="javascript:void(0)">{item.header}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="introduction" id="introduction">
              <div className="intro-left">
                <h3>商科简介:</h3>
                <p>英国的商科专业，因其课程设置十分灵活、学制短、学位认可度高、就业前景广，这也让商科成为英国留学的热门专业，商科毕业后大多选择银行、投行、管理层、证券机构、咨询等行业</p>
                <h3 className="mg3">适合人群</h3>
                <ul>
                  <li><em></em>本科生在读，想获得含金量更高的硕士文凭</li>
                  <li><em></em>专科生在读，读商科硕士，比国内专升本省时认可度高</li>
                  <li><em></em>考研失利党，换个方向，获得更广阔的选择</li>
                  <li><em></em>已工作人士，提高工作平台，晋升高层</li>
                  <li><em></em>高中生在读，入读商科实力强的学校，为以后打基础</li>
                  <li><em></em>高考失利党，申请排名更好的大学，跨越独木桥</li>
                </ul>
              </div>
              <div className="intro-right">
                <p>点击想了解的专业，立即获得一对一咨询！</p>
                <div className="knowDetail">
                  <ul className="row">
                    {enskData.knowDetail.askList.map((askone, aindex) => {
                      return (
                        <li key={Math.random()} className={`col-xs-3 ${aindex === 3 || aindex === 7 || aindex === 11 ? 'last' : ''}`}>
                          <div>
                            {aindex === 11 ? <Live800 classes={'more'} title={'咨询更多>>'} type={'a'} tips={askone} /> : <Live800 classes={'live800 askone'} title={askone} type={'a'} tips={askone} />}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="ranking">
                    <a href="http://zt.shunshunliuxue.cn/en/#au_school_ranking" target="_blank">英国商科最新排名 &gt;&gt;</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="enter clearfix" id="enter">
              {enskData.enter.map((item, index) => {
                return (
                  <div className={`col-xs-5 ${index === 1 ? 'fee' : 'condition'}`} key={Math.random()}>
                    <img src={item.img} alt="" />
                    <div className="tips">
                      <h3>{item.title}</h3>
                      <ul>
                        <li><em></em>{item.t1}</li>
                        <li><em></em>{item.t2}</li>
                        <li><em></em>{item.t3}</li>
                        <li className="four"><em></em>{item.t4}</li>
                        <li><em></em>{item.t5}</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="school" id="school">
              <ul>
                {enskData.school.map((item, index) => {
                  return (
                    <li key={Math.random()} onClick={evt => this.openPanel(evt)} className={`col-xs-3 ${index === 3 || index === 7 ? 'four' : ''} ${index < 4 ? 'mgb30' : ''}`} >
                      <h3 className={`name ${(index < 3 ? 'blue' : '')}`}>{item.name}</h3>
                      <div className="mt">
                        <p className="major">{item.major}</p>
                        <p className="top">{item.top}</p>
                      </div>
                      <div className="det">
                        <Live800 classes={'live800'} type="a" title={'咨询这个学校 >>'} tips={'咨询这个学校 >>'} />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="zixun">
                <a href="http://lp.liuxue.com/en/famschool/" target="_blank" className="see knowAbout">了解院校详情</a>
                <Live800 classes={'live800 red knowAbout'} title={'更多推荐院校'} type={'a'} tips={'更多推荐院校'} />
              </div>
            </div>
          </div>
        </div>
        <ServiceProcess />
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
                            <Yuyue wrapModalTitle="向他提问" btnTitle="向他提问" submitBtn="提交" qudao_details="SEM/英国v2商科PC/底部/向他提问" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {majorTabData.ActivityhData.map((item) => {
              return (
                <div className="bgActivity" key={Math.random()}>
                  <h2 dangerouslySetInnerHTML={{ __html: item.t1 }}></h2>
                  <div className="bgA-content">
                    <img src={item.img} alt="" />
                    <div className="co-right">
                      <h3>{item.t2}</h3>
                      <p>专为商科专业定制，如
                        <Live800 classes={'live800'} title={'名校影响力训练营'} type={'a'} tips={'名校影响力训练营'} />、
                        <Live800 classes={'live800'} title={'国际期刊论文发表'} type={'a'} tips={'国际期刊论文发表'} />、
                        <Live800 classes={'live800'} title={'四大会计律师事务所实习'} type={'a'} tips={'四大会计律师事务所实习'} />、
                        <Live800 classes={'live800'} title={'TOP5证券公司实习'} type={'a'} tips={'TOP5证券公司实习'} />、
                        <Live800 classes={'live800'} title={'顶尖银行全职实习'} type={'a'} tips={'顶尖银行全职实习'} />
                        等活动，从领导力、论文能力、专业技能等更方面设置活动，更加符合商科专业的录取要求，提高录取率！</p>
                      <p className="second">{item.content2}</p>
                      <Live800 classes={'live800 red knowAbout'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="schoolrank-list">
              <div className="schoolrank-list-header">
                2017英国商科录取案例（持续更新中 ...）
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
              <div className="querybtn"><Live800 classes={'live800 knowAbout'} title={'选顺顺·帮你申到理想院校'} type={'a'} tips={'选顺顺·帮你申到理想院校'} /></div>
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
              <Live800 classes={'live800 red knowAbout'} title={'抓住这次机会'} type={'a'} tips={'抓住这次机会'} />
            </div>
          </div>
        </div>
        <SocityShun />
        <AbroadForm apply_contry={'英国'} qudao_details={'SEM/英国v2商科PC/底部/获得申请方案'} />
        <BotFormData h2title={'英国商科申请，顺顺只给你最满意的 '} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'咨询详情'} />
        <SuccessModal />
        <AbroadNatrue />
        <PageInterModals country={'uk'} circle={1} time1={10000} time2={10000} time3={10000} ceyiceQudaoDetails={'SEM/英国v2商科PC/弹层/测一测'} baomingQudaoDetail={'SEM/英国v2商科PC/弹层/报名'} />
      </div>
    );
  }
}

ReactDOM.render(<UsaReMajor />, document.getElementById('app'));

