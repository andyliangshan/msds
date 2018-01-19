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
const Live800 = require('./components/Live800');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityTsEn');
const Yuyue = require('./components/Yuyue/Yuyue1');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const AbroadNatrue = require('./components/usahot/AbroadNature/AbroadNatrue');
const ServiceProcess = require('./components/usahot/ServiceProcess/ServiceProcess1');
const C = require('./core/conf');
const PageInterModals = require('./components/PageInterModals/PageInterModals6');
const usaV4Data = require('./components/usahot/ExtraData/usaV4Data.json');
const EnrollTab = require('./components/usahot/EnrollTable/EnrollTab');
const Pipei = require('./components/Pipei/Pipei1');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');
const schooldataJson = require('./components/usahot/ExtraData/schoolrankingData.json');

class UserAgent extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      acdecindex: 0,
      subIndex: 0,
      subSindex: 0,
      position: 'static',
      alias: 'en_ranking_2017',
      cacheMap: {},
      cache: false,
      cacheZonghe: {},
    };
    this.bData = [];
    this.midschoolData = [];
    this.undergraduateData = [];
    this.cacheAllData = {};
    this.schoolDataBottom = [];
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
      if (sTop > 496) {
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
      if (sTop > 1364) {
        $('.fixnav li').find('a').addClass('active').end()
        .siblings()
        .find('a')
        .removeClass('active');
        $('.tabnav li').removeClass('active');
      } else {
        $('.tabnav li').eq(this.state.activeIndex).addClass('active');
        $('.fixnav li').find('a').removeClass('active');
      }
    });
    const val1 = this.fetchData('硕士');
    const val2 = this.fetchData('本科');
    const val3 = this.fetchData('高中');
    this.schoolDataBottom = val1.concat(val2, val3);
    this.schoolDataBottom.sort(this.sortArr);
    this.fetchDataMidSchool();
    this.fetchDataUndergraduate('en_ranking_2017');
    if (this.state.cacheMap.zonghe) return;
    this.singleFetchData('en_ranking_2017');
  }

  sortArr() {
    return Math.random() > 0.5 ? -1 : 1;
  }

  gotopage(evt) {
    $(evt.currentTarget).addClass('active');
    $('.tabnav li').removeClass('active');
    $('html,body').animate({
      scrollTop: 1368,
    }, 1000);
  }

  handClickBtn(evt, index) {
    evt.preventDefault();
    $('body,html').animate({ scrollTop: 450 }, 1000);
    this.setState({
      activeIndex: index,
    });
  }

  handClickVisitor(evt, acdecindex) {
    evt.preventDefault();
    this.setState({
      acdecindex,
    });
  }

  handClickSubContent(evt, subIndex, ids) {
    evt.preventDefault();
    this.setState({
      subIndex,
      subSindex: 0,
      alias: ids,
    });
    if (this.state.cacheMap[subIndex]) return;
    this.singleFetchData(ids);
  }

  handClickSubSdata(evt, subSindex, ids) {
    evt.preventDefault();
    setTimeout(() => {
      $('.rightdata').animate({ scrollTop: 0 }, 200);
    }, 0);
    this.setState({
      subSindex,
      alias: ids,
    });
    if (this.state.cacheMap[ids]) return;
    this.singleFetchData(ids);
  }

  fetchData(ids) {
    if (this.cacheAllData[ids]) {
      return this.cacheAllData[ids];
    }
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
        const dt = data.results;
        this.cacheAllData[ids] = dt;
        d = dt;
      },
    });
    return d;
  }

  fetchDataMidSchool() {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://sem.major.shunshunliuxue.com/ranking/college',
        query: { country: 'en', ranking: 'zhongxue' },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        const dt = data.data.college_list.zhongxue;
        this.midschoolData = dt;
        d = dt;
      },
    });
    return d;
  }

  fetchDataUndergraduate(ids) {
    if (this.state.cacheZonghe[ids]) {
      return this.state.cacheZonghe[ids];
    }
    let d;
    const { cacheMap } = this.state;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://sem.major.shunshunliuxue.com/ranking/college',
        query: { country: 'en', ranking: ids },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        const dt = data.data.college_list.en_ranking_2017;
        cacheMap[ids] = dt;
        this.undergraduateData = dt;
        d = dt;
        this.setState({
          cache: true,
        });
      },
    });
    return d;
  }

  singleFetchData(ids, asy = false) {
    if (this.state.cacheMap[ids]) {
      return this.state.cacheMap[ids];
    }
    let d;
    const { cacheMap } = this.state;
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
        this.setState({
          cacheMap,
        });
      },
    });
    return d;
  }

  render() {
    const bannerChildren = (<div className="rel1100"></div>);
    const { activeIndex, acdecindex, subIndex, subSindex, alias, cacheMap } = this.state;
    const visitorData = usaV4Data.teacherData.listdescData[acdecindex];
    const schoolNavData = schooldataJson.schoolData[subIndex];
    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/enAllpic/famouschool/enschoolranking.jpg`} childrens={bannerChildren} />
        <div className="rel1920 navmenu">
          <div className="rel1100">
            <div className="subnav">
              <ul className="tabnav" role="tablist">
                <li onClick={(evt) => this.handClickBtn(evt, 0)} className="active">
                  <a href="#rankdata1" aria-controls="#rankdata1" role="tab" data-toggle="tab" aria-expanded="true">研究生排名</a>
                </li>
                <li onClick={(evt) => this.handClickBtn(evt, 1)} className={activeIndex === 1 ? 'active' : ''}>
                  <a href="#rankdata2" aria-controls="#rankdata2" role="tab" data-toggle="tab" aria-expanded="false">本科排名</a>
                </li>
                <li onClick={(evt) => this.handClickBtn(evt, 2)} className={activeIndex === 2 ? 'active' : ''}>
                  <a href="#rankdata3" aria-controls="#rankdata3" role="tab" data-toggle="tab" aria-expanded="false">中学排名</a>
                </li>
              </ul>
              <ul className="fixnav" id="mainNav1">
                <li><a href="javascript:void(0)" onClick={(evt) => this.gotopage(evt)}>顺顺服务</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="shunadvantage tab-content">
              <div className="rankdata tab-pane active" role="tabpanel" id="rankdata1">
                <h2>研究生专业排名</h2>
                <ul className="masterlist">
                  {schooldataJson.masterank.map((item, index) => {
                    return (
                      <li key={Math.random()} className={`${index === (schooldataJson.masterank.length - 1) ? 'enddiv' : ''}`} onClick={evt => this.handClickSubContent(evt, index, schooldataJson.schoolData[index].snav[0].alias)}>
                        <a href="javascript:void(0)" className={`${index === subIndex ? 'active' : ''}`}>{item.val}</a>
                      </li>
                    );
                  })}
                </ul>
                <div className="schooldata">
                  {subIndex === 0 ?
                    <div className="listschooldata zonghe">
                      {this.undergraduateData && this.undergraduateData.map((item, index) => {
                        return (
                          <div className={`subdata row ${index === (this.undergraduateData.length - 1) ? 'enddiv' : ''}`} key={Math.random()}>
                            <div className={`col-xs-2 ranknum ${index === 0 ? 'first' : ''} ${index === 1 ? 'two' : ''} ${index === 2 ? 'three' : ''}`}>{item.ranking}</div>
                            <div className="col-xs-4 schoolname">
                              <p className="cname">{item.name}</p>
                              <p className="ename">{item.enname}</p>
                            </div>
                            <div className="col-xs-3 testenroll"><a href="javascript:void(0)" className="enroll" data-toggle="modal" data-target="#applyjpModalMaster">测录取率</a></div>
                            <div className="col-xs-3 condition"><Live800 classes={'live800'} title={'咨询录取条件'} type={'a'} tips={'咨询录取条件'} /></div>
                          </div>
                        );
                      })}
                    </div> :
                    <div className="listschooldata sk">
                      <div className="subnavdata">
                        <ul className="school-nav">
                          {schoolNavData.snav.map((item, index) => {
                            return (
                              <li key={Math.random()} onClick={evt => this.handClickSubSdata(evt, index, schoolNavData.snav[index].alias)}><a href="javascript:void(0)" className={`${index === subSindex ? 'active' : ''}`}>{item.item}</a></li>
                            );
                          })}
                        </ul>
                        <div className="links">
                          {(subIndex === 4 || subIndex === 6) ? '' : <a href={schoolNavData.links.link1} className="a1" target="_blank">查看心仪专业介绍&gt;&gt;</a>}
                          <a href={schoolNavData.links.link2} target="_blank">查看英国名校详情&gt;&gt;</a>
                        </div>
                      </div>
                      <div className="rightdata">
                        {cacheMap[alias].map((val, ind) => {
                          return (
                            <div className="subdata row" key={Math.random()}>
                              <div className={`col-xs-2 ranknum ${ind === 0 ? 'first' : ''} ${ind === 1 ? 'two' : ''} ${ind === 2 ? 'three' : ''}`}>{val.ranking}</div>
                              <div className="col-xs-4 schoolname">
                                <p className="cname">{val.name}</p>
                                <p className="ename">{val.enname}</p>
                              </div>
                              <div className="col-xs-3 testenroll"><a href="javascript:void(0)" className="enroll" data-toggle="modal" data-target="#applyjpModalMaster">测录取率</a></div>
                              <div className="col-xs-3 condition"><Live800 classes={'live800'} title={'咨询录取条件'} type={'a'} tips={'咨询录取条件'} /></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  }
                  {subIndex === 0 ?
                    <div className="querybtnas centerbtn">
                      <div className="download"><Pipei qudao_details={'SEM/英国v2院校排名PC/排名/下载资料'} wrapModalTitle={'免费下载排名'} submitBtn={'确定'} btnTitle={'免费下载排名'} /></div>
                      <div className="queryfee"><Live800 classes={'live800'} title={'咨询英国研究生费用'} type={'a'} tips={'咨询英国研究生费用'} /></div>
                    </div> : <div className="querybtnas rightbtn">
                      <div className="download"><Pipei qudao_details={'SEM/英国v2院校排名PC/排名/下载资料'} wrapModalTitle={'免费下载排名'} submitBtn={'确定'} btnTitle={'免费下载排名'} /></div>
                      <div className="queryfee"><Live800 classes={'live800'} title={'咨询英国研究生费用'} type={'a'} tips={'咨询英国研究生费用'} /></div>
                    </div>}</div>
              </div>
              <div className="rankdata tab-pane" role="tabpanel" id="rankdata2">
                <h2>本科排名</h2>
                <div className="listschooldata zonghe conb">
                  {this.undergraduateData && this.undergraduateData.map((item, index) => {
                    return (
                      <div className={`subdata row ${index === (this.undergraduateData.length - 1) ? 'enddiv' : ''}`} key={Math.random()}>
                        <div className={`col-xs-2 ranknum ${index === 0 ? 'first' : ''} ${index === 1 ? 'two' : ''} ${index === 2 ? 'three' : ''}`}>{item.ranking}</div>
                        <div className="col-xs-4 schoolname">
                          <p className="cname">{item.name}</p>
                          <p className="ename">{item.enname}</p>
                        </div>
                        <div className="col-xs-3 testenroll"><a href="javascript:void(0)" className="enroll" data-toggle="modal" data-target="#applyjpModalMaster">测录取率</a></div>
                        <div className="col-xs-3 condition"><Live800 classes={'live800'} title={'咨询录取条件'} type={'a'} tips={'咨询录取条件'} /></div>
                      </div>
                    );
                  })}
                </div>
                <div className="querybtnas centerbtn">
                  <div className="download"><Pipei qudao_details={'SEM/英国v2院校排名PC/排名/下载资料'} wrapModalTitle={'免费下载排名'} submitBtn={'确定'} btnTitle={'免费下载排名'} defaultShowCountry={'英国本科生排名'} /></div>
                  <div className="queryfee"><Live800 classes={'live800'} title={'咨询英国本科生费用'} type={'a'} tips={'咨询英国本科生费用'} /></div>
                </div>
              </div>
              <div className="rankdata tab-pane" role="tabpanel" id="rankdata3">
                <h2>中学排名</h2>
                <div className="listschooldata zonghe conb">
                  {this.midschoolData.map((item, index) => {
                    return (
                      <div className={`subdata row ${index === (this.midschoolData.length - 1) ? 'enddiv' : ''}`} key={Math.random()}>
                        <div className={`col-xs-2 ranknum ${index === 0 ? 'first' : ''} ${index === 1 ? 'two' : ''} ${index === 2 ? 'three' : ''}`}>{item.ranking}</div>
                        <div className="col-xs-4 schoolname">
                          <p className="cname">{item.name}</p>
                          <p className="ename">{item.enname}</p>
                        </div>
                        <div className="col-xs-3 testenroll"><a href="javascript:void(0)" className="enroll" data-toggle="modal" data-target="#applyjpModalMaster">测录取率</a></div>
                        <div className="col-xs-3 condition"><Live800 classes={'live800'} title={'咨询录取条件'} type={'a'} tips={'咨询录取条件'} /></div>
                      </div>
                    );
                  })}
                </div>
                <div className="querybtnas centerbtn">
                  <div className="download"><Pipei qudao_details={'SEM/英国v2院校排名PC/排名/下载资料'} wrapModalTitle={'免费下载排名'} submitBtn={'确定'} btnTitle={'免费下载排名'} defaultShowCountry={'英国高中生排名'} /></div>
                  <div className="queryfee"><Live800 classes={'live800'} title={'咨询英国高中生费用'} type={'a'} tips={'咨询英国高中生费用'} /></div>
                </div>
              </div>
            </div>
            <div className="enrallping">
              <EnrollTab qudao_details={'SEM/英国v2院校排名PC/小banner/背景评估'} wrapModalTitle={'基本信息'} defaultShowCountry={'英国'} />
            </div>
          </div>
        </div>
        <div className="rel1920 section serviceprocess" id="fixed01">
          <ServiceProcess subTitle={'定制流程   针对英国的服务流程，录取不到就退款'} />
        </div>
        <div className="rel1920 section" id="fixed02">
          <div className="rel1100">
            <div className="schoolrank">
              <div className="teacher">
                <div className="teacher-title">顶尖师资·前哈佛招生委员带领常青藤外教</div>
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
                                <Yuyue btnTitle={'向他提问'} wrapModalTitle={'向他提问'} submitBtn={'提交'} qudao_details={'SEM/英国v2院校排名PC/外教/向他提问'} />
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
                      <div className="schoolbackrounglist-list-query">专为英国留学定制，如<Live800 classes={'live800'} title={'牛津剑桥实验室项目'} type={'a'} tips={'牛津剑桥实验室项目'} />、
                        <Live800 classes={'live800'} title={'名校影响力训练营'} type={'a'} tips={'名校影响力训练营'} />、
                        <Live800 classes={'live800'} title={'国际期刊论文发表'} type={'a'} tips={'国际期刊论文发表'} />、
                        <Live800 classes={'live800'} title={'500强实习'} type={'a'} tips={'500强实习'} />、
                        <Live800 classes={'live800'} title={'机器人训练营'} type={'a'} tips={'机器人训练营'} />、
                        <Live800 classes={'live800'} title={'夏威夷志愿者'} type={'a'} tips={'夏威夷志愿者'} />等活动，从领导力、科研能力、论文能力、社会责任感等更方面设置活动，更加符合英国名校的录取要求，提高录取率！</div>
                      <div className="schoolbackrounglist-right-time">具体活动的时间、费用、剩余名额不同，请咨询获取</div>
                    </div>
                    <div className="detailquery"><Live800 classes={'live800'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
                  </div>
                </div>
              </div>
              <div className="schoolrank-list">
                <div className="schoolrank-list-header">
                  2017英国录取案例（持续更新中 ...）
                </div>
                <div className="schoolrank-list-body">
                  {this.schoolDataBottom.map((item) => {
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
        <SocityShun mainClass={'caotese'} h2={'顺顺留学·上市公司旗下留学机构'} />
        <AbroadForm apply_contry={'英国'} qudao_details={'SEM/英国v2院校排名PC/底部表单/获得申请方案'} />
        <BotFormData h2title={'顺顺英国，只给你最满意的结果！'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'咨询一下'} />
        <SuccessModal />
        <AbroadNatrue />
        <TestEnroll qudao_details={'SEM/英国v2院校排名PC/排名/测试录取率'} h2title={'测试录取率'} btnSubmitTitle={'提交'} />
        <PageInterModals country="uk" baogao="newhk" circle={1} time1={8000} time2={10000} ceyiceQudaoDetails={'SEM/英国v2院校排名PC/弹层/测一测'} baomingQudaoDetail={'SEM/英国v2院校排名PC/弹层/活动'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

