/* eslint no-undef: 0, no-new: 0, react/no-danger-with-children: 0 */
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
require('../libs/bootstrap/js/modal');
require('../libs/bootstrap/js/carousel');

const UtilNet = require('./core/UtilNet');

const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Enwang = require('./components/usahot/Enwang/Enwang');
const Live800 = require('./components/Live800/Live800');
const Guwen = require('./components/usahot/Guwen/Guwen');
const Luqu = require('./components/usahot/Luqu/Luqu');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const NewSocityShun = require('./components/SocityPriceCommon/Shunsocity2');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const PageInterModals = require('./components/PageInterModals/PageInterModals2');
// const YuyueDIY = require('./components/Yuyue/YuyueDIY');
const Yuyue = require('./components/Yuyue/Yuyue');
const Pipei = require('./components/Pipei/Pipei');

class UserAgent extends React.Component {

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    UtilNet.replaceUtmSourceLink();
    $('li[role="presentation"] a').click(evt => {
      evt.preventDefault();
      $(evt.currentTarget).tab('show');
      return false;
    });

    $('.carousel-img img').click((evt) => {
      const idx = $(evt.currentTarget).data('idx');
      $('.carousel-showBigImg').carousel(idx);
    });
  }

  render() {
    const bannerChildren = (<div className="rel1100"><div className="queryBtn"><Live800 classes={'live800 live8001 wx'} title={'立即咨询'} type={'a'} tips={'院校首页banner'} /></div></div>);

    return (
      <div id="enmiddle">
        <Header />
        <Banner bg={`${__CDN__}/public/img/enMiddle/banner.jpg`} childrens={bannerChildren} qudao_details={'SEM/英国v2中学页PC/banner/免费选校'} />
        <div className="rel1920">
          <div className="rel1100">
            <div className="question">
              <Enwang />
              <div className="qu-solve">
                <h3 className="repeat">解决的方案有哪些？</h3>
                <div className="so-text">
                  <h4>住宿</h4>
                  <div className="so-left">
                    <div className="so-left-content">
                      <h4>寄宿中学</h4>
                      <div className="recommend">
                        <p>推荐指数</p>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                      </div>
                      <ul className="so-content">
                        <li className="one">
                          <span className="bod">优势：</span>日常采取比较严格的封闭式管理，比较安全
                        </li>
                        <li>能亲身体验英国寄宿学校的生活</li>
                        <li>学生能更快的与校内同学成为朋友</li>
                        <li>员工会给予学生指导和照顾</li>
                        <li>培养孩子独立的人格，做事情能够独立思考</li>
                        <li className="two">
                          <span className="bod">劣势：</span>无法体验英国家庭的生活
                        </li>
                        <li>日常起居和饮食无人照料</li>
                      </ul>
                      <div className="so-move">
                        <Pipei qudao_details={'SEM/英国v2中学页PC/方案/测试匹配度'} wrapModalTitle={'测试匹配度'} submitBtn={'确定'} btnTitle={'测试匹配度'} />
                        <Live800 classes={'live800 live8001 wx'} title={'了解更多详情'} type={'a'} tips={'院校首页banner'} />
                      </div>
                      <div className="red-img">
                        <img src={require('../../public/img/enMiddle/red-flag.png')} alt="" />
                        <p>安全独立</p>
                      </div>
                    </div>
                  </div>
                  <div className="so-right">
                    <div className="so-right-content">
                      <h4>走读中学</h4>
                      <div className="recommend">
                        <p>推荐指数</p>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing1.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing2.png')} alt="" /></span>
                        <span><img src={require('../../public/img/enMiddle/xingxing2.png')} alt="" /></span>
                      </div>
                      <ul className="so-content so-content2">
                        <li className="one"><span className="bod">优势：</span>能够真正的体会到英国一般家庭的生活习惯</li>
                        <li>生活在一个纯粹的英语环境中，能全面了解英国文化</li>
                        <li>日常起居饮食有房东照顾</li>
                        <li>心理上和生活上受到更多的关心</li>
                        <li className="two"><span className="bod">劣势：</span>与同学之间的沟通减少</li>
                        <li>需要克服文化差异，去适应另一个家庭的生活环境</li>
                        <li>不能锻炼孩子的独立性</li>
                      </ul>
                      <div className="so-move">
                        <Pipei qudao_details={'SEM/英国v2中学页PC/方案/测试匹配度'} wrapModalTitle={'测试匹配度'} submitBtn={'确定'} btnTitle={'测试匹配度'} />
                        <Live800 classes={'live800 live8001 wx'} title={'了解更多详情'} type={'a'} tips={'院校首页banner'} />
                      </div>
                      <div className="red-img">
                        <img src={require('../../public/img/enMiddle/red-flag.png')} alt="" />
                        <p>呵护照料</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="school-fee">
              <h2 className="sch-title">学校+费用</h2>
              <div className="school-fee-tab">
                <ul className="nav nav-tabs">
                  <li className="active mg10" role="presentation">
                    <a href="#public" role="tab" data-toggle="tab">
                      <span className="big">公立中学</span>
                      <span className="small">· 学费每年约为15万人民币</span>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#private" role="tab" data-toggle="tab">
                      <span className="big">私立中学</span>
                      <span className="small">· 学费每年约为27万-40万人民币</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="public">
                    <div className="tab-top">
                      <h3 className="tt-title">
                        <span>综合学校</span>
                        <p className="orange">费用低廉</p>
                      </h3>
                      <ul className="tt-content">
                        <li><span className="weight">介绍：</span>综合学校是英国中等教育的主要形式它招收一切适龄儿童，不问成绩、智力在低年级阶段共同学习一般的文化科目</li>
                        <li className="indent3">高年级，就将学生分为不同的班组，因材施教</li>
                        <li><span className="weight">优势：</span>入学门槛相对较低，课程多样性普遍历史悠久，政府补贴，学费低廉英国当地学生多，能快速融入当地文化，英语</li>
                        <li className="indent3">能力提高快</li>
                        <li><span className="weight">劣势：</span>教学水平明显高于公立学校多为大班式教学，师生比较小孩子不适合自理能力、独立意识较弱的孩子</li>
                        <li className="center">
                          <Pipei qudao_details={'SEM/英国v2中学页PC/方案/测试匹配度'} wrapModalTitle={'测试我的匹配度'} submitBtn={'确定'} btnTitle={'测试我的匹配度'} />
                        </li>
                        <li className="tt-bot-t">
                          <h3>推荐院校</h3>
                        </li>
                        <li className="tt-left">
                          <div className="images">
                            <img src={require('../../public/img/enMiddle/linken.jpg')} alt="" />
                          </div>
                          <div className="introduce">
                            <h4 className="black">林肯学院
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">林肯市</span>
                            </h4>
                            <p>每年80%以上学生进入英国顶尖大学，友好的学院气氛，</p>
                            <p>规范化的管理社会治安好，犯罪率最低</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                        <li className="tt-left tt-right mg22">
                          <div className="images"><img src={require('../../public/img/enMiddle/john.jpg')} alt="" />
                          </div>
                          <div className="introduce">
                            <h4 className="black">约翰雷格学院
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">林肯郡</span>
                            </h4>
                            <p>20年国际学生教育经验，奖学金丰厚，环境怡人、犯罪</p>
                            <p>率低，专为国际学生设置特殊的英语辅导课和专职人员</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-bot mg30">
                      <h3 className="tt-title">
                        <span>文法学院</span>
                        <p className="orange">人文学科</p>
                      </h3>
                      <ul className="tt-content">
                        <li><span className="weight">介绍：</span>历史悠久，古希腊、罗马时代就已经存在了文法学院一直是古典课程的堡垒，以教授古典课程为主现在不断增加教学</li>
                        <li className="indent3">内容，但仍然侧重人文学科进入文法学校的学生，将来大多要升入大学进一步深造</li>
                        <li><span className="weight">优势：</span>文法学校教学质量优良，学制也较现代中学多两年着重于古典课程等人文学科</li>
                        <li><span className="weight">劣势：</span>课程种类比较少以后升学的选择较少自理能力、独立意识较弱的不太适合</li>
                        <li className="center"><Pipei qudao_details={'SEM/英国v2中学页PC/方案/测试匹配度'} wrapModalTitle={'测试我的匹配度'} submitBtn={'确定'} btnTitle={'测试我的匹配度'} /></li>
                        <li className="tt-bot-t">
                          <h3>推荐院校</h3>
                        </li>
                        <li className="tt-left">
                          <div className="images">
                            <img src={require('../../public/img/enMiddle/laf.jpg')} alt="" />
                          </div>
                          <div className="introduce">
                            <h4 className="black">拉夫堡文法学院
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">拉夫堡市</span>
                            </h4>
                            <p>纯男校，A-level成绩的A+B通过率 86.6%，建校于1495</p>
                            <p>年，英国最古老最具学术传统的学校之一。</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                        <li className="tt-left tt-right mg22">
                          <div className="images"><img src={require('../../public/img/enMiddle/las.png')} alt="" /></div>
                          <div className="introduce">
                            <h4 className="black">莱斯特文法学院
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">莱斯特市</span>
                            </h4>
                            <p>男女混合制学校，A-Level成绩A+B比率高达87.1%，</p>
                            <p> 注重培养学生的独立思考和学习能力</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div role="tabpanel" className="tab-pane" id="private">
                    <div className="tab-top">
                      <h3 className="tt-title">
                        <span>男校</span>
                        <p className="orange">领袖能力</p>
                      </h3>
                      <ul className="tt-content">
                        <li><span className="weight">介绍：</span>会开设一些更加侧重于培养男性的领袖性格的课程，在多种户外团队活动中提升男生的团队协作能力，这些对于男生将来</li>
                        <li className="indent3">事业及人生发展都是非常重要的经历，开设适合男孩子的运动项目，如马术、皮划艇等</li>
                        <li><span className="weight">优势：</span>小班教学，教学水平明显高于公立学校，培养男性的领袖性格。丰富的课外活动，注重培养男孩的兴趣</li>
                        <li><span className="weight">劣势：</span>学费较高昂，和异性接触不多，交际的机会较少</li>
                        <li className="center">
                          <Pipei qudao_details={'SEM/英国v2中学页PC/方案/测试匹配度'} wrapModalTitle={'测试我的匹配度'} submitBtn={'确定'} btnTitle={'测试我的匹配度'} />
                        </li>
                        <li className="tt-bot-t">
                          <h3>推荐院校</h3>
                        </li>
                        <li className="tt-left">
                          <div className="images">
                            <img src={require('../../public/img/enMiddle/yidun.png')} alt="" />
                          </div>
                          <div className="introduce">
                            <h4 className="black">伊顿公学
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">温莎小镇</span>
                            </h4>
                            <p>伊顿教师多是博士专家，牛剑毕业的伊顿校友一半时间读</p>
                            <p>完中学教材，主任灵活选择其他教材，社会治安好，犯罪</p>
                            <p>率最低。</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                        <li className="tt-left tt-right mg22">
                          <div className="images">
                            <img src={require('../../public/img/enMiddle/abin.jpg')} alt="" />
                          </div>
                          <div className="introduce">
                            <h4 className="black">阿宾顿中学
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">牛津郡</span>
                            </h4>
                            <p>不仅限于考试和成绩，也重视活动和个人的努力，</p>
                            <p>12%－15%的学生进入牛津大学或剑桥大学，92%</p>
                            <p>的学生得A或B。</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-bot mg30">
                      <h3 className="tt-title">
                        <span>女校</span>
                        <p className="orange">自信有抱负</p>
                      </h3>
                      <ul className="tt-content">
                        <li><span className="weight">介绍：</span>女孩青春期更愿意安静地学习或小组配合，对于女校来说，女生能得到充分锻炼和支持,培养出女性的领导力、个性以及气质。</li>
                        <li className="indent3">开设形体、礼仪等课程，更有骑马、高尔夫等</li>
                        <li><span className="weight">优势：</span>小班教学，教学水平明显高于公立学校，培养女性的领导力，消除性别歧视，更加自信,更愿意尝试“男性擅长”的数学、计</li>
                        <li className="indent3">算机等学科</li>
                        <li><span className="weight">劣势：</span>学费较高昂，和异性接触不多，交际的机会较少</li>
                        <li className="center">
                          <Pipei qudao_details={'SEM/英国v2中学页PC/方案/测试匹配度'} wrapModalTitle={'测试我的匹配度'} submitBtn={'确定'} btnTitle={'测试我的匹配度'} />
                        </li>
                        <li className="tt-bot-t">
                          <h3>推荐院校</h3>
                        </li>
                        <li className="tt-left">
                          <div className="images">
                            <img src={require('../../public/img/enMiddle/laf.jpg')} alt="" />
                          </div>
                          <div className="introduce">
                            <h4 className="black">圣心女子学校<img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">伊斯特本镇</span></h4>
                            <p>重视课外活动，坚信课内课外同等重要。A-level考试通</p>
                            <p>过率为98%，校舍工作人员认真负责，服务水准有目共</p>
                            <p>睹。</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                        <li className="tt-left tt-right mg22">
                          <div className="images"><img src={require('../../public/img/enMiddle/bud.jpg')} alt="" /></div>
                          <div className="introduce">
                            <h4 className="black">巴德明顿中学
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">布利斯托尔</span>
                            </h4>
                            <p>丰厚奖学金，注重学生创造力培养，升学率95%以上，英</p>
                            <p>国顶尖女子学校的全国排名表上名列第4，A-level合格率</p>
                            <p>为100%。</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-bot mg30">
                      <h3 className="tt-title">
                        <span>男女混合校</span>
                        <p className="orange">优质教育</p>
                      </h3>
                      <ul className="tt-content">
                        <li><span className="weight">介绍：</span>在全世界最古老的学校名单中，有60%的学校来自英国。在历经千百年之后，仍然保持着严格的教学质量控制。</li>
                        <li className="indent3">同时，他们的育人目标从致力于培养绅士和淑女。</li>
                        <li><span className="weight">优势：</span>小班教学，教学水平明显高于公立学校，丰富的课外活动，注重培养学生广泛的兴趣和开阔的思路</li>
                        <li><span className="weight">劣势：</span>学费较高昂</li>
                        <li className="center">
                          <Pipei qudao_details={'SEM/英国v2中学页PC/方案/测试匹配度'} wrapModalTitle={'测试我的匹配度'} submitBtn={'确定'} btnTitle={'测试我的匹配度'} />
                        </li>
                        <li className="tt-bot-t"><h3>推荐院校</h3></li>
                        <li className="tt-left">
                          <div className="images">
                            <img src={require('../../public/img/enMiddle/bub.jpg')} alt="" />
                          </div>
                          <div className="introduce">
                            <h4 className="black">巴布拉克中学
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">考文垂</span>
                            </h4>
                            <p>重视课外活动，旨在开发学的兴趣和天赋培养自信、合</p>
                            <p>作的精神，80%以上学生进入英国顶尖大学。</p>
                            <div className="tt-move pt52">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                        <li className="tt-left tt-right mg22">
                          <div className="images"><img src={require('../../public/img/enMiddle/wei.jpg')} alt="" /></div>
                          <div className="introduce">
                            <h4 className="black">威灵堡学校
                              <img src={require('../../public/img/enMiddle/gps.png')} alt="" />
                              <span className="blue">北安普敦郡</span>
                            </h4>
                            <p>有四百多年历史，英国最古老学校之一，每年为英国著名</p>
                            <p>大学输送大批优秀毕业生，全面培养学生的创新精神和自</p>
                            <p>主学习的能力。</p>
                            <div className="tt-move">
                              <Live800 classes={'live800 test ttl-test'} title={'了解学费'} type={'a'} tips={'院校首页banner'} />
                              <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 appbg">
          <div className="rel1100">
            <div className="howapply">
              <h3 className="repeat diff">怎样申请这些学校？</h3>
              <h4 className="bod">对于硕士、博士等申请，我们提倡有能力、有时间的学生进行DIY，但是对于中学申请：</h4>
              <p>
                <span className="fs24">1</span>
                <span className="p20">机构多有当地的监护机构合作，帮忙照顾一人在外的孩子，尤其是紧急情况救助；</span>
                <span className="fs24">3</span>
                <span>孩子年龄较小，不具备决策能力，需要有经验的顾问和家长帮忙选择学校；</span>
              </p>
              <p>
                <span className="fs24">2</span>
                <span className="p34">申请的过程很多注意事项，如入学笔试面试等，机构可以进行有针对性的指导；</span>
                <span className="fs24">4</span>
                <span>机构为已经为多个院校输送学生，和院校沟通套磁更方便，申请率更高。</span>
              </p>
              <div className="zixun">
                <Live800 classes={'live800 test face'} title={'了解笔试面试'} type={'a'} tips={'院校首页banner'} />
                <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="apply-case">
              <h3 className="repeat">为什么选择“顺顺留学”去读英国中学？</h3>
              <div className="case">
                <h4 className="cs-title">
                  <span></span>
                  <p>顾问骄傲、家长满意的录取结果</p>
                  <span></span>
                </h4>
                <Luqu />
                <ul className="casetwo">
                  <li className="case1">
                    <h3>“时间紧迫，火速选校终获4枚顶尖高中offer”</h3>
                    <div className="box">
                      <div className="b-title">
                        <img src={require('../../public/img/enMiddle/case1.jpg')} alt="" />
                        <div className="message">
                          <p className="fs20">布伦特伍德学校</p>
                          <p className="fs12">Brentwood School</p>
                          <p className="fs14">曾就读于厦门外国语学校</p>
                        </div>
                      </div>
                      <div className="process">
                        <p className="bod">申请难点：</p>
                        <p>由于之前去德国交流一年后重读高一，所以准备申请时已经年龄偏大，学校选择少由于学生个人原因，学生直至4月才决定要申请英国留学，因此很多优秀中学已经满位或很少位置</p>
                        <p className="bod">解决方案：</p>
                        <p>
                          孩子在校期间品学兼优，因此家长也希望能送她去全英排名前200的学校。时间紧迫，深知家长担忧的我紧急联系了英国合作方及多家顶尖高中，在两天内就确认了多所学校的情况并推荐给家长；同时又多次和孩子及家长沟通对学校和课程的想法和要求，并考虑到安排高中笔试和面试的时间问题，最终锁定了五所学校进行申请,随后我和团队成员积极为孩子安排申请，特地为她提供一些样题参考考试的总体难度，
                          并针对一些学校考试的特殊流程为学生作了说明，减少让她分心的因素，让她准备得更好。最终孩子顺利入读了Brentwood School当年9月的高中课程
                        </p>
                      </div>
                      <div className="b-title teacher">
                        <img src={require('../../public/img/enMiddle/yezhou.jpg')} alt="" />
                        <div className="message tme">
                          <p className="fs18">叶舟老师</p>
                          <p className="fs14">剑桥圣玛丽学校、伦敦大学学院、华威大学、金汉姆希尔中学</p>
                          <p className="fs14">伦敦政治经济学院等申请经验</p>
                        </div>
                        <h4>
                          <Yuyue apply_contry={'英国'} qudao_details={'SEM/英国v2中学页PC/offer/预约老师'} defaultShowCountry={'英国'} wrapModalTitle={'预约老师'} submitBtn={'提交'} btnTitle={'预约老师'} />
                          {/* <YuyueDIY qudao_details={'SEM/英国v2中学页PC/offer/预约老师'} defaultShowCountry={'英国'} wrapModalTitle="悦悦我来了" submitBtn={'提交'} btnTitle={'预约老师'} /> */}
                          <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="case1 case2">
                    <h3>“性格内向，面试辅导斩获TOP10私立高中”</h3>
                    <div className="box">
                      <div className="b-title">
                        <img src={require('../../public/img/enMiddle/case2.png')} alt="" />
                        <div className="message">
                          <p className="fs20">伊莎伯格女王学院</p>
                          <p className="fs12">Queen Ethelburga’s College</p>
                          <p className="fs14">曾就读于厦门外国语学校</p>
                        </div>
                      </div>
                      <div className="process">
                        <p className="bod">申请难点：</p>
                        <p>学生性格内向，和其他人的沟通能力较差没有很清晰的海外中学的学习目标</p>
                        <p className="bod">解决方案：</p>
                        <p>
                          孩子的性格很内向，但好在准备时间充分，所以在选校上有一定的选择余地。家长目标是英国A-Level排名高的私立中学，在文书定稿投递申请后给孩子做了测试和语言内测，同时参加了学校安排的Skype面试，面试前我这边给孩子做了详细的辅导，因为孩子性格太内向，所以在面试辅导上花了很多时间准备，最终通过了面试成功拿到录取。
                          在此我建议，申请英国私立高中，一定要根据孩子的自身条件确定好要申请的学校的类型，有的学校需要提供雅思成绩，有的学校需要学生到北京参加入学考试，要求各有不同，所以申请的时间上尽量提前。很多英国的传统老牌私立高中，国际生的名额很少，所以晚一点申请的话可能就没有位置了。
                        </p>
                      </div>
                      <div className="b-title teacher">
                        <img src={require('../../public/img/enMiddle/wang.png')} alt="" />
                        <div className="message tme">
                          <p className="fs18">汪洋老师</p>
                          <p className="fs14">伯明翰大学、帝国理工学院、伦敦大学学院、克莱蒙特</p>
                          <p className="fs14">中学、谢菲尔德中学等申请经验</p>
                        </div>
                        <h4>
                          <Yuyue apply_contry={'英国'} defaultApply_contry={'英国'} qudao_details={'SEM/英国v2中学页PC/offer/预约老师'} defaultShowCountry={'英国'} wrapModalTitle={'预约老师'} submitBtn={'提交'} btnTitle={'预约老师'} />
                          {/* <YuyueDIY qudao_details={'SEM/英国v2中学页PC/offer/预约老师'} defaultShowCountry={'英国'} wrapModalTitle="预约老师" submitBtn={'提交'} btnTitle={'预约老师'} /> */}
                          <Live800 classes={'live800 live8001 wx'} title={'咨询详情'} type={'a'} tips={'院校首页banner'} />
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="safe">
              <h4 className="cs-title sa-title">
                <span></span>
                <p>针对英国中学的服务，安全有保障</p>
                <span></span>
              </h4>
              <ul className="lis">
                <li>
                  <img className="dunpai" src={require('../../public/img/enMiddle/dunpai.png')} alt="" />
                  <p>与英国多家口碑监护机构</p>
                  <p>合作给孩子专业、有责任</p>
                  <p>心的监护</p>
                </li>
                <li>
                  <img className="plane" src={require('../../public/img/enMiddle/feiji.png')} alt="" />
                  <p>开学后的首次接机，护送孩子</p>
                  <p>安全入读学校</p>
                </li>
                <li className="last">
                  <img className="home" src={require('../../public/img/enMiddle/home.png')} alt="" />
                  <p>为孩子安排当地政府、公安系统</p>
                  <p>以及学校严格考察后认可并准许</p>
                  <p>的寄宿家庭</p>
                </li>
              </ul>
            </div>
            <Guwen />
          </div>
        </div>
        <NewSocityShun />
        <div className="rel1920">
          <div className="rel1100">
            <div className="good">
              <h4 className="cs-title sa-title"><span></span><p>学生、家长的认可和好评</p><span></span></h4>
              <div className="lunbo">
                <div className="row">
                  <div id="carousel-example-generic" className="carousel slide carousel-img" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                      <div className="item">
                        <span><img src={require('../../public/img/enMiddle/lb01.png')} alt="" data-idx="0" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb02.png')} alt="" data-idx="1" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb03.jpg')} alt="" data-idx="2" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb04.png')} alt="" data-idx="3" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb05.png')} alt="" data-idx="4" data-toggle="modal" data-target="#showBigImg" /></span>
                      </div>
                      <div className="item">
                        <span><img src={require('../../public/img/enMiddle/lb06.png')} alt="" data-idx="5" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb07.png')} alt="" data-idx="6" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb08.png')} alt="" data-idx="7" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb09.png')} alt="" data-idx="8" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb10.png')} alt="" data-idx="9" data-toggle="modal" data-target="#showBigImg" /></span>
                      </div>
                      <div className="item active">
                        <span><img src={require('../../public/img/enMiddle/lb11.png')} alt="" data-idx="10" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb12.png')} alt="" data-idx="11" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb13.png')} alt="" data-idx="12" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb14.jpg')} alt="" data-idx="13" data-toggle="modal" data-target="#showBigImg" /></span>
                        <span><img src={require('../../public/img/enMiddle/lb15.png')} alt="" data-idx="14" data-toggle="modal" data-target="#showBigImg" /></span>
                      </div>
                    </div>
                    <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AbroadForm apply_contry={'英国'} qudao_details={'SEM/英国v2中学页PC/底部/获得申请方案'} />
        <BotFormData h2title={'给我们一份信任，还您和孩子一个满意录取'} queryBtnTitle={'找顺顺·申满意院校'} class1="hide" class2="show" class3="hide" class4="hide" />
        <SuccessModal />
        <PageInterModals country="uk" circle={2} time1={10000} time2={10000} time3={10000} ceyiceQudaoDetails={'SEM/英国v2中学页PC/弹层/测一测/'} baomingQudaoDetail={'SEM/英国v2中学页PC/弹层/报名/'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

