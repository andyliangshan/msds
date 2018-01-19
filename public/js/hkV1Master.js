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
const C = require('./core/conf');

const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Live800 = require('./components/Live800');
const Pipei = require('./components/Pipei/Pipei2');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityHkComm');
const PageInterModals = require('./components/PageInterModals/PageInterModals7');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');
const hkv1Data = require('./components/usahot/ExtraData/hkV1MasterData.json');
const BotFormData = require('./components/usahot/BotForm/BotFormData');

class UserAgent extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      position: 'static',
      cash: false,
    };
    this.rankingAllData = [];
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
      if (sTop > $('#contemenu1').offset().top - 50 && sTop < $('#contemenu2').offset().top - 49) {
        $('.tabnav li').eq(0).addClass('active')
          .siblings()
          .removeClass('active');
      } else if (sTop > $('#contemenu2').offset().top - 50 && sTop < $('#contemenu3').offset().top - 49) {
        $('.tabnav li').eq(1).addClass('active')
          .siblings()
          .removeClass('active');
      } else if (sTop > $('#contemenu3').offset().top - 50 && sTop < $('#contemenu4').offset().top - 49) {
        $('.tabnav li').eq(2).addClass('active')
          .siblings()
          .removeClass('active');
      } else if (sTop > $('#contemenu4').offset().top - 50 && sTop < $('#contemenu5').offset().top - 49) {
        $('.tabnav li').eq(3).addClass('active')
          .siblings()
          .removeClass('active');
      } else if (sTop > $('#contemenu5').offset().top - 50 && sTop < $('#contemenu6').offset().top - 49) {
        $('.tabnav li').eq(4).addClass('active')
          .siblings()
          .removeClass('active');
      } else if (sTop > $('#contemenu6').offset().top - 50 && sTop < $('#contemenu7').offset().top - 49) {
        $('.tabnav li').eq(5).addClass('active')
          .siblings()
          .removeClass('active');
      } else if (sTop > $('#contemenu7').offset().top - 50) {
        $('.tabnav li').eq(6).addClass('active')
          .siblings()
          .removeClass('active');
      } else {
        $('.tabnav li').find('a').removeClass('active');
      }
    });
    const sortData = () => {
      return Math.random() > 0.5 ? -1 : 1;
    };
    const val1 = this.fetchData('硕士', 1);
    const val2 = this.fetchData('硕士', 2);
    const val3 = this.fetchData('硕士', 3);
    const val4 = this.fetchData('硕士', 4);
    const val5 = this.fetchData('硕士', 5);
    this.rankingAllData = val1.concat(val2, val3, val4, val5);
    this.rankingAllData.sort(sortData);
  }

  handClickBtn(evt, activeIndex, top) {
    evt.preventDefault();
    this.setState({
      activeIndex,
    });
    $('html,body').animate({ scrollTop: (top - 48) }, 1000);
  }

  fetchData(ids, num) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/elastic/',
        query: {
          filters: JSON.stringify({
            year: [2016, 2017],
            project: [ids],
            country: ['香港'],
            // school_ordering_range: [0, 1000],
          }),
          // order_by: JSON.stringify(['school__order', 'school__id']),
          page_size: 60,
          page: num,
        },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data.results;
        this.setState({
          cash: true,
        });
      },
    });
    return d;
  }

  render() {
    const { activeIndex } = this.state;
    const bannerChildren = (<div className="rel1100">
      <div className="querybtn">
        <Live800 classes={'live800 live8001'} title={'立即咨询'} type={'a'} tips={'院校首页banner'} />
      </div>
    </div>);

    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/hk/v1/master/hk-v1-master-banner.jpg`} childrens={bannerChildren} />
        <div className="rel1920 navmenu">
          <div className="rel1100">
            <div className="subnav">
              <ul className="tabnav">
                {hkv1Data.navData.map((item, index) => {
                  return (
                    <li key={Math.random()} onClick={(evt) => this.handClickBtn(evt, index, item.top)} className={`${index === activeIndex ? 'active' : ''}`}>
                      <a href="javascript:void(0)">{item.item}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="rel1920 hkdesc">
          <div className="rel1100">
            <div className="rel1000">
              <div className="hkdesc-logo"><img src={require('../../public/img/hk/v1/master/hk-v1-master-description.jpg')} alt="" /></div>
              <div className="hkdesc-text">
                <h2>{hkv1Data.hkdesc.title}</h2>
                <div className="hkdesc-text-desc">
                  {hkv1Data.hkdesc.desc.map((item) => {
                    return (
                      <p key={Math.random()} dangerouslySetInnerHTML={{ __html: item.del }}></p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 conditionModal" id="contemenu1">
          <div className="rel1100">
            <div className="rel1000">
              <h2>香港研究生入读条件</h2>
              <div className="conditionbox conditionbox1">
                <div className="condition-title">{hkv1Data.conditionData.data1.title}</div>
                <div className="condition-pdesc">
                  <div className="condition-left"><img src={require('../../public/img/hk/v1/master/hk-v1-master-condition1.png')} alt="" /></div>
                  <div className="condition-right">
                    {hkv1Data.conditionData.data1.desc.map((value) => {
                      return (
                        <p key={Math.random()} dangerouslySetInnerHTML={{ __html: value.text }}></p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="conditionbox conditionbox2">
                <div className="condition-title">{hkv1Data.conditionData.data2.title}</div>
                <div className="condition-pdesc">
                  <div className="condition-right">
                    {hkv1Data.conditionData.data2.desc.map((value) => {
                      return (
                        <p key={Math.random()} dangerouslySetInnerHTML={{ __html: value.text }}></p>
                      );
                    })}
                  </div>
                  <div className="condition-left"><img src={require('../../public/img/hk/v1/master/hk-v1-master-condition2.png')} alt="" /></div>
                </div>
              </div>
              <div className="conditionbox conditionbox3">
                <div className="condition-title">{hkv1Data.conditionData.data3.title}</div>
                <div className="condition-pdesc">
                  <div className="condition-left"><img src={require('../../public/img/hk/v1/master/hk-v1-master-condition3.png')} alt="" /></div>
                  <div className="condition-right">
                    {hkv1Data.conditionData.data3.desc.map((value) => {
                      return (
                        <p key={Math.random()} dangerouslySetInnerHTML={{ __html: value.text }}></p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="querybtn">
                <div className="xuanxiaobtn"><Pipei qudao_details={'SEM/香港研究生PC/条件/选校定位'} wrapModalTitle={'选校定位'} btnTitle={'选校定位'} thirdth={'原创文书+面试辅导'} defaultShowCountry={'香港'} defaultAvgs1={'￥10-20万'} /></div>
                <Live800 classes={'live800 live8001'} title={'立即咨询顾问'} type={'a'} tips={'立即咨询顾问'} />
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 plantime" id="contemenu2">
          <div className="rel1100">
            <div className="rel1000">
              <h2>时间规划和流程介绍</h2>
              <div className="linetime clearfix">
                <div className="linetobot"></div>
                {hkv1Data.timelineData.map((item, index) => {
                  return (
                    <div key={Math.random()}>
                      {((index === 1) || (index === 3) || (index === 5) || (index === 7)) ?
                        <div className={`inlinetime time${index + 1}`} key={Math.random()}>
                          <div className="smtext">
                            {item.btext.map(val => {
                              return (
                                <p key={Math.random()}>{val.item}</p>
                              );
                            })}
                          </div>
                          <div className="btext">{item.mouth}</div>
                          <em>&nbsp;</em>
                          <div className="querybtn"><Live800 classes={'live800 live8001'} title={''} type={'a'} tips={''} /></div>
                        </div>
                        : <div className={`inlinetime time${index + 1}`} key={Math.random()}>
                          <em>&nbsp;</em>
                          <div className="btext">{item.mouth}</div>
                          <div className="smtext">
                            {item.btext.map(val => {
                              return (
                                <p key={Math.random()}>{val.item}</p>
                              );
                            })}
                          </div>
                          <div className="querybtn"><Live800 classes={'live800 live8001'} title={''} type={'a'} tips={''} /></div>
                        </div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 famouschool" id="contemenu3">
          <div className="rel1100">
            <div className="rel1000">
              <h2>香港八大名校介绍</h2>
              <div className="schoollist">
                {hkv1Data.eightData.map((item, index) => {
                  return (
                    <div className={`schoolinfo ${(index % 2 !== 0) ? 'enddiv' : ''}`} key={Math.random()}>
                      <div className="topinfo">
                        <div className="topinfo-img"><img src={require(`../../public/img/hk/v1/master/hk-v1-master-bd${index + 1}.png`)} alt="" /></div>
                        <div className="topinfo-cname">{item.cname}</div>
                      </div>
                      <div className="querybtn">
                        <div className="enroll"><a href="javscript:void(0)" className="enroll" data-toggle="modal" data-target="#applyjpModalMaster">测试录取率</a></div>
                        <Live800 classes={'live800 live8001'} title={'咨询研究生项目'} type={'a'} tips={'咨询研究生项目'} />
                      </div>
                      <div className="botinfo">
                        <p><em className="sp1">世界排名：</em><em className="sp2">{item.rank}</em></p>
                        <p><em className="sp1">优势专业：</em><em className="sp2">{item.advantage}</em></p>
                        <p><em className="sp1">语言要求：</em><em className="sp2" dangerouslySetInnerHTML={{ __html: item.langange }}></em></p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 hkschool" id="contemenu4">
          <div className="rel1100">
            <div className="rel1000">
              <h2>顺顺香港，合理冲击名校</h2>
              <div className="ranking">
                {this.rankingAllData.map((item) => {
                  return (
                    <div className="schoolrankrow row" key={Math.random()}>
                      <div className="col-xs-2 ranknum">{item.student ? item.student.name : ''}</div>
                      <div className="col-xs-2 schoolname">{item.school.chinese_name}</div>
                      <div className="col-xs-2 location">{item.project}</div>
                      <div className="col-xs-3 enroll">
                        {item.student.exams.length ? item.student.exams.map((v) => {
                          return (<em key={Math.random()}>{v.exam_type} : {v.score || '暂无'}</em>);
                        }) : <em key={Math.random()}>暂无</em>}
                      </div>
                      <div className="col-xs-3 conditionfee">{item.student.educational_history.length ? item.student.educational_history[0].school : '暂无'}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 feeasync" id="contemenu5">
          <div className="rel1100">
            <div className="rel1000">
              <h2>香港研究生费用解析</h2>
              <div className="feelist">
                <ul className="feebox">
                  {hkv1Data.feelistData.feejx.map((item, index) => {
                    return (
                      <li key={Math.random()} className={`li${index + 1} ${index === 5 ? 'endddiv' : ''}`}><p>{item.p}</p><em>{item.em}</em><Live800 classes={'live800 live8001'} title={''} type={'a'} tips={''} /></li>
                    );
                  })}
                </ul>
                <div className="feedesc">
                  <div className="feedesc-left">
                    <div className="feedesc-left-title">{hkv1Data.feelistData.feeleftData.title}</div>
                    <div className="feedesc-left-list">
                      {hkv1Data.feelistData.feeleftData.datalist.map(item => {
                        return (
                          <p key={Math.random()}>{item.item}</p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="feedesc-right">
                    <div className="feedesc-right-title">{hkv1Data.feelistData.feerightData.title}</div>
                    <div className="feedesc-right-list">
                      {hkv1Data.feelistData.feerightData.datalist.map(item => {
                        return (
                          <p key={Math.random()}>{item.item}</p>
                        );
                      })}
                      <p><em>{hkv1Data.feelistData.feerightData.special}</em></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="querybtn">
                <div className="a1"><Live800 classes={'live800 live8001'} title={'奖学金咨询'} type={'a'} tips={'奖学金咨询'} /></div>
                <div className="a2"><Live800 classes={'live800 live8001'} title={'心仪项目学费咨询'} type={'a'} tips={'心仪项目学费咨询'} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 safety" id="contemenu6">
          <div className="rel1100">
            <div className="rel1000">
              <h2>申请注意事项</h2>
              <div className="safelist">
                {hkv1Data.safetyData.map((item, index) => {
                  return (
                    <div className={`safetybox ${index === 2 ? 'enddiv' : ''}`} key={Math.random()}>
                      <div className="safetybox-title">{item.title}</div>
                      <div className="safetybox-subtitle">{item.subTitle}</div>
                      <div className="safetybox-desc">
                        {item.desc.map(val => {
                          return (
                            <p key={Math.random()} dangerouslySetInnerHTML={{ __html: val.item }}></p>
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
        <div id="contemenu7"></div>
        <SocityShun bg={`${__CDN__}/public/img/hk/v1/master/hk-v1-master-bot-smallpic.png`} mainClass={'caotese'} h2={'顺顺留学·靠谱的留学机构'} subtitle={'顺顺留学是上市教育集团“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。'} />
        <BotFormData h2title={'顺顺留学，让88.7%学生入读理想香港院校'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'立即咨询'} />
        <AbroadForm apply_contry={'香港'} qudao_details={'SEM/香港研究生PC/吸底表单/获得申请方案'} />
        <SuccessModal />
        <TestEnroll qudao_details={'SEM/香港研究生PC/八大院校/测试录取率'} h2title={'测试录取率'} btnSubmitTitle={'提交'} />
        <PageInterModals circle={1} time1={10000} time2={10000} ceyiceQudaoDetails={'SEM/香港研究生PC/弹层/测一测'} baomingQudaoDetail={'SEM/香港研究生PC/弹层/报名'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

