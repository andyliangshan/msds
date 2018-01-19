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

const findDOMNode = ReactDOM.findDOMNode;

const classnames = require('classnames');

require('../libs/bootstrap/js/tooltip');

const UtilNet = require('./core/UtilNet');


// data
const unversityData = require('./components/hk/data/universityData');
const usaV4Home1Data = require('./components/usahot/ExtraData/usaVersion4Home1.json');
const schoolRankingV4Data = require('./components/usahot/ExtraData/schoolrankingV4Data.json');
const usaV4Data = require('./components/usahot/ExtraData/usaV4Data.json');
// public
const BannerTest = require('./components/hk/commonComponents/BannerTest');
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const IntroAplus = require('./components/IntroActivity/IntroAplus');
const Teacher = require('./components/usahot/Teacher/Teacher');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityService');
const Live800 = require('./components/Live800');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const C = require('./core/conf');
const PageInterModals = require('./components/PageInterModals/PageInterModals2');
const TestEnroll = require('./components/TestEnroll/TestEnroll');

// self
const Rank = require('./components/usahot/usaVersion4Home1/Rank');
const Zsg = require('./components/usahot/usaVersion4Home1/Zsg');
const HeaderInfo = require('./components/usahot/SchoolrankingV4/HeaderInfo');


class UserV4Home1 extends React.Component {

