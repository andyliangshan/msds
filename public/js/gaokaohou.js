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
const AbroadForm = require('./components/AbroadForm/AbroadForm1');
const Yuyue = require('./components/Yuyue');
const SuccessModal = require('./components/SuccessModal');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const C = require('./core/conf');
const PageInterModals = require('./components/PageInterModals/PageInterModals4');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');
const gaokaoData = require('./components/usahot/ExtraData/gaokaoData.json');

const ServiceTese = require('./components/usahot/ServiceTese/ServiceTese');
const RightLayer = require('./components/RightLayer/RightLayer');

class UserAgent extends React.Component {

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  /**
   * 倒计时
   *
  **/
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
    const interval = 1000;
    window.setInterval(() => {
      const now = new Date();
      let newHour = 0;
      let newMinute = 0;
      let newSecond = 0;
      const endDate = new Date('2017', '8', '1');
      const leftTime = endDate.getTime() - now.getTime();
      const leftsecond = parseInt((leftTime / 1000), 10);
      let day1 = Math.floor(leftsecond / (60 * 60 * 24));
      const hour = Math.floor((leftsecond - (day1 * 24 * 60 * 60)) / 3600);
      const minute = Math.floor((leftsecond - (day1 * 24 * 60 * 60) - (hour * 3600)) / 60);
      const second = Math.floor(leftsecond - (day1 * 24 * 60 * 60) - (hour * 3600) - (minute * 60));
      newHour = (hour < 10) ? (`0${hour}`) : hour;
      newMinute = (minute < 10) ? (`0${minute}`) : minute;
      newSecond = (second < 10) ? (`0${second}`) : second;
      let totaldays = 0;
      const dates = new Date(new Date().getFullYear(), 2, 0).getDate();

      if (dates === 28) {
        totaldays = 365;
      } else if (dates === 29) {
        totaldays = 366;
      }
      if (day1 < 0) {
        day1 = day1 + totaldays; // eslint-disable-line
        $('.daotime-box-left-days em').css('font-size', '80px');
      }
      $('.daotime-box-left-days em').html(day1);
      $('.hours em').html(newHour);
      $('.seconds em').html(newMinute);
      $('.minutes em').html(newSecond);
    }, interval);
  }

  fetchData() {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://semnew.shunshunliuxue.com/cases/api_cases_list/',
        query: { title: 'SEM高考专题页', major_id: '43' },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data.data;
      },
    });
    return d;
  }

  fetchVisitorData() {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://api.shunshunliuxue.com/advisor/api/filter_advisor/?',
        query: { city: '', country: '', page: 1, limit: 10 },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data.result.businessData.advisor.data;
      },
    });
    return d;
  }

  /* eslint-disable */
  render() {
    const bannerChildren = (<div className="rel1100"><div className="qbtn"><Live800 classes={'live800 banner-live800'} title={'咨询经验老师'} type={'a'} tips={'咨询经验老师'} /></div></div>);
    const caseData = this.fetchData();
    const visitorData = this.fetchVisitorData();
    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/extraImg/gaokaohou/gaokao-v2-banner.jpg`} childrens={bannerChildren} />
        <div className="rel1920 tese">
          <div className="rel1100">
            <div className="daotime">
              <div className="daotime-tixing"><Live800 classes={'live800 tixing'} title={'考生提醒'} type={'a'} tips={'考生提醒'} /></div>
              <div className="daotime-desc">
                <p>留学申请不同于国内，很多是先到先得，录满截止</p>
                <p>抢占入读名额，时间紧迫，刻不容缓</p>
              </div>
              <div className="daotime-box">
                <div className="daotime-box-left">
                  <div className="daotime-box-left-title">距名校开学:</div>
                  <div className="daotime-box-left-days"><em>59</em>天</div>
                </div>
                <div className="daotime-box-right">
                  <p className="hours"><em>23</em>时</p>
                  <p className="seconds"><em>11</em>分</p>
                  <p className="minutes"><em>33</em>秒</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="applycase clearfix">
              <div className="applycase-desc">
                <div className="applycase-desc-img"><img src={require('../img/extraImg/gaokaohou/gaokao-v2-apply-desc.png')} alt="" /></div>
                <div className="applycase-btn">
                  <Live800 classes={'live800 laybtn'} title={'2017高考留学咨询入口 '} type={'a'} tips={'2017高考留学咨询入口 '} />
                  <em><img src={require('../img/extraImg/gaokaohou/gaokao-v2-range.png')} alt="" /></em>
                </div>
              </div>
              <div className="row fix-mid clearfix">
                <div className="col-xs-6">
                  <div className="fix-pel"><img src={require('../img/extraImg/gaokaohou/gaokao-v2-case1.jpg')} alt="" /></div>
                  <div className="fix-pel-desc fix-pel-desc1">
                    <p>•&nbsp;重点、一本分数，想冲击世界百强</p>
                    <p>•&nbsp;二本分数，想要入读含金量更高的世界TOP300</p>
                    <p>•&nbsp;三本、专科，想接受高质量教育</p>
                    <p>•&nbsp;高考失误，不想复读耽误一年，又想入读名校</p>
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="fix-pel"><img src={require('../img/extraImg/gaokaohou/gaokao-v2-case2.jpg')} alt="" /></div>
                  <div className="fix-pel-desc fix-pel-desc2">
                    <p>•&nbsp;高含金：申请学校正规，100%国内学历认证</p>
                    <p>•&nbsp;高效：申请2个月出结果，不耽误入读</p>
                    <p>•&nbsp;省心：一站式服务解决所有问题省心</p>
                  </div>
                </div>
              </div>
              <div className="querybtn-fix">
                <Live800 classes={'live800 laybtn'} title={'咨询留学方案 '} type={'a'} tips={'咨询留学方案 '} />
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 worldbig">
          <div className="rel1100">
            <div className="bigworld">
              <Live800 classes={'live800 laybtn'} title={'咨询顺顺·成功留学 '} type={'a'} tips={'咨询顺顺·成功留学 '} />
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="rel-1000">
              <h2>预估你的高考成绩，留学改变人生</h2>
              <div className="order-case-l">
                <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <th width="25%" className="thborder">高考分数</th>
                      <th width="75%">海外申请</th>
                    </tr>
                    <tr>
                      <td className="td01">重点线以上</td>
                      <td>这样的成绩无论在国内、外都能上名校，在美国能申到美国前50，在英国有机会申到G5顶级名校，澳洲估计能申请到澳洲八大学校。均为世界百强大学。</td>
                    </tr>
                    <tr>
                      <td className="td01">一本分数</td>
                      <td>可以冲刺世界百强，各国的精英大学。部分大学还设有条件录取，可以直接用高考成绩进行申请。</td>
                    </tr>
                    <tr>
                      <td className="td01">二本分数</td>
                      <td>可以申请上世界300强名校，未来还可以转学进入世界百强。</td>
                    </tr>
                    <tr>
                      <td className="td01">三本分数</td>
                      <td>可以申请上世界500强名校，获得比国内三本更强的学历认知度与职场竞争力。</td>
                    </tr>
                    <tr>
                      <td className="td01">专科线</td>
                      <td>由于美国提供本科教育以上的大学有3600多所，所以选择面比较宽。高考成绩在本科线下专科线上的学生，可以选择区域性名校或者社区大学，未来还可以转学到更好的院校。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="order-case-r">
                <img src={require('../img/extraImg/gaokaohou/nec-tit08.jpg')} alt="" />
              </div>
              <div className="querybtn-fix">
                <Live800 classes={'live800 banner-live800'} title={'定制我的方案'} type={'a'} tips={'定制我的方案'} />
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 tese">
          <div className="rel1100">
            <div className="major_info">
              <h1>美英加澳留学方案</h1>
              <div className="byone" id="byone">
                <ul className="row nav nav-tabs" role="tablist">
                  {gaokaoData.byone.map((item, index) => {
                    return (
                      <li role="presentation" className={`col-xs-3 ${index === 0 ? 'active' : ''}`} key={Math.random()}>
                        <a href={`#role${index + 1}`} aria-controls={`#role${index + 1}`} role="tab" data-toggle="tab" aria-expanded={index === 0 ? 'true' : 'false'}>{item.lidata}</a>
                      </li>
                    );
                  })}
                </ul>
                <div className="majorbox_con tab-content">
                  {gaokaoData.major_info.map((item, index) => {
                    return (
                      <div role="tabpanel" className={`tab-pane coninfo ${index === 0 ? 'active' : ''}`} key={Math.random()} id={`role${index + 1}`}>
                        <div className="courseset">
                          <h2>{item.courseset.h2}<Live800 classes={'live800 J_live800'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} /><em>&gt;&gt;</em></h2>
                          {item.courseset.pdata.map((v) => {
                            return (
                              <p key={Math.random()}><em>{v.ptitle}</em>{v.p1}</p>
                            );
                          })}
                        </div>
                        <div className="jocposition">
                          <h2>{item.jocposition.h2}<Live800 classes={'live800 J_live800'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} /><em>&gt;&gt;</em></h2>
                          {item.jocposition.pdata.map((v) => {
                            return (
                              <p key={Math.random()}><em>{v.ptitle}</em>{v.p1}</p>
                            );
                          })}
                        </div>
                        <div className="school-free">
                          <h2>{item.schoolfree.h2}<Live800 classes={'live800 J_live800'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} /><em>&gt;&gt;</em></h2>
                          {item.schoolfree.pdata.map((v) => {
                            return (
                              <p key={Math.random()}><em>{v.ptitle}</em>{v.p1}</p>
                            );
                          })}
                        </div>
                        <div className="school-time">
                          <h2>{item.schooltime.h2}<Live800 classes={'live800 J_live800'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} /><em>&gt;&gt;</em></h2>
                          {item.schooltime.pdata.map((v) => {
                            return (
                              <p key={Math.random()}><em>{v.ptitle}</em>{v.p1}</p>
                            );
                          })}
                        </div>
                        {index === 2 ? <div className="school-times">
                          <h2>{item.schooltimes.h2}<Live800 classes={'live800 J_live800'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} /><em>&gt;&gt;</em></h2>
                          {item.schooltimes.pdata.map((v) => {
                            return (
                              <p key={Math.random()}><em>{v.ptitle}</em>{v.p1}</p>
                            );
                          })}
                        </div> : ''}
                        <div className="querybtn">
                          <Live800 classes={'live800 J_live800'} title={'咨询留学方案'} type={'a'} tips={'咨询留学方案'} />
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
            <div className="row major_instro_school">
              <h1>顺顺经典案例</h1>
              <div className="case-list">
                {caseData.map((item, index) => {
                  return (
                    <div key={Math.random()}>
                      {index < 3 ? <div className={`col-xs-4 ${index === 2 ? 'endli' : ''}`}>
                        <div className="case-title-desc">{item.overview}</div>
                        <div className="case-school-info">
                          <div className="case-school-info-l"><img src={`http://semnew.shunshunliuxue.com/${item.avatar}`} alt="" /></div>
                          <div className="case-school-info-r">
                            <p className="case-school-title">{item.school}</p>
                            <p className="case-school-enname">{item.school_english_name}</p>
                            <p className="case-getibird-school"><span>{item.luqu_major}</span><span>{item.major_education}</span></p>
                          </div>
                        </div>
                        <div className="case-info-detail">
                          <p className="case-info-name">{item.name}</p>
                          <p className="case-info-underschool">{item.education_background}</p>
                          <p className="case-info-gpa">{item.gpa}</p>
                          <p className="case-info-desc">{item.difficulty}</p>
                        </div>
                        <div className="rowlink">
                          <Live800 classes={'live800 laybtn'} title={'查看更多案例 '} type={'a'} tips={'查看更多案例 '} />
                        </div>
                      </div> : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 tese">
          <div className="rel1100">
            <div className="rel1000-box">
              <h2 className="top-little">优秀顾问推荐</h2>
              <div className="row">
                {visitorData.map((item, index) => {
                  return (
                    <div key={Math.random()}>
                      {index < 4 ? <div className="col-xs-3 experts">
                        <img src={item._source.avatar_file} alt="" />
                        <h3>{item._source.full_name}</h3>
                        <p className="small">从业{item._source.service_years}年</p>
                        <p>成功申请到{item._source.offer_count}个offer</p>
                        <p>{item._source.cases.school.slice(0, 2).map(vals => {
                          return (
                            <em key={Math.random()}>{vals.chinese_name}</em>
                          );
                        })}</p>
                        <div className="btn-new ">
                          <Live800 classes={'live800 laybtn'} title={'立即咨询'} type={'a'} tips={'立即咨询 '} />
                          <Yuyue qudao_details={'SEM/高考后留学PC/顾问/在线预约'} btnTitle={'在线预约'} defaultShowCountry={'英国'} />
                        </div>
                      </div> : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <ServiceTese />
        <div className="rel1920">
          <div className="rel1100">
            <div className="socity-honor">
              <div className="honor-sp">
                <h2>媒体评价</h2>
                <div className="row">
                  <div className="col-xs-4">
                    <div className="pel-img"><img src={require('../img/extraImg/gaokaohou/honor1.jpg')} alt="南方都市报" /></div>
                    <div className="pel-title"><em>2015年&nbsp;南方都市报&nbsp;评选</em><em>评选中国年度创新人物大奖</em></div>
                    <div className="pel-desc">南方都市报评选顺顺留学创始人兼CEO张杨获得本年度创新人物，是唯一一个教育行业的获奖者，该奖项也是顺顺留学和教育行业的荣耀。</div>
                  </div>
                  <div className="col-xs-4">
                    <div className="pel-img"><img src={require('../img/extraImg/gaokaohou/honor2.jpg')} alt="新浪" /></div>
                    <div className="pel-title"><em>2015年&nbsp;新浪&nbsp;评选</em><em>中国品牌影响力教育机构</em></div>
                    <div className="pel-desc">这是不仅是新浪对顺顺品牌的肯定、对顺顺互联网化服务模式的认可，更是对顺顺的一种无形监督，时刻提醒顺顺要为每一位学生做好服务。</div>
                  </div>
                  <div className="col-xs-4">
                    <div className="pel-img"><img src={require('../img/extraImg/gaokaohou/honor3.jpg')} alt="腾讯" /></div>
                    <div className="pel-title"><em>2015年&nbsp;腾讯&nbsp;评选</em><em>年度公众信赖留学品牌</em></div>
                    <div className="pel-desc">每一位顺顺人付出的辛苦是外界想象不到的，所做的这些只为给客户提供优质服务，让每一位选择顺顺留学的客户都能够获得理想院校的Offer。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BotFormData class1="show" class2="hide" class3="show" class4="show" />
        <AbroadForm qudao_details={'SEM/高考后留学PC/底部/获得本科方案'} />
        <SuccessModal />
        <PageInterModals ceyiceQudaoDetails={'SEM/高考后留学PC/弹层/测一测'} />
        <TestEnroll />
        <RightLayer />
      </div>
    );
  }
  /* eslint-enable */
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

