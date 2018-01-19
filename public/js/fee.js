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
const SocityShun = require('./components/SocityPriceCommon/ShunsocityCommon');
const Yuyue = require('./components/Yuyue/Yuyue1');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const AbroadNatrue = require('./components/usahot/AbroadNature/AbroadNatrue');
// const ServiceProcess = require('./components/usahot/ServiceProcess/ServiceProcess1');
const ServiceProcess = require('./components/ServiceProcess/ServiceProcess');
const C = require('./core/conf');
const PageInterModals = require('./components/PageInterModals/PageInterModals');
const usaV4Data = require('./components/usahot/ExtraData/usaV4Data.json');
const feeData = require('./components/usahot/ExtraData/feeAllData.json');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');
const OffersRanking = require('./components/england/homeComponents/Offers1');

class UserAgent extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      acdecindex: 0,
      loading: true,
    };
    this.bData = [];
    this.rankingData = [];
    this.cacheAllData = {};
    this.caseAllData = [];
  }

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
    const val1 = this.fetchData('硕士');
    const val2 = this.fetchData('本科');
    const val3 = this.fetchData('高中');
    this.rankingData = val1.concat(val2, val3);
    this.rankingData.sort(this.sortArr);
    this.caseAllData = this.caseData('44');
  }

  sortArr() {
    return Math.random() > 0.5 ? -1 : 1;
  }

  handClickBtn(evt, index) {
    evt.preventDefault();
    $('body,html').animate({ scrollTop: 1350 }, 1000);
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
        query: { project: ids, has_scholarship: 1 },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        const dt = data.results;
        this.cacheAllData[ids] = dt;
        d = dt;
        this.setState({
          loading: false,
        });
      },
    });
    return d;
  }

  caseData(ids) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://semnew.shunshunliuxue.com/cases/api_cases_list/',
        query: { title: 'sem费用专题', major_id: ids },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        const dt = data.data;
        d = dt;
      },
    });
    return d;
  }

  render() {
    const bannerChildren = (<div className="rel1100"></div>);
    const { activeIndex, acdecindex } = this.state;
    const visitorData = usaV4Data.teacherData.listdescData[acdecindex];
    const feeliveData = feeData.tablivefeeData[activeIndex];
    const serviceTitle =
    (<h3 className="serviceProcess-header">
      <span className="top-title">顺顺能帮你做什么？</span>
      <span className="first">定制流程 针对不同国家的服务流程，录取不到就退款</span>
    </h3>);
    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/other/fee/newfee-banner.jpg`} childrens={bannerChildren} />
        <div className="rel1920">
          <div className="rel1100">
            <div className="subnav">
              <ul className="mennav">
                {feeData.tabconData.map((item, index) => {
                  return (
                    <li onClick={(evt) => this.handClickBtn(evt, index)} className={`${index === activeIndex ? 'active' : ''} ${index === (feeData.tabconData.length - 1) ? 'enddiv' : ''}`} key={Math.random()}>
                      <a href="javascript:void(0)" className={`aa0${index + 1}`}>{item.tab}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="shunadvantage">
              <div className="rankdata">
                <h2>留学费用对比，简单粗暴先看结果</h2>
                <div className="wangxun"><Live800 classes={'live800'} title={'点击直接咨询详情'} type={'a'} tips={'点击直接咨询详情'} /></div>
                <div className="livefee clearfix">
                  <div className="livefee-title"><span>每年总花费排行</span></div>
                  <div className="livefee-list clearfix">
                    {feeData.livefeeData.map((item, index) => {
                      return (
                        <div className={`livefee-data ${(index === feeData.livefeeData.length - 1) ? 'enddiv' : ''}`} key={Math.random()}>
                          <div className="data-title">{item.country}</div>
                          <div className="data-price">{item.price}</div>
                          <div className={`data-rank ${index === 0 ? 'color1' : ''} ${index === 1 ? 'color2' : ''} ${(index === 2 || index === 3) ? 'color3' : ''}`}>NO.{index === 3 ? 3 : (index + 1)}</div>
                          <Live800 classes={'live800'} title={''} type={'a'} tips={''} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="schoolprice clearfix">
                  <div className="livefee-title"><span>奖学金发放排行</span></div>
                  <div className="livefee-list clearfix">
                    {feeData.schoolpriceData.map((item, index) => {
                      return (
                        <div className={`livefee-data ${(index === feeData.schoolpriceData.length - 1) ? 'enddiv' : ''}`} key={Math.random()}>
                          <div className="data-title">{item.country}</div>
                          <div className="data-price">{item.price}</div>
                          <div className={`data-rank ${index === 0 ? 'color1' : ''} ${index === 1 ? 'color2' : ''} ${index === 2 ? 'color3' : ''}`}>NO.{index + 1}</div>
                          <Live800 classes={'live800'} title={''} type={'a'} tips={''} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="educaterank clearfix">
                  <div className="livefee-title"><span>教育质量排行</span></div>
                  <div className="livefee-list clearfix">
                    {feeData.educaterankData.map((item, index) => {
                      return (
                        <div className={`livefee-data ${(index === feeData.educaterankData.length - 1) ? 'enddiv' : ''}`} key={Math.random()}>
                          <div className="data-title">{item.country}</div>
                          <div className={`data-rank ${index === 0 ? 'color1' : ''} ${index === 1 ? 'color2' : ''} ${index === 2 ? 'color3' : ''}`}>NO.{index === 4 ? 4 : (index + 1)}</div>
                          <Live800 classes={'live800'} title={''} type={'a'} tips={''} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="more-case-btn">
                  <Live800 classes={'live800'} title={'立即咨询详细'} type={'a'} tips={'立即咨询详细'} />
                </div>
                <div className="countrydata">
                  {activeIndex < 4 ? <div key={Math.random()}>
                    <div className="countrydata-logodesc">
                      <div className="countrydata-logodesc-pic"><img src={`/public/img/other/fee/newfee-country-big${activeIndex + 1}.jpg`} alt="" /></div>
                      <div className="countrydata-logodesc-desc">
                        <div className="logodesc-desc-title">{feeliveData.title}</div>
                        <div className="logodesc-desc-subtitle">{feeliveData.desc}</div>
                      </div>
                    </div>
                    <div className="feelive-data">
                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tbody>
                          <tr><th>&nbsp;</th><th className="th1" width="30%">申中学</th><th className="th2" width="30%">申本科</th><th className="th3" width="30%">申研究生</th></tr>
                          <tr>
                            <td className="td1">{feeliveData.prevfee.maintitle}</td>
                            {activeIndex === 3 ?
                              <td colSpan="3">
                                {feeliveData.prevfee.midschool.map((val) => {
                                  return (
                                    <div key={Math.random()}>
                                      <p className="fontbolder">{val.ptitle}</p>
                                      {val.pdesc.map(vlas =>
                                        <p key={Math.random()}><em>{vlas.em1}</em></p>,
                                      )}
                                    </div>
                                  );
                                })}
                              </td> : <td>
                                {feeliveData.prevfee.midschool.map((val) => {
                                  return (
                                    <div key={Math.random()}>
                                      <p className="fontbolder">{val.ptitle}</p>
                                      <p>
                                        {val.pdesc.map(vlas =>
                                          <em key={Math.random()}>{vlas.em1}</em>,
                                        )}
                                      </p>
                                    </div>
                                  );
                                })}
                              </td>}
                            {activeIndex === 3 ? ''
                              : <td>
                                {feeliveData.prevfee.undergraduate.map((val) => {
                                  return (
                                    <div key={Math.random()}>
                                      <p className="fontbolder">{val.ptitle}</p>
                                      <p>
                                        {val.pdesc.map(vlas =>
                                          <em key={Math.random()}>{vlas.em1}</em>,
                                        )}
                                      </p>
                                    </div>
                                  );
                                })}
                              </td>}
                            {activeIndex === 3 ? ''
                              : <td>
                                {feeliveData.prevfee.master.map((val) => {
                                  return (
                                    <div key={Math.random()}>
                                      <p className="fontbolder">{val.ptitle}</p>
                                      <p>
                                        {val.pdesc.map(vlas =>
                                          <em key={Math.random()}>{vlas.em1}</em>,
                                        )}
                                      </p>
                                    </div>
                                  );
                                })}
                              </td>}
                          </tr>
                          <tr>
                            <td className="td1">{feeliveData.fee.maintitle}</td>
                            <td>
                              {feeliveData.fee.midschool.map((val) => {
                                return (
                                  <div key={Math.random()}>
                                    <p className="fontbolder">{val.ptitle}</p>
                                    <p>
                                      <em>{val.pdesc}</em>
                                    </p>
                                  </div>
                                );
                              })}
                              <p className="fontbolder"><Live800 classes={'live800'} title={'咨询心仪院校费用'} type={'a'} tips={'咨询心仪院校费用'} /></p>
                            </td>
                            <td>
                              {feeliveData.fee.undergraduate.map((val) => {
                                return (
                                  <div key={Math.random()}>
                                    <p className="fontbolder">{val.ptitle}</p>
                                    <p>
                                      <em>{val.pdesc}</em>
                                    </p>
                                  </div>
                                );
                              })}
                              <p className="fontbolder"><Live800 classes={'live800'} title={'咨询心仪院校费用'} type={'a'} tips={'咨询心仪院校费用'} /></p>
                            </td>
                            <td>
                              {feeliveData.fee.master.map((val) => {
                                return (
                                  <div key={Math.random()}>
                                    <p className="fontbolder">{val.ptitle}</p>
                                    <p>
                                      <em>{val.pdesc}</em>
                                    </p>
                                  </div>
                                );
                              })}
                              <p className="fontbolder"><Live800 classes={'live800'} title={'咨询心仪院校费用'} type={'a'} tips={'咨询心仪院校费用'} /></p>
                            </td>
                          </tr>
                          <tr>
                            <td className="td1">{feeliveData.livefee.maintitle}</td>
                            <td colSpan="3">
                              {feeliveData.livefee.desc.map((val) =>
                                <p key={Math.random()}><em>{val.pdesc}</em></p>,
                              )}
                              <p><Live800 classes={'live800'} title={'咨询心仪城市费用'} type={'a'} tips={'咨询心仪城市费用'} /></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div> : ''}
                  {activeIndex > 3 ? <div key={Math.random()}>
                    <div className="countrydata-logodesc">
                      <div className="countrydata-logodesc-pic"><img src={`/public/img/other/fee/newfee-country-big${activeIndex + 1}.jpg`} alt="" /></div>
                      <div className="countrydata-logodesc-desc">
                        <div className="logodesc-desc-title">{feeliveData.title}</div>
                        <div className="logodesc-desc-subtitle">{feeliveData.desc}<Live800 classes={'live800'} title={'咨询心仪院校费用'} type={'a'} tips={'咨询心仪院校费用'} /></div>
                      </div>
                    </div>
                    <div className="feelive-data feelive-base">
                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tbody>
                          {feeliveData.dataAll.map((itemsval) => {
                            return (
                              <tr key={Math.random()}>
                                <td className="td1" width="10%">{itemsval.ptitle}</td>
                                <td>{itemsval.descData.map((vbs, Indexs) => {
                                  return (
                                    <div key={Math.random()}>
                                      <p className="colorTitle">{vbs.ltit}</p>
                                      {Indexs === 1 ?
                                        <div>
                                          {vbs.ldesc.map(itv => {
                                            return (
                                              <p key={Math.random()}><em>{itv.item}</em></p>
                                            );
                                          })}
                                          <p><Live800 classes={'live800'} title={'咨询心仪院校费用'} type={'a'} tips={'咨询心仪院校费用'} /></p>
                                        </div> :
                                        vbs.ldesc.map(itv => {
                                          return (
                                            <p key={Math.random()}><em>{itv.item}</em></p>
                                          );
                                        })}
                                    </div>
                                  );
                                })}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div> : ''}
                </div>
                <OffersRanking title={'顺顺最新奖学金offer（持续更新中 ...）'} offersData={this.rankingData} />
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="othercountry-honor">
            <div className="rel-sp">
              <div className="rel-sp-l"><img src={require('../../public/img/other/fee/newfee-prize.png')} alt="" /></div>
              <div className="rel-sp-r">
                <h2>2018年各国奖学金</h2>
                <p>全球各地的院校有大量奖学金留学机会。包括政府设立的奖学金，学术津贴，院校奖学金、助学金等等。不同院校、专业、地区与国家的奖学金政策都非常不同。申请奖学金需要好的背景，且具有大量的申请技巧。
                  <b>奖学金的发放一般是先到先得，所以最重要的是，一定要尽早联系顾问开始奖学金搜寻与规划。</b>
                </p>
                <div className="more-case-btn">
                  <Live800 classes={'live800'} title={'咨询怎么申请奖学金'} type={'a'} tips={'咨询怎么申请奖学金'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section rel1920">
          <div className="rel1100">
            <div className="country-case">
              <h2>顺顺各国奖学金案例</h2>
              <div className="case-list">
                {this.caseAllData.map((item, index) => {
                  return (
                    <div className={`col-xs-4 ${(index === 2 || index === 5) ? 'enddiv' : ''}`} key={Math.random()}>
                      <div className="absolute-img">
                        <span className="bigfont">奖学金</span>
                        <span>{item.scholarship}</span>
                      </div>
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
                    </div>
                  );
                })}
              </div>
              <div className="more-case-btn">
                <Live800 classes={'live800'} title={'测试能否申到奖学金'} type={'a'} tips={'测试能否申到奖学金'} />
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 section serviceprocess" id="fixed01">
          <ServiceProcess circleColor="#84b8ff" borderStyle="border-style" arrowColor="arrow-color" title={serviceTitle} />
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
                                <Yuyue btnTitle={'向他提问'} wrapModalTitle={'向他提问'} submitBtn={'提交'} qudao_details={'SEM/费用v2PC/服务/向他提问'} />
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
                <div className="schoolbackroung-title">背景活动·为简历加分，更易获得奖学金</div>
                <div className="schoolbackrounglist">
                  <div className="schoolbackrounglist-left"><img src={require('../../public/img/usaAllPic/usaV4/usa-v4-score.png')} alt="" /></div>
                  <div className="schoolbackrounglist-right">
                    <div className="schoolbackrounglist-right-title">原创、有效活动，提高录取率</div>
                    <div className="schoolbackrounglist-right-desc">
                      <div className="schoolbackrounglist-list-query">专为留学生定制，如<Live800 classes={'live800'} title={'美国国会实习'} type={'a'} tips={'美国国会实习'} />、
                        <Live800 classes={'live800'} title={'哈佛耶鲁实验室项目'} type={'a'} tips={'哈佛耶鲁实验室项目'} />、
                        <Live800 classes={'live800'} title={'名校影响力训练营'} type={'a'} tips={'名校影响力训练营'} />、
                        <Live800 classes={'live800'} title={'国际期刊论文发表'} type={'a'} tips={'国际期刊论文发表'} />、
                        <Live800 classes={'live800'} title={'500强实习'} type={'a'} tips={'500强实习'} />、
                        <Live800 classes={'live800'} title={'机器人训练营'} type={'a'} tips={'机器人训练营'} />、
                        <Live800 classes={'live800'} title={'夏威夷志愿者'} type={'a'} tips={'夏威夷志愿者'} />等活动,从领导力、科研能力、论文能力、社会责任感等更方面设置活动，更符合名校+获奖学金的录取要求，提高录取率！</div>
                      <div className="schoolbackrounglist-right-time">具体活动的时间、费用、剩余名额不同，请咨询获取</div>
                    </div>
                    <div className="detailquery"><Live800 classes={'live800'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
                  </div>
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
                <Live800 classes={'live800'} title={'找顺顺·读名校'} type={'a'} tips={'找顺顺·读名校'} />
              </div>
            </div>
          </div>
        </div>
        <SocityShun mainClass={'caotese'} h2={'顺顺留学·上市公司旗下留学机构'} />
        <AbroadForm qudao_details={'SEM/费用v2PC/底部表单/获得申请方案'} />
        <BotFormData h2title={'只需五分钟，为你推荐高性价比名校'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'立即咨询'} />
        <SuccessModal />
        <AbroadNatrue />
        <TestEnroll qudao_details={'SEM/英国v2院校排名PC/排名/测试录取率'} h2title={'测试录取率'} btnSubmitTitle={'提交'} />
        <PageInterModals circle={2} time1={10000} time2={10000} time3={10000} time4={23000} ceyiceQudaoDetails={'SEM/费用v2PC/弹层/测一测'} baomingQudaoDetail={'SEM/费用v2PC/弹层/报名'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