  constructor() {
    super();
    this.state = {
      navIndex: 0,
      barInfoIndex: 0,
      rankIndex: 0,
      caseIndex: 0,
      fixed: false,
      showCase: false,
      rankData: [],
      rankCaseIndex: 100,
      cacheMap: {},
      ids: 'zonghe',
    };
    this.bData = [];
  }

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    this.fetchData('zonghe');
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 20).bind(this), false);
    } else {
      window.attachEvent('onscroll', this.debounce(this.handleScroll.bind(this), 20).bind(this));
    }
    // $(window).scroll(() => {
    //   this.debounce(this.handleScroll.bind(this), 100);
    // });
  }

  // 简单的防抖动函数
  debounce(func, wait) {
    // 定时器变量
    let timeout;
    return () => {
        // 每次触发 scroll handler 时先清除定时器
      clearTimeout(timeout);
        // 指定 xx ms 后触发真正想进行的操作 handler
      timeout = setTimeout(func, wait);
    };
  }
  /* 节流不好用
  throttle(func, wait, mustRun) {
    let timeout;
    let startTime = new Date();
    const context = this;
    const args = { ...mustRun };
    const curTime = new Date();

    clearTimeout(timeout);
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= mustRun) {
      func.apply(context, args);
      startTime = curTime;
      // 没达到触发间隔，重新设定定时器
    } else {
      timeout = setTimeout(func, wait);
    }
  }
  */

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const tabHeight = this.refs.navBar.offsetHeight;
    const basicTop = scrollTop + tabHeight;
    const applyTop = this.refs.apply.offsetTop;
    const rankTop = this.refs.rank.offsetTop;
    const raiseTop = this.refs.raise.offsetTop;
    const knowTop = this.refs.know.offsetTop;
    if (basicTop >= applyTop && basicTop < rankTop) {
      this.setState({
        navIndex: this.state.barInfoIndex,
        fixed: true,
      });
    } else if (basicTop >= rankTop && basicTop < raiseTop) {
      this.setState({
        navIndex: 4,
        fixed: true,
      });
    } else if (basicTop >= raiseTop && basicTop < knowTop) {
      this.setState({
        navIndex: 5,
        fixed: true,
      });
    } else if (basicTop >= knowTop) {
      this.setState({
        navIndex: 6,
        fixed: true,
      });
    } else {
      this.setState({
        fixed: false,
      });
    }
  }

  switchNavBar(e, tagIndex, index, ids) {
    e.preventDefault();
    this.setState({
      [tagIndex]: index,
    });

    if (tagIndex === 'navIndex' && index < 4) {
      this.setState({
        barInfoIndex: index,
      });
    }

    if (tagIndex === 'navIndex') {
      const tabHeight = this.refs.navBar.offsetHeight;
      const targetRef = this.refs[e.target.attributes['data-ref'].value];
      const targetHeight = targetRef.offsetTop - tabHeight;
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
      scrollMove(targetHeight, speed, 180);
    }

    if (tagIndex === 'rankIndex') {
      this.detailMove();
      this.setState({
        ids,
        rankCaseIndex: '',
        showCase: false,
      });
      this.fetchData(ids);
    }
  }

  detailMove() {
    $('#rankBox').animate({ width: '1000px' });
    $('#caseDetail').animate({ right: '-290px' });
  }

  hoverNavBar(index) {
    const thisItem = findDOMNode(this.refs[`navlist${index}`]);
    if (this.state.navIndex !== index) {
      $(thisItem).addClass('hover-active');
    }
  }

  leaveNavBar(index) {
    const thisItem = findDOMNode(this.refs[`navlist${index}`]);
    $(thisItem).removeClass('hover-active');
  }

  clickShowCase(index) {
    const self = this;
    self.setState({
      showCase: true,
      rankCaseIndex: index,
    });
  }

  goAllRanking(e, url) {
    e.preventDefault();
    window.open(url, '');
  }

  fetchData(ids = 'zonghe', asy = false) {
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
        query: { country: 'usa', ranking: ids, page_size: 30 },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: asy,
      success: data => {
        let res = '';
        if (ids === 'usnews_high_school') {
          res = data.data.college_list[ids].slice(0, 30);
        } else {
          res = data.data.college_list[ids].slice(0, 60);
        }

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
    const { navIndex, rankIndex, barInfoIndex, fixed, showCase, cacheMap, ids, rankCaseIndex } = this.state;
    const applyData = usaV4Home1Data.navbar.applySort[barInfoIndex].infos;
    const teacherTitle =
    (<div className="zsg-title clearfix">
      <span className="icon_num fl">3</span>
      <span className="red fl">秘诀三：</span>
      <span className="fl">外籍常青藤导师，给你地道的美式思维申请</span>
    </div>);
    const bgColor = (<div className="bg-color"></div>);
    const bgImg = `${__CDN__}/public/img/hk/v1/university/bottom_bg.png`;
    const BannerChild = <BannerTest bannerTest={unversityData.bannerTest} title="免费条件测评" country="美国" project="研究生" qudao_details="SEM/美国V4聚合页_1PC/banner/免费预约评测" />;
    return (
      <div id="usaV4home1">
        <Header />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/usaV4Home1/v4home1_banner.png`} childrens={BannerChild} />
        <div className={fixed ? 'content-nav fixed' : 'content-nav'} ref="navBar">
          <div className="nav-bar">
            <ul className="fl">
              {
                usaV4Home1Data.navbar.applySort.map((item, index) =>
                  <li className={classnames({ 'nav-active': index === navIndex })}
                      ref={`navlist${index}`}
                      data-ref={item.ref}
                      key={item.id}
                      onClick={(e) => this.switchNavBar(e, 'navIndex', index)}
                      onMouseEnter={() => this.hoverNavBar(index)}
                      onMouseLeave={() => this.leaveNavBar(index)}>{item.name}</li>,
                )
              }
            </ul>
          </div>
        </div>
        <div className="apply-info" ref="apply">
          {
            barInfoIndex === 0 &&
            <div className="master">
              <div className="apply-method">
                <div className="info clearfix">
                  <div className="info-img fl">
                    <img src={`${__CDN__}/public/img/usaAllPic/usaV4Home1/apply_master.png`} alt="" />
                  </div>
                  <div className="main fl">
                    <div className="main-title clearfix">
                      <h4 className="fl">去美国读研</h4>
                      <span className="fl">建议2种方式：找中介和DIY</span>
                    </div>
                    <p className="main-shunshun">顺顺建议时间充沛、计划性强、个人语言能力强、细心耐心的学生进行DIY</p>
                    <p className="main-shunshun">找中介则一定要选择靠谱的机构、用心的老师 </p>
                    <p>接下来小顺子为大家介绍美国留学的情况</p>
                  </div>
                </div>
              </div>
              <div className="apply-condition">
                <div className="info clearfix">
                  <div className="school-top fl">
                    <div className="title">
                      <h4>
                        <strong>Top30 </strong>
                        <span>学校录取条件</span>
                      </h4>
                    </div>
                    <div className="line"></div>
                    <div className="condition-info">
                      <div className="item">
                        <strong>GPA：</strong>
                        <span>3.5+</span>
                      </div>
                      <div className="item">
                        <strong>TOFEL：</strong>
                        <span>100+</span>
                      </div>
                      <div className="item">
                        <strong>GRE：</strong>
                        <span>320+</span>
                      </div>
                      <div className="item">
                        <strong>GMAT：</strong>
                        <span>720+</span>
                      </div>
                      <div className="item">
                        <strong>其他：</strong>
                        <span>科研、实习、课外活动等</span>
                      </div>
                    </div>
                    <TestEnroll propsBtnTitle="测试我的录取率" propsBtnClass="test" defaultIam="本科生" defaultProject="硕士" qudao_details="SEM/美国V4聚合页_1PC/阶段/测试录取率" />
                    {/* <div className="test">测试我的录取率</div> */}
                  </div>
                  <div className="school-top fl top60">
                    <div className="title">
                      <h4>
                        <strong>Top60 </strong>
                        <span>学校录取条件</span>
                      </h4>
                    </div>
                    <div className="line"></div>
                    <div className="condition-info">
                      <div className="item">
                        <strong>GPA：</strong>
                        <span>3.5+</span>
                      </div>
                      <div className="item">
                        <strong>TOFEL：</strong>
                        <span>100+</span>
                      </div>
                      <div className="item">
                        <strong>GRE：</strong>
                        <span>320+</span>
                      </div>
                      <div className="item">
                        <strong>GMAT：</strong>
                        <span>720+</span>
                      </div>
                      <div className="item">
                        <strong>其他：</strong>
                        <span>科研、实习、课外活动等</span>
                      </div>
                    </div>
                    <TestEnroll propsBtnTitle="测试我的录取率" propsBtnClass="test" defaultIam="本科生" defaultProject="硕士" qudao_details="SEM/美国V4聚合页_1PC/阶段/测试录取率" />
                    {/* <div className="test">测试我的录取率</div> */}
                  </div>
                </div>
              </div>
              <div className="cost">
                <div>
                  <h4>申请美国研究生费用</h4>
                </div>
                <div className="line"></div>
                <div className="cost-info clearfix">
                  <div className="detail fl">
                    <div className="learn-img fl">
                      <img src={`${__CDN__}/public/img/usaAllPic/usaV4Home1/icon_learn.png`} alt="" />
                    </div>
                    <div className="learn-info fl">
                      <h4>学费</h4>
                      <p className="each clearfix">
                        <span className="fl name">公立学校</span>
                        <span className="fl">：10-20万人民币/年</span>
                      </p>
                      <p className="each clearfix">
                        <span className="fl name">私立学校</span>
                        <span className="fl">：20-30万人民币/年</span>
                      </p>
                      <p className="clearfix">
                        <span className="fl name">商/法/医学院</span>
                        <span className="fl">：30-45万人民币/年</span>
                      </p>
                    </div>
                  </div>
                  <div className="detail life fl">
                    <div className="learn-img fl">
                      <img src={`${__CDN__}/public/img/usaAllPic/usaV4Home1/icon_life.png`} alt="" />
                    </div>
                    <div className="learn-info fl">
                      <h4>生活费</h4>
                      <p className="desc">城市不同费用不同，约5-15万人民币/年</p>
                      {/* <Live800 classes={'live800 contrast'} title={'各国留学费用对比 > >'} type={'a'} tips={'各国留学费用对比'} /> */}
                      <a className="contrast" href="http://lp.shunshunliuxue.cn/fee/v2/" onClick={(e) => this.goAllRanking(e, 'http://lp.shunshunliuxue.cn/fee/v2/')}>各国留学费用对比&nbsp;&gt;&nbsp;&gt;</a>
                      {/* <div className="contrast">各国留学费用对比&nbsp;&gt;&nbsp;&gt;</div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="time-plan common-wraper">
                <div className="time-content">
                  <div className="head">
                    <h4>
                      <span className="deepblue">美国研究生</span>
                      <span className="deepred">时间规划</span>
                    </h4>
                  </div>
                  <div className="line"></div>
                  <div className="time-content clearfix">
                    <div className="time-left fl">
                      <div className="time-each">
                        <strong className="grade">大一学生</strong>
                        <p className="grade-desc">GPA、英语基础学习、课外活动积累</p>
                      </div>
                      <div className="time-each">
                        <strong className="grade">大二学生</strong>
                        <p className="grade-desc">GPA、TOFEL准备、了解美国院校、尝试初级科研或实习</p>
                      </div>
                      <div className="time-dasan">
                        <strong className="grade">大三学生</strong>
                        <p className="grade-desc">GPA、TOFEL/GRE备考、明确申请目标、高质量背景活动</p>
                      </div>
                      <Live800 classes={'live800 contrast'} title={'免费定制我的时间表 > >'} type={'a'} tips={'免费定制我的时间表'} />
                      {/* <div className="contrast">免费定制我的时间表&gt;&nbsp;&gt;</div> */}
                    </div>
                    <div className="time-right fl">
                      <div className="grade-dasi">大四学生</div>
                      <ul className="time-list">
                        <li className="clearfix">
                          <span className="time-date fl">9月-10月</span>
                          <span className="time-desc fl">选校、文书亮点挖掘/构思</span>
                        </li>
                        <li className="clearfix">
                          <span className="time-date fl">11月-12月</span>
                          <span className="time-desc fl">文书多次商讨定稿、网申完成</span>
                        </li>
                        <li className="clearfix">
                          <span className="time-date fl">次年1月-2月</span>
                          <span className="time-desc fl">面试/套磁、补递材料、跟进申请状态</span>
                        </li>
                        <li className="clearfix">
                          <span className="time-date fl">3月-4月</span>
                          <span className="time-desc fl">获取offer、择校分析、确定入读院校</span>
                        </li>
                        <li className="clearfix">
                          <span className="time-date fl">5月-6月</span>
                          <span className="time-desc fl">顺顺帮助签证、体检</span>
                        </li>
                        <li className="clearfix">
                          <span className="time-date fl">7月</span>
                          <span className="time-desc fl">行前准备、订机票</span>
                        </li>
                        <li className="clearfix">
                          <span className="time-date fl">8月</span>
                          <span className="time-desc fl">顺顺离境会，临前指导，赴美入学</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            barInfoIndex !== 0 &&
            <div className="master">
              <div className="bg-gray">
                <div className="apply-method">
                  <div className="info clearfix">
                    <div className="info-img fl">
                      <img src={`${__CDN__}/public/img/usaAllPic/usaV4Home1/${applyData.basic.img}`} alt="" />
                    </div>
                    <div className="main fl">
                      <div className="main-title clearfix">
                        <h4 className="fl">{applyData.basic.title}</h4>
                        <span className="fl">{applyData.basic.smallTitle}</span>
                      </div>
                      {
                        applyData.basic.desc.map((item, index) =>
                          <p className={index !== 2 ? 'main-shunshun' : ''} key={Math.random()}>{item}</p>,
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="apply-condition no-master">
                <div className="info clearfix">
                  <div className="school-top fl">
                    <div className="title">
                      <h4>
                        <span>{applyData.conditons.title}</span>
                        <strong>录取条件</strong>
                      </h4>
                    </div>
                    <div className="line"></div>
                    <div className="condition-info">
                      {
                        applyData.conditons.detail.map((item) =>
                          <div className="item" key={Math.random()}>{item}</div>,
                        )
                      }
                    </div>
                    <TestEnroll propsBtnTitle={barInfoIndex === 1 ? '测试我的录取率' : '测试孩子的录取率'} propsBtnClass="test" qudao_details="SEM/美国V4聚合页_1PC/阶段/测试录取率" />
                  </div>
                  <div className="school-top fl top60">
                    <div className="title">
                      <h4>
                        <span>{applyData.cost.title}</span>
                        <strong>录取条件</strong>
                      </h4>
                    </div>
                    <div className="line"></div>
                    <div className="intro-brief">{applyData.cost.brief}</div>
                    <div className="condition-info">
                      {
                        applyData.cost.detail.map((item) =>
                          <div className="item clearfix" key={Math.random()}>
                            <strong className="fl">{item.title}</strong>
                            <span className="fl">&nbsp;:&nbsp;</span>
                            <span className="much-desc fl" dangerouslySetInnerHTML={{ __html: item.detali }}></span>
                          </div>,
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="time-plan bg-gray common-wraper">
                <div className="time-content">
                  <div className="head">
                    <h4>
                      <span className="deepblue">{applyData.time.title}</span>
                      <span className="deepred">时间规划</span>
                    </h4>
                  </div>
                  <div className="line"></div>
                  <div className="time-content clearfix">
                    <div className="time-right nomaste-right fl">
                      <ul className="time-list">
                        {
                          applyData.time.desc.map((item) =>
                            <li className="clearfix" key={Math.random()}>
                              <span className="time-date fl">{item.dateNum}</span>
                              <strong className="fl stage">{item.stage}</strong>
                              <span className="time-desc fl">{item.desc}</span>
                            </li>,
                          )
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="rank common-wraper" ref="rank">
          <div className="head">
            <h4>
              <span className="deepblue">美国院校最新</span>
              <span className="deepred">排名</span>
            </h4>
          </div>
          <div className="line"></div>
          <nav className="rank-nav clearfix">
            <ul className="nav-list fl">
              {usaV4Home1Data.rankinfos.nav.map((item, index) =>
                <li className={index === rankIndex ? 'rank-active fl' : 'fl'}
                    key={item.id}
                    onClick={(e) => this.switchNavBar(e, 'rankIndex', index, item.ids)}>{item.name}</li>,
              )}
            </ul>
            <a className="contrast fl"
               href="http://lp.shunshunliuxue.cn/usa/version3/schoolranking_2/"
               target="_blank"
               onClick={(e) => this.goAllRanking(e, 'http://lp.shunshunliuxue.cn/usa/version3/schoolranking_2/')}>全部排名&nbsp;&gt;&gt;</a>
          </nav>
          <Rank showCase={showCase} rankIndex={rankIndex} rankCaseIndex={rankCaseIndex} clickShowCase={(index) => this.clickShowCase(index)} rankData={cacheMap[ids]} />
        </div>
        <div className="raise-rate common-wraper" ref="raise">
          <div className="raise-content wd1000">
            <div className="head">
              <h4>
                <span className="deepblue">申请美国研究生</span>
                <span className="deepred">提高成功率</span>
              </h4>
            </div>
            <div className="line"></div>
            <div className="raise-zsg">
              <div className="zsg-title clearfix">
                <span className="icon_num fl">1</span>
                <span className="red fl">秘诀二：</span>
                <span className="fl">招生官说“什么样的学生最受名校青睐”</span>
              </div>
              <Zsg />
            </div>
            <div className="raise-zsg">
              <div className="zsg-title clearfix">
                <span className="icon_num fl">2</span>
                <span className="red fl">秘诀一：</span>
                <span className="fl">顶尖原创的背景活动，为简历加分</span>
              </div>
              <IntroAplus />
            </div>
            <div>
              <Teacher title={teacherTitle} usaV4Data={usaV4Data} qudaoDetails={'SEM/美国V4聚合页_1PC/外教/提问'} />
            </div>
          </div>
        </div>
        <div className="know-shun common-wraper" ref="know">
          <div className="head">
            <h4>
              <span className="deepblue">10秒了解顺顺——</span>
              <span className="deepred">专业/透明/高效的机构</span>
            </h4>
          </div>
          <div className="line"></div>
          <HeaderInfo headerInfoData={schoolRankingV4Data.headerData} />
          <SocityShun mainClass={'caotesesd'} h2={null} subtitle={''} />
        </div>
        <BotFormData h2title="" bgImg={bgImg} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'立即咨询'} bgColor={bgColor}>
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
        <PageInterModals baogao="newhk" circle={1} time1={4000} time2={5500} time3={5500} ceyiceQudaoDetails={'SEM/美国V4聚合页_1PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V4聚合页_1PC/弹层/报名'} />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V4聚合页_1PC/吸底表单/获得申请方案'} />
        <SuccessModal />
      </div>
    );
  }
}

ReactDOM.render(<UserV4Home1 />, document.getElementById('app'));

