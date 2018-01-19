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

const Footer = require('./components/Footer');
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Live800 = require('./components/Live800/Live800');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const SocityShun = require('./components/SocityPriceCommon');
const OfferPrice = require('./components/usahot/OfferPrice/EnOfferPrice');
const PageInterModals = require('./components/PageInterModals');

class UserAgent extends React.Component {

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
  }

  render() {
    const bannerChildren = (<div className="wd1000"></div>);

    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/enAllPic/en-agent-banner.jpg`} childrens={bannerChildren} />
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
        <div className="rel1920 tesebg">
          <div className="rel1100">
            <div className="serivece-tese">
              <h2>英国特色服务</h2>
              <div className="service-title">满足各类人群的不同需求，只为让你入读最匹配院校</div>
              <ul id="customTabs" className="nav nav-tabs row" role="tablist">
                <li role="presentation" className="col-xs-4 active"><a href="#jyjh" aria-controls="jyjh" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="true"><span className="spantese">商科精英计划</span><span>丰富的商科经验，理论+实战</span></a></li>
                <li role="presentation" className="col-xs-4"><a href="#ygjh" aria-controls="ygjh" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="false"><span className="spantese">英国名校计划</span><span>针对名校出击录取率提升20%</span></a></li>
                <li role="presentation" className="col-xs-4"><a href="#gzlq" aria-controls="gzlq" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="false"><span className="spantese">高中保录取</span><span>不录取就退费，15天内到账</span></a></li>
                <li role="presentation" className="col-xs-4"><a href="#yskt" aria-controls="yskt" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="false"><span className="spantese">雅思提分课堂</span><span>小班/一对一，提分的法宝</span></a></li>
                <li role="presentation" className="col-xs-4 endli"><a href="#yksq" aria-controls="yksq" role="tab" data-toggle="tab" className="hmtHelp" aria-expanded="false"><span className="spantese">预科快捷申请</span><span>海量名校预科任你挑选</span></a></li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="jyjh">
                  <span className="reverse-range reverse-range1"><img src={require('../img/enAllPic/en-agent-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc tesu">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon1.png')} alt="" /></div>
                      <div className="tabcontent-title">针对商科英语的语言提升</div>
                      <div className="tabcontent-subtitle"><span>留短时间内提高专项成绩</span></div>
                    </div>
                    <div className="tabcontent-desc tesu">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon2.png')} alt="" /></div>
                      <div className="tabcontent-title">安排金融实训、四大会计等实习</div>
                      <div className="tabcontent-subtitle"><span>在综合竞争力中跑赢对手</span></div>
                    </div>
                    <div className="tabcontent-desc tesu">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon5.png')} alt="" /></div>
                      <div className="tabcontent-title">独家院校资料，海量案例分析</div>
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
                  <span className="reverse-range reverse-range2"><img src={require('../img/enAllPic/en-agent-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon3.png')} alt="" /></div>
                      <div className="tabcontent-title">英国名校的游学项目</div>
                      <div className="tabcontent-subtitle"><span>目标院校、专业的深入了解</span><span>近距离感受心仪院校</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon4.png')} alt="" /></div>
                      <div className="tabcontent-title">针对性的背景提升规划</div>
                      <div className="tabcontent-subtitle"><span>针对申请院校和专业，提供世</span><span>界500强职位实习</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon5.png')} alt="" /></div>
                      <div className="tabcontent-title">独家院校资料，海量案例分析</div>
                      <div className="tabcontent-subtitle"><span>名校资料实时更新，心仪院校学</span><span>长为你支招</span></div>
                    </div>
                    <div className="tabcontent-desc enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon6.png')} alt="" /></div>
                      <div className="tabcontent-title">顺顺英国常规服务</div>
                      <div className="tabcontent-subtitle"><span>细分10个阶段，透明高效、服务好</span></div>
                    </div>
                    <div className="visitor-desc-btn">
                      <Live800 classes={'live800 live8001 graybtn'} title={'咨询名校录取条件'} type={'a'} tips={'咨询名校录取条件'} />
                      <Live800 classes={'live800 live8001 redbtn'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="gzlq">
                  <span className="reverse-range reverse-range3"><img src={require('../img/enAllPic/en-agent-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon7.png')} alt="" /></div>
                      <div className="tabcontent-title">目标院校、专业的深入了解</div>
                      <div className="tabcontent-subtitle"><span>安排英国名校的游学项目，近</span><span>距离感受心仪院校</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon5.png')} alt="" /></div>
                      <div className="tabcontent-title">独家院校资料，海量案例分析</div>
                      <div className="tabcontent-subtitle"><span>名校资料实时更新，心仪院校学</span><span>长为你支招</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon6.png')} alt="" /></div>
                      <div className="tabcontent-title">顺顺英国常规服务</div>
                      <div className="tabcontent-subtitle"><span>细分10个阶段，透明高效、服务好</span></div>
                    </div>
                    <div className="tabcontent-desc enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon8.png')} alt="" /></div>
                      <div className="tabcontent-title">境外留学贴身管家</div>
                      <div className="tabcontent-subtitle"><span>衣食住行，事无巨细</span></div>
                    </div>
                    <div className="visitor-desc-btn">
                      <Live800 classes={'live800 live8001 redbtn'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="yskt">
                  <span className="reverse-range reverse-range4"><img src={require('../img/enAllPic/en-agent-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon9.png')} alt="" /></div>
                      <div className="tabcontent-title">优秀的教学师资</div>
                      <div className="tabcontent-subtitle">5-12年教龄，6000+授课经历</div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon10.png')} alt="" /></div>
                      <div className="tabcontent-title">强悍的教学配置</div>
                      <div className="tabcontent-subtitle"><span>授课、批改作业、督导答疑、</span><span>阶测讲解</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon11.png')} alt="" /></div>
                      <div className="tabcontent-title">靠谱的团队合作</div>
                      <div className="tabcontent-subtitle"><span>语培老师和留学顾问、文书老师</span><span>紧密配合</span></div>
                    </div>
                    <div className="tabcontent-desc enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon12.png')} alt="" /></div>
                      <div className="tabcontent-title">最给力的辅导流程</div>
                      <div className="tabcontent-subtitle"><span>前期评测、每日授课复习、课后评价</span><span>、改作业</span></div>
                    </div>
                    <div className="visitor-desc-btn">
                      <Live800 classes={'live800 live8001 redbtn'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="yksq">
                  <span className="reverse-range reverse-range5"><img src={require('../img/enAllPic/en-agent-range.png')} alt="" /></span>
                  <div className="tabcontent-list">
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon13.png')} alt="" /></div>
                      <div className="tabcontent-title">时间短，效果好</div>
                      <div className="tabcontent-subtitle"><span>学业规划更明确，背景活动更</span><span>丰富</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon3.png')} alt="" /></div>
                      <div className="tabcontent-title">更高几率入读名校</div>
                      <div className="tabcontent-subtitle"><span>74%的学生升入英国TOP50</span><span>学校</span></div>
                    </div>
                    <div className="tabcontent-desc">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon6.png')} alt="" /></div>
                      <div className="tabcontent-title">顺顺英国常规服务</div>
                      <div className="tabcontent-subtitle">细分10个阶段，透明高效、服务好</div>
                    </div>
                    <div className="tabcontent-desc enddiv">
                      <div className="tabcontent-img"><img src={require('../img/enAllPic/en-agent-icon8.png')} alt="" /></div>
                      <div className="tabcontent-title">境外留学贴身管家</div>
                      <div className="tabcontent-subtitle">衣食住行，事无巨细</div>
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
        <OfferPrice />
        <SocityShun h2={'媒体社会评顺顺'} subtitle={'互联网起家，留学行业的一场革命'} class1="show" class2="hide" />
        <AbroadForm apply_contry={'英国'} qudao_details={'SEM/英国中介PC/底部表单/获得申请方案/'} />
        <Footer defaultShowCountry={'英国'} qudao_details={'SEM/英国中介PC/底部/在线预约/'} />
        <SuccessModal />
        <PageInterModals country="uk" circle={2} time1={10000} time2={10000} time3={10000} time4={23000} ceyiceQudaoDetails={'SEM/英国中介PC/弹层/测一测/'} baomingQudaoDetail={'SEM/英国中介PC/弹层/报名/'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

