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
// const Pipei = require('./components/Pipei/Pipei2');
const Pipei = require('./components/Pipei/Pipei');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon/ShunsocityService');
const PageInterModals = require('./components/PageInterModals/PageInterModals2');
const Casedesc = require('./components/usahot/ServiceFile/Casedesc');
const serviceData = require('./components/usahot/ExtraData/serviceAllData.json');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');


class UserAgent extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
  }

  handClickBtn(evt, activeIndex) {
    evt.preventDefault();
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { activeIndex } = this.state;
    const fenData = serviceData.serviceTopData[activeIndex];
    const bannerChildren = (<div className="rel1100">
      <div className="querybtn">
        <Live800 classes={'live800 live8001'} title={'立即咨询'} type={'a'} tips={'院校首页banner'} />
        <div className="xuanxiaobtn"><Pipei defaultShowCountry="加拿大" qudao_details={'SEM/顺顺品牌v2/banner/免费选校'} wrapModalTitle={'免费选校'} btnTitle={'免费选校'} /></div>
      </div>
    </div>);
    const socityH2 = (<h2>顺顺留学·靠谱的留学机构</h2>);

    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/other/service/service-banner.jpg`} childrens={bannerChildren} />
        <div className="rel1920 navmenus">
          <div className="rel1100">
            <div className="rel1000">
              <h2>专业的留学产品  专业的服务</h2>
              <div className="ulcountry">
                {serviceData.serviceTopData.map((item, index) => {
                  return (
                    <div className={`list list${index + 1} ${index === activeIndex ? 'active' : ''} ${index === 5 ? 'enddiv' : ''}`} key={Math.random()} onClick={(evt) => this.handClickBtn(evt, index)}></div>
                  );
                })}
              </div>
              <div className="countrydesc">
                <div className={`range${activeIndex}`}><img src={require('../img/other/service/service-range.png')} alt="" /></div>
                <div className="datadesc clearfix">
                  {fenData.allData.map((val, ind) => {
                    return (
                      <div className="desccon clearfix" key={Math.random()}>
                        {ind === 7 ?
                          <div>
                            <div className="desccon-link"><a href="javscript:void(0)">{val.title}<em>&nbsp;&gt;&gt;</em></a></div>
                            <div className="layerquery"><a href="javscript:void(0)" className="enroll" data-toggle="modal" data-target="#applyjpModalMaster">{''}</a></div>
                          </div>
                          :
                          <div>
                            {val.link !== '' ?
                              <div>
                                <div className="desccon-link"><a href="javascript:void(0)">{val.title}<em>&nbsp;&gt;&gt;</em></a></div>
                                <div className="layerquery"><a href={val.link} target="_blank">{''}</a></div>
                              </div>
                              :
                              <div>
                                <div className="desccon-link"><Live800 classes={'live800 live8001'} title={val.title} type={'a'} tips={val.title} /><em>&nbsp;&gt;&gt;</em></div>
                                <div className="layerquery"><Live800 classes={'live800 live8001'} title={''} type={'a'} tips={''} /></div>
                              </div>
                                }
                          </div>
                        }
                        <div className="desccon-cont">{val.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Casedesc />
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100 feebox">
            <div className="rel1000">
              <h2>透明的服务流程  透明的费用</h2>
              <div className="feelist">
                {serviceData.feedata.map((item, index) => {
                  return (
                    <div className={`feepic feepic${index + 1} ${index === 4 ? 'enddiv' : ''}`} key={Math.random()}>
                      <div className="feedesc">
                        <div className="feedesc-title">{item.title}</div>
                        <div className="feedesc-subtitle">{item.subtitle}</div>
                      </div>
                      <div className="feequery"><Live800 classes={'live800 live8001'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
                    </div>
                  );
                })}
              </div>
              <div className="feeoffer">
                <div className="feeoffer-img"><img src={require('../../public/img/other/service/service-fee.png')} alt="" /></div>
                <div className="feeoffer-right">
                  <div className="feeoffer-title">服务透明无隐形收费，费用比传统机构降价20%</div>
                  <div className="feeoffer-desc">
                    <p>顺顺将<em>留学与互联网</em>结合，剔除了传统机构因租金、市场、营销等成本费用庞大，导致学生的留学费用成倍增长，同等级别顾问，相比于传统机构，顺顺收费平均降低20%以上</p>
                    <p>顺顺和顾问是合伙人制，顾问通过顺顺平台服务学生，收取的服务费用<em>70%-100%</em>回报给顾问，收获高于传统机构的20倍，顾问服务更优质，收费全部<em>公开透明，杜绝隐形收费私自收费，</em>一经发现顺顺将严厉处理</p>
                  </div>
                  <div className="feequery"><Live800 classes={'live800 live8001'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
                </div>
              </div>
              <div className="fee-bot1">
                <div className="feequery"><Live800 classes={'live800 live8001'} title={'和老师聊聊'} type={'a'} tips={'和老师聊聊'} /></div>
                <div className="allquery"><Live800 classes={'live800 live8001'} title={''} type={'a'} tips={''} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 seniorservice">
          <div className="rel1100">
            <div className="rel1000">
              <h2>高效的系统 高效的服务</h2>
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
              <div className="feelist">
                {serviceData.systemdata.map((item, index) => {
                  return (
                    <div className={`feepic feepic${index + 1} ${index === 3 ? 'enddiv' : ''}`} key={Math.random()}>
                      <div className="feedesc">
                        <div className="feedesc-title">{item.title}</div>
                        <div className="feedesc-subtitle">{item.subtitle}</div>
                      </div>
                      <div className="feequery"><Live800 classes={'live800 live8001'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
                    </div>
                  );
                })}
              </div>
              <div className="fee-bot1">
                <div className="feequery"><Live800 classes={'live800 live8001'} title={'了解详情'} type={'a'} tips={'了解详情'} /></div>
                <div className="allquery"><Live800 classes={'live800 live8001'} title={''} type={'a'} tips={''} /></div>
              </div>
            </div>
          </div>
        </div>
        <SocityShun mainClass={'caotese'} h2={socityH2} subtitle={'顺顺留学是上市教育集团“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。'} />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/顺顺品牌v2/吸底表单/获得申请方案'} />
        <SuccessModal />
        <TestEnroll qudao_details={'SEM/顺顺品牌v2/专业/录取率评测'} h2title={'测试录取率'} btnSubmitTitle={'提交'} />
        <PageInterModals circle={1} time1={8000} time2={8000} time3={8000} baogao="newhk" ceyiceQudaoDetails={'SEM/顺顺品牌v2/弹层/测一测'} baomingQudaoDetail={'SEM/顺顺品牌v2/弹层/报名'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

