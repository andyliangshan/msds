/* eslint global-require: 0 import/no-dynamic-require: 0*/
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
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const SchoolData = require('./components/usahot/BotForm/SchoolLogoData.json');
const C = require('./core/conf');
const PageInterModals = require('./components/PageInterModals/PageInterModals2');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');

// const propTypes = React.PropTypes;

const style = {
  display: 'none',
};
class UserAgent extends React.Component {

  static propTypes = {
    // tipss: propTypes.string,
  };

  constructor() {
    super();
    this.state = {
      offerData: { results: [] },
      activeIndex: 0,
    };
  }

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
    $('li[role="presentation"] a').hover(evt => {
      evt.preventDefault();
      $(evt.currentTarget).tab('show');
      return false;
    });
    this.fetchData('12917,47197');
  }

  bannerClick(evt, caseIds, activeIndex) {
    this.fetchData(caseIds.join(','));
    this.setState({
      activeIndex,
    });
  }

  fetchData(ids) {
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/list/',
        query: { offer_id__in: ids },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      success: data => {
        this.setState({
          offerData: data,
        });
      },
    });
  }

  queryBtnClick(evt) {
    evt.preventDefault();
    const base800 = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=72111';
    const opened = `${base800}&clientId=${window.jzlvisitor_id.substr(0, 16)}`;
    /* eslint-disable */
    const centerWidth = window.innerWidth / 2 - 245;
    const centerHeight = window.innerHeight / 2 - 260;
    window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=520');
  }

  render() {
    const bannerChildren = (<div className="rel1100"><div className="qbtn"><Live800 classes={'live800 live8001 banner-live800'} title={'在线顾问答疑'} type={'a'} tips={'在线顾问答疑'} /></div></div>);

    const { activeIndex, offerData } = this.state;
    const sd = SchoolData[activeIndex];

    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/enAllPic/famouschool/en-famous-topbanner.jpg`} childrens={bannerChildren} />
        <div className="rel1920">
          <div className="rel1100">
            <div className="chooiceModal">
              <h2>搜索英国名校信息，你是否有这些困惑？</h2>
              <div className="midChoice-desc">别再让假信息耽误你的名校offer了</div>
              <div className="midChoice-list">
                <div className="midChoiceContent">
                  <div className="midChoiceContent-img"><img src={require('../img/enAllPic/famouschool/en-famous-search-pic01.jpg')} alt="" /></div>
                  <div className="midChoiceContent-desc">
                    <div className="midChoiceContent-desc-title">排名混乱、滞后</div>
                    <div className="midChoiceContent-desc-con"><span>搜索到的排名是陈旧的，排名数</span><span>据单一，参考意义不大</span></div>
                  </div>
                </div>
                <div className="midChoiceContent">
                  <div className="midChoiceContent-img"><img src={require('../img/enAllPic/famouschool/en-famous-search-pic02.jpg')} alt="" /></div>
                  <div className="midChoiceContent-desc">
                    <div className="midChoiceContent-desc-title">申请条件太笼统</div>
                    <div className="midChoiceContent-desc-con"><span>同一院校所有专业申请条件一</span><span>样根本不能评估自己的水平</span></div>
                  </div>
                </div>
                <div className="midChoiceContent enddiv">
                  <div className="midChoiceContent-img"><img src={require('../img/enAllPic/famouschool/en-famous-search-pic03.jpg')} alt="" /></div>
                  <div className="midChoiceContent-desc">
                    <div className="midChoiceContent-desc-title">费用介绍千篇一律</div>
                    <div className="midChoiceContent-desc-con"><span>费用介绍混乱，只给模糊范围根</span><span>本不知道心仪院校某专业的费用</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 tesebg">
          <div className="rel1100">
            <div className="famoushool-info">
              <h2>2017年最新英国名校信息同步</h2>
              <div className="famoushool-title">顺顺只给你最精选的信息，省心省力</div>
              <ul className="school-logo-box nav-tabs">
                {SchoolData.map((item, index) => {
                  return (
                    <li key={Math.random()} onClick={evt => this.bannerClick(evt, item.schoolOffer.rank.caseId, index)} className={`school-logo-list ${(index === 9 || index === 19) ? 'enddiv' : ''} ${index === activeIndex ? 'active' : ''} ${index > 9 ? 'minwith' : ''} ${index === 10 ? 'changewidth' : ''}`}>
                      <a href="javascript:void(0)">
                        <span className="school-logo-pic"><img src={item.schoolOffer.logo} alt="" /></span>
                        <p className="school-logo-ename">{item.schoolOffer.cname}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="tab-content schoolinfo-list">
                <div className="tab-pane active">
                  <div className="bigtitle">
                    <div className="cname">{sd.schoolOffer.cname}</div>
                    <div className="ename">{sd.schoolOffer.ename}</div>
                    <div className="querybtncollect">
                      <a href="javascript:void(0)" className="ceshi" data-toggle="modal" data-target="#applyjpModalMaster">测试我的录取率</a>
                      <Live800 classes={'live800 live8001 J-callwindow'} title={'咨询学校详情'} type={'a'} tips={'咨询学校详情'} />
                    </div>
                    <div className="rank">
                      <div className="circle"><div className="cirls"><p className="red">{sd.schoolOffer.rank.times.timesId}</p><p className="pp01">{sd.schoolOffer.rank.times.timesTitle}</p></div></div>
                      <div className="circle"><div className="cirls"><p className="orange">{sd.schoolOffer.rank.soundRank.soundRankId}</p><p className="pp01">{sd.schoolOffer.rank.soundRank.soundRankTitle}</p></div></div>
                      <div className="circle"><div className="cirls"><p className="green">{sd.schoolOffer.rank.major1.majorId1}</p><p className="pp01">{sd.schoolOffer.rank.major1.majorName1}</p></div></div>
                      {activeIndex < 18 ? <div className="circle"><div className="cirls"><p className="orange">{sd.schoolOffer.rank.major2.majorId2}</p><p className="pp01">{sd.schoolOffer.rank.major2.majorName2}</p></div></div> : <div className="circle" style={style}></div>}
                      <div className="circle circle-last"><div className="cirls"><a href="javascript:void(0)" className="J_live800" tipss={'了解更多排名'} onClick={evt => this.queryBtnClick(evt)}><p className="more">More</p><p className="pp01">了解更多排名</p></a></div></div>
                    </div>
                  </div>
                  <div className="tab-box">
                    <div className="feedesc">
                      <div className="feedesc-title"><span>条件&费用</span></div>
                      <div className="feedesc-table">
                        <table width="100%" cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr><th rowSpan="2" width="35%">专业</th><th colSpan="2">申请条件</th><th rowSpan="2" width="35%">学费英镑/年</th></tr>
                            <tr><th>雅思</th><th>托福</th></tr>
                            {sd.schoolOffer.rank.free.map((v) => {
                              return (
                                <tr key={Math.random()}><td>{v.freeMajor}</td><td>{v.itfel}</td><td>{v.tofel}</td><td>{v.price}</td></tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {activeIndex > 1 ? <div>
                          <div className="yinyin1" tipss={'咨询获得条件'} onClick={evt => this.queryBtnClick(evt)}>
                            <img src={require('../img/enAllPic/famouschool/lock.png')} alt="" />
                            <Live800 classes={'live800'} title={'咨询获得条件'} type={'a'} tips={'咨询获得条件'} />
                          </div>
                          <div className="yinyin2" tipss={'咨询获得条件'} onClick={evt => this.queryBtnClick(evt)}>
                            <img src={require('../img/enAllPic/famouschool/lock.png')} alt="" />
                            <Live800 classes={'live800'} title={'咨询获得条件'} type={'a'} tips={'咨询获得条件'} />
                          </div>
                        </div> : ''}
                        <div className="feedesc-btn">
                          <Live800 classes={'live800 live8001 ceshi'} title={'咨询我的专业申请条件'} type={'a'} tips={'咨询我的专业申请条件'} />
                          <Live800 classes={'live800 live8001 J-callwindow'} title={'咨询其他专业学费'} type={'a'} tips={'咨询其他专业学费'} />
                        </div>
                      </div>
                    </div>
                    <div className="offerlist">
                      <div className="offerlist-title"><span>录取offer</span></div>
                      {offerData.results.length ? offerData.results.map((schooloffer, offerindex) => {
                        return (
                          <div key={Math.random()}>{offerindex < 2 ? <div className={`offerlist-box ${offerindex === 1 ? 'enddiv' : ''}`}>
                            <div className="offerlist-box-t">
                              <div className="offerlist-box-t-name">{schooloffer.name}</div>
                              <div className="offerlist-box-t-desc">
                                <em className="lquot"><img src={require('../img/enAllPic/famouschool/en-famous-lquot.png')} alt="" /></em>
                                <span>{schooloffer.title}</span>
                                <em className="rquot"><img src={require('../img/enAllPic/famouschool/en-famous-rquot.png')} alt="" /></em>
                              </div>
                            </div>
                            <div className="offerlist-box-bot">
                              <div className="offerlist-box-schoolname">{schooloffer.chinese_name}</div>
                              <div className="offerlist-box-info"><span className="majorId">{schooloffer.offer_major}</span><span>{schooloffer.project}</span></div>
                              <div className="offerlist-box-undergraderschool"><em className="schoolnameId">{schooloffer.school_name}</em><em className="gpa">GPA:{schooloffer.gpa === 0 ? '暂无' : schooloffer.gpa}</em></div>
                              <div className="offerlist-box-score">
                                {schooloffer.exams.map((score) => {
                                  return (
                                    <div key={Math.random()}><em>{score.exam_type}:</em><em>{score.score === 0 ? '暂无' : score.score}</em></div>
                                  );
                                })}
                              </div>
                              <div className="adprize">{schooloffer.scholarship ? '' : schooloffer.scholarship}{schooloffer.scholarship_currency ? '' : schooloffer.scholarship_currency}</div>
                            </div>
                          </div> : ''}</div>
                        );
                      }) : <div>loading</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="serivece-tese">
              <h2>专为英国名校定制，独家申请方案</h2>
              <div className="service-title">历时2年，打磨出针对20+热门专业、院校的产品</div>
              <ul id="customTabs" className="nav nav-tabs row" role="tablist">
                <li role="presentation" className="col-xs-4 active"><a href="#jyjh" aria-controls="jyjh" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="true"><span className="spantese">名校之商科申请</span><span>丰富的商科经验，助力申请</span></a></li>
                <li role="presentation" className="col-xs-4"><a href="#ygjh" aria-controls="ygjh" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="false"><span className="spantese">转专业读名校</span><span>换个专业，开启另一种成功</span></a></li>
                <li role="presentation" className="col-xs-4"><a href="#gzlq" aria-controls="gzlq" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="false"><span className="spantese">名校全程服务</span><span>完善的流程，行业10%师资</span></a></li>
                <li role="presentation" className="col-xs-4 endli"><a href="#yksq" aria-controls="yksq" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="false"><span className="spantese">本科名校</span><span>不录取退全部服务费</span></a></li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="jyjh">
                  <span className="reverse-range reverse-range1"><img src={require('../img/enAllPic/famouschool/en-famous-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc tesu">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon1.png')} alt="" /></div>
                      <div className="tabcontent-title">针对商科英语的语言提升</div>
                      <div className="tabcontent-subtitle"><span>留短时间内提高专项成绩</span></div>
                    </div>
                    <div className="tabcontent-desc tesu">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon2.png')} alt="" /></div>
                      <div className="tabcontent-title">金融实训、四大会计等实习</div>
                      <div className="tabcontent-subtitle"><span>在综合竞争力中跑赢对手</span></div>
                    </div>
                    <div className="tabcontent-desc tesu">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon5.png')} alt="" /></div>
                      <div className="tabcontent-title">独家资料，海量案例分析</div>
                      <div className="tabcontent-subtitle"><span>商科资料实时更新、同步</span></div>
                    </div>
                    <div className="tabcontent-desc tesu enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon6.png')} alt="" /></div>
                      <div className="tabcontent-title">顺顺英国常规服务</div>
                      <div className="tabcontent-subtitle"><span>细分10个阶段，透明高效、服务好</span></div>
                    </div>
                    <div className="visitor-desc-btn">
                      <Live800 classes={'live800 live8001 redbtn'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="ygjh">
                  <span className="reverse-range reverse-range2"><img src={require('../img/enAllPic/famouschool/en-famous-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon7.png')} alt="" /></div>
                      <div className="tabcontent-title">目标专业的背景提升规划</div>
                      <div className="tabcontent-subtitle"><span>针对心仪专业，安排相关实习工作</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon10.png')} alt="" /></div>
                      <div className="tabcontent-title">现在专业的课程管理</div>
                      <div className="tabcontent-subtitle"><span>聚焦精力，有侧重点地管理</span><span>现在课程的成绩</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon5.png')} alt="" /></div>
                      <div className="tabcontent-title">针对转专业调整文书思路</div>
                      <div className="tabcontent-subtitle"><span>如何将转专业包装为优势，</span><span>打败本专业竞争者</span></div>
                    </div>
                    <div className="tabcontent-desc enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon6.png')} alt="" /></div>
                      <div className="tabcontent-title">顺顺英国常规服务</div>
                      <div className="tabcontent-subtitle"><span>细分10个阶段，透明高效、服务好</span></div>
                    </div>
                    <div className="visitor-desc-btn">
                      <Live800 classes={'live800 live8001 redbtn'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="gzlq">
                  <span className="reverse-range reverse-range3"><img src={require('../img/enAllPic/famouschool/en-famous-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon3.png')} alt="" /></div>
                      <div className="tabcontent-title">目标院校、专业的深入了解</div>
                      <div className="tabcontent-subtitle"><span>安排英国名校的游学项目，近</span><span>距离感受心仪院校</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon4.png')} alt="" /></div>
                      <div className="tabcontent-title">针对性的背景提升规划</div>
                      <div className="tabcontent-subtitle"><span>针对申请院校和专业，提供世界500</span><span>强职位实习</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon5.png')} alt="" /></div>
                      <div className="tabcontent-title">独家资料，海量案例分析</div>
                      <div className="tabcontent-subtitle"><span>名校资料实时更新，心仪院校学长</span><span>为你支招</span></div>
                    </div>
                    <div className="tabcontent-desc enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon6.png')} alt="" /></div>
                      <div className="tabcontent-title">顺顺英国常规服务</div>
                      <div className="tabcontent-subtitle"><span>细分10个阶段，透明高效、服务好</span></div>
                    </div>
                    <div className="visitor-desc-btn">
                      <Live800 classes={'live800 live8001 redbtn'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="yksq">
                  <span className="reverse-range reverse-range5"><img src={require('../img/enAllPic/famouschool/en-famous-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon3.png')} alt="" /></div>
                      <div className="tabcontent-title">目标院校、专业的深入了解</div>
                      <div className="tabcontent-subtitle"><span>安排英国名校的游学项目，近距离</span><span>感受心仪院校</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon4.png')} alt="" /></div>
                      <div className="tabcontent-title">针对性的背景提升规划</div>
                      <div className="tabcontent-subtitle"><span>针对申请院校和专业，提供世界500</span><span>强职位实习</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/famouschool/en-famous-icon.png')} alt="" /></div>
                      <div className="tabcontent-title">针对目标院校的文书包装</div>
                      <div className="tabcontent-subtitle"><span>与院校代理密切沟通，有重点的突</span><span>出学生优势</span></div>
                    </div>
                    <div className="tabcontent-desc enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon6.png')} alt="" /></div>
                      <div className="tabcontent-title">顺顺英国常规服务</div>
                      <div className="tabcontent-subtitle septcl">细分10个阶段，透明高效、服务好</div>
                    </div>
                    <div className="visitor-desc-btn">
                      <Live800 classes={'live800 live8001 redbtn'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 shunservice">
          <div className="rel1100">
            <div className="shunservice-content">
              <h2>顺顺优势  有好录取更有好服务</h2>
              <div className="shunservice-title">顺顺价值观第一条是只有成就学生，才能成就自己</div>
              <div className="shunservice-list">
                <div className="service-list-con">
                  <div className="service-list-con-title">录取好</div>
                  <div className="service-list-con-desc"><span>30%+的海归导师占比，88.7%学生申请到理想院校</span><span>40%口碑签约，平均每个学生获得4.3个offer</span></div>
                </div>
                <div className="service-list-con enddiv">
                  <div className="service-list-con-title">申请透明</div>
                  <div className="service-list-con-desc"><span>留学申请分成10个阶段，学生通过账号确认每一步完成情况</span><span>过程全透明，消息同步及时、高效</span></div>
                </div>
                <div className="service-list-con">
                  <div className="service-list-con-title">费用节省</div>
                  <div className="service-list-con-desc"><span>顺顺采用线上服务和线下门店相结合，剔除了租金、市场等高成本</span><span>比传统机构降价20%左右</span></div>
                </div>
                <div className="service-list-con enddiv">
                  <div className="service-list-con-title">响应迅速</div>
                  <div className="service-list-con-desc"><span>顺顺顾问实时解答学生疑问，申请系统微信提示申请进度</span><span>服务不满意15天内退费</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SocityShun h2={'做更靠谱的留学机构'} subtitle={'教育部认证资质，受到社会和媒体的好评'} class1="hide" class2="show" />
        <BotFormData  class1="show" class2="hide" class3="show" class4="show" />
        <AbroadForm apply_contry={'英国'} qudao_details={'SEM/英国名校/底部表单/获得申请方案/'} />
        <SuccessModal />
        <PageInterModals country="uk" circle={1} time1={8000} time2={10000} time3={10000} ceyiceQudaoDetails={'SEM/英国名校/弹层/测一测'} baomingQudaoDetail={'SEM/英国名校/弹层/报名'} baogao="newhk" />
        {/* <PageInterModals country="uk" circle={2} time1={10000} time2={10000} time3={10000} ceyiceQudaoDetails={'SEM/英国名校/弹层/测一测'} baomingQudaoDetail={'SEM/英国名校/弹层/报名'} /> */}
        <TestEnroll />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

