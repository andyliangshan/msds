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

const Footer = require('./components/Footer');
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Live800 = require('./components/Live800');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon');
const OfferPrice = require('./components/usahot/OfferPrice/OfferPrice');
const Yuyue = require('./components/Yuyue');
const Xuanxiao = require('./components/Xuanxiao');
const PageInterModals = require('./components/PageInterModals');

const visitorData = require('./components/usahot/OfferPrice/visitorData.json');
const activityData = require('./components/usahot/OfferPrice/activityData.json');
const magicData = require('./components/usahot/OfferPrice/magicData.json');


class UserAgent extends React.Component {

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
  }

  visitorMouseOver(evt, index) {
    const target = `desc${index}`;
    const height = `height${index}`;
    this.refs[target].style.display = 'block';
    this.refs[height].style.height = '328px';
  }

  visitorMouseOut(evt, index) {
    const target = `desc${index}`;
    const height = `height${index}`;
    this.refs[target].style.display = 'none';
    this.refs[height].style.height = '100px';
  }

  render() {
    const bannerChildren = (<div className="rel1100"></div>);

    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/usa-agent-banner.jpg`} childrens={bannerChildren} />
        <div className="rel1920">
          <div className="rel1100">
            <div className="chooiceModal">
              <h2>中介机构的选择，你是否有这些担心？</h2>
              <div className="midChoice-desc">别再让一个不靠谱机构毁掉一个美好前途</div>
              <div className="midChoice-list">
                <div className="midChoiceContent">
                  <div className="midChoiceContent-img"><img src={require('../img/usaAllPic/usa-agent-worry1.jpg')} alt="" /> </div>
                  <div className="midChoiceContent-desc">
                    <div className="midChoiceContent-desc-title">服务流程不透明</div>
                    <div className="midChoiceContent-desc-con"><span>文书、进度不可见，甚至出现过了时间未递交申</span><span>请，延误黄金时间，影响前程</span></div>
                  </div>
                </div>
                <div className="midChoiceContent enddiv">
                  <div className="midChoiceContent-img"><img src={require('../img/usaAllPic/usa-agent-worry2.jpg')} alt="" /> </div>
                  <div className="midChoiceContent-desc">
                    <div className="midChoiceContent-desc-title">文书质量差,套模版严重</div>
                    <div className="midChoiceContent-desc-con"><span>简历机器翻译，文书千遍一律，有的连名字</span><span>都忘记改就递交了材料</span></div>
                  </div>
                </div>
                <div className="midChoiceContent">
                  <div className="midChoiceContent-img"><img src={require('../img/usaAllPic/usa-agent-worry3.jpg')} alt="" /> </div>
                  <div className="midChoiceContent-desc">
                    <div className="midChoiceContent-desc-title">低价吸引签约,后期乱收费</div>
                    <div className="midChoiceContent-desc-con"><span>面谈时漫天承诺，后期提出各种收费条目</span><span>甚至签约合同和口头承诺不匹配</span></div>
                  </div>
                </div>
                <div className="midChoiceContent enddiv">
                  <div className="midChoiceContent-img"><img src={require('../img/usaAllPic/usa-agent-worry4.jpg')} alt="" /> </div>
                  <div className="midChoiceContent-desc">
                    <div className="midChoiceContent-desc-title">签约前热情，签约后不理不睬</div>
                    <div className="midChoiceContent-desc-con"><span>签约前后服务态度180°转变，问题得不到回复</span><span>频繁更换顾问，申请被耽搁</span></div>
                  </div>
                </div>
              </div>
              <div className="shunVsOther"><img src={require('../img/usaAllPic/usa-agent-vs.png')} alt="" /></div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="school-tese">
              <h2>我们的美国留学特色</h2>
              <div className="school-tese-title">不仅仅着眼于留学申请，更关注综合竞争力提升</div>
              <div className="visitorbox">
                <h3>常青藤导师</h3>
                <div className="visitorlist">
                  {visitorData.map((item, index) => {
                    return (
                      <div key={Math.random()} className={`verpeior ${index === 3 ? 'enddiv' : ''}`} onMouseEnter={(e) => this.visitorMouseOver(e, index)} onMouseLeave={(e) => this.visitorMouseOut(e, index)}>
                        <div className="visitor-pic"><img src={require(`../img/usaAllPic/usa-agent-client${index + 1}.png`)} alt="" /></div>
                        <div className="visitor-desc" ref={`height${index}`}>
                          <div className="visitor-desc-enname">{item.name}</div>
                          <div className="visitor-desc-major">{item.major}</div>
                          <div className="visitor-desc-detail" ref={`desc${index}`}>{item.descrition}</div>
                        </div>
                      </div>);
                  })}
                </div>
                <div className="visitor-desc-btn">
                  <Yuyue qudao_details={'SEM/美国中介PC/美国特色/预约表单'} btnTitle={'预约导师'} wrapModalTitle={'免费预约'} submitBtn={'获取方案'} />
                  <Live800 classes={'live800 live8001 redbtn'} title={'咨询导师收费'} type={'a'} tips={'常青藤导师'} />
                </div>
              </div>
              <div className="scourceActivity">
                <h3>原创活动</h3>
                <div className="activitylist">
                  {activityData.map((item, index) => {
                    return (
                      <div key={Math.random()} className={`activitylist-con ${(((index + 1) % 2) === 0) ? 'activitylist-con-right' : 'activitylist-con-left'}`}>
                        <div className="activitylist-content">
                          <div className="activitylist-con-img"><img src={require(`../img/usaAllPic/usa-agent-activity${index + 1}.png`)} alt="" /></div>
                          <div className="activitylist-con-desc">
                            <div className="pid">{item.activityname}</div>
                            <ul className={`${index === 2 ? 'ullist' : ''}`}>
                              {item.descrition.map((v) => {
                                return (
                                  <li key={Math.random()}>{v.item1}</li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>);
                  })}
                </div>
                <div className="visitor-desc-btn">
                  <Yuyue qudao_details={'SEM/美国中介PC/美国特色/活动报名'} btnTitle={'立即报名'} wrapModalTitle={'立即报名'} submitBtn={'提交'} />
                  <Live800 classes={'live800 live8001 redbtn'} title={'获取详情'} type={'a'} tips={'原创活动'} />
                </div>
              </div>
              <div className="magicModal">
                <h3>“魔方”计划</h3>
                <div className="magiclist">
                  {magicData.map((item, index) => {
                    return (
                      <div key={Math.random()} className={`magiclist-con ${index === 2 ? 'enddiv' : ''}`}>
                        <div className="magiclist-con-img"><img src={require(`../img/usaAllPic/usa-agent-mf${index + 1}.png`)} alt="" /></div>
                        <div className="magiclist-con-html">
                          <div className="magiclist-con-html-title">{item.magicname}</div>
                          <div className="magiclist-con-html-list">
                            {item.magiclist.map((v) => {
                              return (
                                <div key={Math.random()}>
                                  <p className="magiclist-color">{v.magicColor}</p>
                                  <p>{v.magicText}</p>
                                </div>);
                            })}
                          </div>
                        </div>
                      </div>);
                  })}
                </div>
                <div className="visitor-desc-btn">
                  <Xuanxiao qudao_details={'SEM/美国中介PC/美国特色/测试短板'} wrapModalTitle={'评估测试'} submitBtn={'提交'} btnTitle={'测试我的短板'} />
                  <Live800 classes={'live800 live8001 redbtn'} title={'咨询计划详情'} type={'a'} tips={'“魔方”计划'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <OfferPrice />
        <SocityShun h2={'媒体社会评顺顺'} subtitle={'互联网起家，留学行业的一场革命'} class1="show" class2="hide" />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国中介PC/吸底表单/获得申请方案'} />
        <Footer qudao_details={'SEM/美国中介PC/底部/在线预约'} />
        <SuccessModal />
        <PageInterModals circle={2} time1={10000} time2={10000} time3={10000} time4={23000} ceyiceQudaoDetails={'SEM/美国中介PC/弹层/测一测/'} baomingQudaoDetail={'SEM/美国中介PC/弹层/报名/'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

