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

const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Live800 = require('./components/Live800');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityTs');
const Yuyue = require('./components/Yuyue/Yuyue1');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const AbroadNatrue = require('./components/usahot/AbroadNature/AbroadNatrue');
// const ServiceProcess = require('./components/usahot/ServiceProcess/ServiceProcess');
const ServiceProcess = require('./components/ServiceProcess/ServiceProcess');
const C = require('./core/conf');
const PageInterModals = require('./components/PageInterModals/PageInterModals');
const usaV4Data = require('./components/usahot/ExtraData/usaV4Data.json');
const EnrollTab = require('./components/usahot/EnrollTable/EnrollTab');


class UserAgent extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      acdecindex: 0,
      position: 'static',
    };
    this.bData = [];
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
          $('.navmenu').addClass('fixednav');
        }
      } else {
        if (this.state.position === 'fixed') {  // eslint-disable-line
          this.state.position = 'static';
          $('.navmenu').removeClass('fixednav');
        }
      }
      if (sTop > 1826 && sTop < 2364) {
        $('.tabnav li').find('a').removeClass('active');
        $('.fixnav li').eq(0).find('a').addClass('active')
          .end()
          .siblings()
          .find('a')
          .removeClass('active');
      } else if (sTop > 2364 && sTop < 4290) {
        $('.tabnav li').find('a').removeClass('active');
        $('.fixnav li').eq(1).find('a').addClass('active')
          .end()
          .siblings()
          .find('a')
          .removeClass('active');
      } else if (sTop > 4290) {
        $('.tabnav li').find('a').removeClass('active');
        $('.fixnav li').eq(2).find('a').addClass('active')
          .end()
          .siblings()
          .find('a')
          .removeClass('active');
      } else {
        $('.tabnav li').eq(this.state.activeIndex).find('a').addClass('active');
        $('.fixnav li').find('a').removeClass('active');
      }
    });
    // $('.listddata').eq(0).find('.listdesc').animate({ width: '402px' }, 500);
  }

  gotopage(evt, top) {
    $(evt.currentTarget).addClass('active').parent().siblings()
      .find('a')
      .removeClass('active');
    $('.tabnav li').find('a').removeClass('active');
    $('html,body').animate({
      scrollTop: top,
    }, 1000);
  }

  handClickBtn(evt, activeIndex) {
    evt.preventDefault();
    $('.tabnav li').find('a').addClass('active').end()
      .siblings()
      .find('a')
      .removeClass('active');
    $('body,html').animate({ scrollTop: 450 }, 1000);
    this.setState({
      activeIndex,
    });
  }

  handClickVisitor(evt, acdecindex) {
    evt.preventDefault();
    this.setState({
      acdecindex,
    });
  }

  fetchData(ids) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/list/',
        query: { country: '美国', project: ids },
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

  render() {
    const bannerChildren = (<div className="rel1100"></div>);
    const { activeIndex, acdecindex } = this.state;
    const contentIndex = usaV4Data.shunshunWhyData[activeIndex];
    const mainTitleData = usaV4Data.mainTitleData[activeIndex];
    const visitorData = usaV4Data.teacherData.listdescData[acdecindex];
    const masterData = this.fetchData('硕士');
    const underGraduateData = this.fetchData('本科');
    const midData = this.fetchData('高中');
    const allData = [];
    allData.push(...masterData, ...underGraduateData, ...midData);
    const bData = this.bData || [];
    while (allData.length) {
      const indIndex = ~~(Math.random() * allData.length); // eslint-disable-line
      bData.push(allData[indIndex]);
      allData.splice(indIndex, 1);
    }
    if (!this.bData.length) {
      this.bData = bData;
    }
    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/usaV4/usa-v4-banner-new.jpg`} childrens={bannerChildren} />
        <div className="rel1920 navmenu">
          <div className="rel1100">
            <div className="subnav">
              <ul className="tabnav">
                {usaV4Data.tabnavData.map((item, index) => {
                  return (
                    <li key={Math.random()} onClick={(evt) => this.handClickBtn(evt, index)}>
                      <a href="javascript:void(0)" className={`${index === activeIndex ? 'active' : ''}`}>{item.item}</a>
                    </li>
                  );
                })}
              </ul>
              <ul className="fixnav" id="mainNav1">
                {usaV4Data.fixnavData.map((item) => {
                  return (
                    <li key={Math.random()}><a href="javascript:void(0)" onClick={(evt) => this.gotopage(evt, item.top)}>{item.item}</a></li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="shunadvantage">
              <h2>{mainTitleData.tit}</h2>
              <div key={Math.random()} className="content-header">
                <div className="difficult">
                  <div className="difficult-title">难么？</div>
                  <div className="difficult-xishu clearfix">
                    <div className="difficult-xishu-title"><span>申请难度系数</span></div>
                    <div className="difficult-xishu-list">
                      {contentIndex.xishuData.map((v, i) => {
                        const arr = [1, 2, 3, 4, 5];
                        const num = v.bot1 === '0.5' ? parseFloat(v.bot) + 1 : parseFloat(v.bot);
                        const score = parseFloat(v.bot) + parseFloat(v.bot1);
                        const realScore = score.toString().length === 1 ? (`${score}.0`) : score;
                        return (
                          <div className={`xishu-list ${i === (contentIndex.xishuData.length - 1) ? 'enddiv' : ''} ${activeIndex > 0 ? 'xishu-listte' : ''}`} key={Math.random()}>
                            <div className="xishu-list-top">{v.top}</div>
                            <div className="wangxun"><Live800 classes={'live800'} title={''} type={'a'} tips={''} /></div>
                            <div className="xishu-list-bot">
                              {arr.slice(0, v.bot).map(() => {
                                return (
                                  <em key={Math.random()}>&nbsp;</em>
                                );
                              })}
                              {v.bot1 === '0.5' ? <em className="half" key={Math.random()}>&nbsp;</em> : ''}
                              {arr.slice(num).map(() => <em className="hui" key={Math.random()}>&nbsp;</em>)}{realScore}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="difficult-addscore clearfix">
                    <div className="difficult-addscore-title"><span>申请加分系数</span></div>
                    <div className="difficult-xishu-list">
                      {contentIndex.addscoreData.map((v, i) => {
                        const arr = [1, 2, 3, 4, 5];
                        const num = v.bot1 === '0.5' ? parseFloat(v.bot) + 1 : parseFloat(v.bot);
                        const score = parseFloat(v.bot) + parseFloat(v.bot1);
                        const realScore = score.toString().length === 1 ? (`${score}.0`) : score;
                        return (
                          <div className={`xishu-list ${i === (contentIndex.xishuData.length - 1) ? 'enddiv' : ''} ${activeIndex > 0 ? 'xishu-listte' : ''}`} key={Math.random()}>
                            <div className="xishu-list-top">{v.top}</div>
                            <div className="wangxun"><Live800 classes={'live800'} title={''} type={'a'} tips={''} /></div>
                            <div className="xishu-list-bot">
                              {arr.slice(0, v.bot).map(() => {
                                return (
                                  <em key={Math.random()}>&nbsp;</em>
                                );
                              })}
                              {v.bot1 === '0.5' ? <em className="half" key={Math.random()}>&nbsp;</em> : ''}
                              {arr.slice(num).map(() => <em className="hui" key={Math.random()}>&nbsp;</em>)}{realScore}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="remark">{contentIndex.remarkData.redata}
                    <EnrollTab qudao_details={`${contentIndex.remarkData.qudaodetail}`} wrapModalTitle={'基本信息'} btnTitle={'在线留学评估 >>'} mainTitle={'在线留学评估'} closebtn={'放弃评估'} defaultProgram={'选择申请项目'} defaultSchool={'选择最高学历'} defaultState={'选择学业状态'} />
                  </div>
                </div>
                <div className="price">
                  <div className="price-title">难么？</div>
                  <div className="price-subtitle">
                    {contentIndex.pricedata}<Live800 classes={'live800'} title={'对比各个国家研究生费用 >>'} type={'a'} tips={'对比各个国家研究生费用 >>'} />
                  </div>
                  <div className="schoolfee">
                    <div className="confee">
                      <div className="confee-title">学费</div>
                      <div className="confee-desc">
                        {contentIndex.schoolfeeData.map((b) => {
                          return (
                            <p key={Math.random()}>{b.desc}</p>
                          );
                        })}
                      </div>
                      {activeIndex === 0 ? <div className="confee-mark">{contentIndex.mark}</div> : ''}
                    </div>
                    <div className="confee enddiv">
                      <div className="confee-title">生活费</div>
                      <div className="confee-desc">
                        {contentIndex.schoolfeeData1.map((b) => {
                          return (
                            <p key={Math.random()}>{b.desc}</p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="querybtn">
                    <Live800 classes={'live800'} title={'咨询心仪大学费用'} type={'a'} tips={'咨询心仪大学费用'} />
                  </div>
                </div>
                <div className="nowdo">
                  <div className="price-title">现在怎么做？</div>
                  <div className="nowdo-list">
                    <div className="listdo">
                      <div className="listdo-l">第一步：</div>
                      <div className="listdo-r">
                        <div className="listdo-r-t">{contentIndex.nowdodata.listdol}</div>
                        <div className="listdo-r-b">
                          {contentIndex.nowdodata.listdor}<Live800 classes={'live800'} title={'咨询顾问详情'} type={'a'} tips={'咨询顾问详情'} />
                        </div>
                      </div>
                    </div>
                    <div className="listdo">
                      <div className="listdo-l">第二步：</div>
                      <div className="listdo-r">
                        <div className="listdo-r-t">{contentIndex.nowdodata1.listdol}</div>
                        <div className="listdo-r-b">
                          {contentIndex.nowdodata1.listdor}
                          <Live800 classes={'live800'} title={`${contentIndex.nowdodata1.titleBtn}`} type={'a'} tips={`${contentIndex.nowdodata1.titleBtn}`} />
                          {contentIndex.nowdodata1.listdobi}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ques">
                  <div className="ques-title">在线解答常见问题</div>
                  <div className="queslist">
                    <div className="ques-con">
                      <div className="ques-con-left"><img src={require('../img/usaAllPic/usaV4/usa-v4-qus1.png')} alt="" /></div>
                      <div className="ques-con-desc">
                        {contentIndex.ques.map((ibv, inx) => {
                          return (
                            <p className={`${inx === 0 ? 'testp' : ''}`} key={Math.random()}><Live800 classes={'live800'} title={ibv.item} type={'a'} tips={ibv.item} /></p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="ques-con">
                      <div className="ques-con-left"><img src={require('../img/usaAllPic/usaV4/usa-v4-qus2.png')} alt="" /></div>
                      <div className="ques-con-desc">
                        {contentIndex.ques1.map((ibs) => {
                          return (
                            <p key={Math.random()}><Live800 classes={'live800'} title={`${ibs.item}`} type={'a'} tips={`${ibs.item}`} /></p>
                          );
                        })}
                        <p><Live800 classes={'live800 teseaa'} title={'其他问题点击咨询 >>'} type={'a'} tips={'其他问题点击咨询 >>'} /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 section serviceprocess" id="fixed01">
          <ServiceProcess circleColor="#6730d4" arrowColor="arrow-color" arrowHidden="arrow-hidden" borderStyle="border-style" />
        </div>
        <div className="rel1920 section" id="fixed02">
          <div className="rel1100">
            <div className="schoolrank">
              <h2>除了申请院校，顺顺还能给你提供什么？</h2>
              <div className="teacher">
                <div className="teacher-title">顶尖师资——前哈佛招生委员带领常青藤外教</div>
                <div className="teacher-list clearfix">
                  <div className="listimg">
                    {usaV4Data.teacherData.listimgData.map((item, index) => {
                      return (
                        <div className={`listddata ${index === acdecindex ? 'active' : ''}`} key={Math.random()}>
                          <div className="smallPic" ref={`smallPic${index}`} onClick={evt => this.handClickVisitor(evt, index)}>
                            <img src={`/public/img/usaAllPic/usaV4/visitor-sm${index + 1}.jpg`} alt={item.altTitle} />
                            <p>{item.schoolname}</p>
                          </div>
                          <div className={`listdesc ${index === acdecindex ? 'active' : ''}`} ref={`listdesc${index}`}>
                            <div className="listdesc-img"><img src={`/public/img/usaAllPic/usaV4/visitor${acdecindex + 1}.png`} alt="" /></div>
                            <div className="listbox">
                              <div className="listdesc-title">{visitorData.name}</div>
                              <div className="listdesc-pp">
                                {visitorData.listdescPp.map((items, dindex) => {
                                  return (
                                    <p key={Math.random()} className={`${dindex === (visitorData.listdescPp.length - 1) ? 'suhu' : ''}`}><em>&nbsp;</em><i>{items.p}</i></p>
                                  );
                                })}
                              </div>
                              <div className="listdesc-query">
                                <Yuyue btnTitle={'向他提问'} wrapModalTitle={'向他提问'} submitBtn={'提交'} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="schoolbackroung">
                <div className="schoolbackroung-title">背景活动·为简历加分，更高名校录取</div>
                <div className="schoolbackrounglist">
                  <div className="schoolbackrounglist-left"><img src={require('../../public/img/usaAllPic/usaV4/usa-v4-score.png')} alt="" /></div>
                  <div className="schoolbackrounglist-right">
                    <div className="schoolbackrounglist-right-title">原创、有效活动，提高录取率</div>
                    <div className="schoolbackrounglist-right-desc">
                      <div className="schoolbackrounglist-list-query">专为留美学生定制，如<Live800 classes={'live800'} title={'美国国会实习'} type={'a'} tips={'美国国会实习'} />、
                        <Live800 classes={'live800'} title={'哈佛耶鲁实验室项目'} type={'a'} tips={'哈佛耶鲁实验室项目'} />、
                        <Live800 classes={'live800'} title={'名校影响力训练营'} type={'a'} tips={'名校影响力训练营'} />、
                        <Live800 classes={'live800'} title={'国际期刊论文发表'} type={'a'} tips={'国际期刊论文发表'} />、
                        <Live800 classes={'live800'} title={'500强实习'} type={'a'} tips={'500强实习'} />、
                        <Live800 classes={'live800'} title={'机器人训练营'} type={'a'} tips={'机器人训练营'} />、
                        <Live800 classes={'live800'} title={'夏威夷志愿者'} type={'a'} tips={'夏威夷志愿者'} />等活动，从领导力、科研能力、论文能力、社会责任感等更方面设置活动，
                        更加符合美国院校的录取要求，提高录取率！</div>
                      <div className="schoolbackrounglist-right-time">具体活动的时间、费用、剩余名额不同，请咨询获取</div>
                    </div>
                    <div className="detailquery"><Live800 classes={'live800'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
                  </div>
                </div>
              </div>
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
              <div className="applyplan">
                <div className="applyplan-title">极致服务——申请透明可跟踪，服务不满闪电退费</div>
                <div className="applyplan-desc">
                  <div className="applyplan-desc-left">
                    <div className="list-dot"><em>&nbsp;</em>顺顺CRP系统——学生端</div>
                    <div className="listdesc">学生可通过电脑或手机，实时查看每一项的进度，并提交老 师需要的材料</div>
                    <div className="list-dot"><em>&nbsp;</em>微信QQ</div>
                    <div className="listdesc">签约后绑定个人微信，每个留学的关键点微信提醒，并通过微信QQ和老师日常沟通</div>
                    <div className="list-dot"><em>&nbsp;</em>电话</div>
                    <div className="listdesc">重要决策的当面或电话沟通、确认，一切以学生申请满意为目的</div>
                    <div className="list-dot"><em>&nbsp;</em>邮件</div>
                    <div className="listdesc">用来发送重要文件，以及申请信息提交、录取后的offer转发</div>
                    <div className="markbeizhu"><em>*</em>顺顺承诺，服务不满意，确认无误15天内退款</div>
                    <div className="querybtn"><Live800 classes={'live800'} title={'了解全程透明的顺顺系统'} type={'a'} tips={'了解全程透明的顺顺系统'} /></div>
                  </div>
                  <div className="applyplan-desc-right">
                    <img src={require('../../public/img/usaAllPic/usaV4/usa-v4-service.png')} alt="" />
                  </div>
                </div>
              </div>
              <div className="botbaner">
                <Live800 classes={'live800'} title={'抓住这次机会'} type={'a'} tips={'抓住这次机会'} />
              </div>
            </div>
          </div>
        </div>
        <div id="fixed03" className="section"></div>
        <SocityShun mainClass={'caotese'} h2={'顺顺留学·靠谱的留学机构'} subtitle={'顺顺留学是上市教育集团“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。'} />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V4聚合页PC/底部表单/获得申请方案'} />
        <BotFormData h2title={'和1/5留美学生一起，入读理想学校吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'找顺顺·读名校'} />
        <SuccessModal />
        <AbroadNatrue />
        <PageInterModals circle={1} time1={4000} time2={6000} time3={6000} time4={600000} ceyiceQudaoDetails={'SEM/美国V4聚合页PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V4聚合页PC/弹层/报名'} baogao="newhk" />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

