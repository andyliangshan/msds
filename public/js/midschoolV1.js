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
const SocityShun = require('./components/SocityPriceCommon/ShunsocityTs');
const Yuyue = require('./components/Yuyue');
const Xuanxiao = require('./components/Xuanxiao/Xuanxiao2');
const Activity = require('./components/usahot/SubActivity');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const AbroadNatrue = require('./components/usahot/AbroadNature/AbroadNatrue');
const C = require('./core/conf');
const PageInterModals = require('./components/PageInterModals/PageInterModals3');
const wangxunData = require('./components/usahot/ExtraData/wangxunData.json');


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

  fetchData() {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://sem.major.shunshunliuxue.com/ranking/college',
        query: { country: 'usa' },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data.data.college_list.usnews_high_school;
      },
    });
    return d;
  }

  render() {
    const bannerChildren = (<div className="rel1100"></div>);
    const schoolRankData = this.fetchData();
    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/midschoolV1/usa-midschool-banner-top.jpg`} childrens={bannerChildren} />
        <Activity />
        <div className="rel1920">
          <div className="rel1100">
            <div className="chooiceschool clearfix">
              <h2>家长该怎样帮孩子选学校</h2>
              <div className="midchooice clearfix">
                <div className="midchooice-list">
                  <div className="midchooice-list-icon"><img src={require('../img/usaAllPic/midschoolV1/usa-midschool-xuanxiao-icon1.png')} alt="" /></div>
                  <div className="midchooice-list-desc">
                    <div className="midchooice-list-subtitle">按孩子的性格、兴趣</div>
                    <p>一般来说，自信独立性强的孩子，可以尝试私立走读，内向腼腆的孩子，可以选择公立住宿中学，此外美国中学还分为男女校、混合校等，家长可以结合孩子的意愿，帮助孩子选择。</p>
                    <p>如果您对孩子性格特征不太确定,可以测试一下孩子性格<a href="javascript:void(0)" className="atest" data-toggle="modal" data-target="#quetionlist">去测试</a><em>&nbsp;&gt;&gt;</em></p>
                  </div>
                </div>
                <div className="midchooice-list">
                  <div className="midchooice-list-icon"><img src={require('../img/usaAllPic/midschoolV1/usa-midschool-xuanxiao-icon2.png')} alt="" /></div>
                  <div className="midchooice-list-desc">
                    <div className="midchooice-list-subtitle">参考院校的排名</div>
                    <p>美国中学排名分为<b>公立中学排名</b>和<b>私立院校排名</b>，总的来说，公立私立教育质量都是很高的，并没有绝对的优劣，家长无须太过纠结。</p>
                    <p>但需要警惕，一旦误入野鸡学校，肯定耽误孩子前程，您可以让顺顺顾问先帮孩子把把关 <Live800 classes={'live800'} title={'咨询顾问'} type={'a'} tips={'咨询顾问'} /><em>&nbsp;&gt;&gt;</em></p>
                  </div>
                </div>
                <div className="midchooice-list enddiv">
                  <div className="midchooice-list-icon"><img src={require('../img/usaAllPic/midschoolV1/usa-midschool-xuanxiao-icon3.png')} alt="" /></div>
                  <div className="midchooice-list-desc">
                    <div className="midchooice-list-subtitle">按地理位置</div>
                    <p>一般来说，美国的东部和西部比较繁荣，交通方便，文化底蕴深厚，学校也较多，大部分家长和学生偏爱东西部。但是咱们家长也要考虑升学的愿望和自己朋友圈子，然后做决定。</p>
                    <p>每个州都有顶尖的中学，您可以先和老师了解一下<Live800 classes={'live800'} title={'咨询一下'} type={'a'} tips={'咨询一下'} /><em>&nbsp;&gt;&gt;</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rel1920 cobste">
          <div className="rel1100">
            <div className="liuxuejob clearfix">
              <h2>了解过这些问题，才能让孩子留学无忧</h2>
              <div className="liuxuejob-subtitle">点击问题，立即获得解答！</div>
              <div className="liuxuejob-list clearfix">
                {wangxunData.map((item, index) => {
                  return (
                    <div key={Math.random()} className={`liuxuejob-list-cont ${(index === 2 || index === 5 || index === 8) ? 'enddiv' : ''}`}>
                      <Live800 classes={`live800 ${index === 8 ? 'cosdiv' : ''}`} title={item.title} type={'a'} tips={item.title} />
                    </div>
                  );
                })}
              </div>
              <div className="liuxuejob-bottitle">来源：顺顺整理2016年送出的500+美国中学生，汇总了家长最关心的问题</div>
            </div>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="schoolrank">
              <h2>2018美国中学排名</h2>
              <div className="schoolrank-list">
                <div className="schoolrank-list-header row">
                  <div className="col-xs-2">排名</div>
                  <div className="col-xs-3">学校名称</div>
                  <div className="col-xs-3">所在地区</div>
                  <div className="col-xs-2">录取率</div>
                  <div className="col-xs-2">条件和费用</div>
                </div>
                <div className="schoolrank-list-body">
                  {schoolRankData.map((item, index) => {
                    return (
                      <div className="schoolrankrow row" key={Math.random()}>
                        <div className={`col-xs-2 ranknum ${index === 0 ? 'red' : ''} ${index === 1 ? 'yellow' : ''} ${index === 2 ? 'pink' : ''}`}>{item.ranking}</div>
                        <div className="col-xs-3 schoolname"><p className="p01">{item.name}</p><p>{item.enname}</p></div>
                        <div className="col-xs-3 location">{item.location}</div>
                        <div className="col-xs-2 enroll"><Xuanxiao qudao_details={'SEM/美国V3中学页PC_1/院校排名/测试录取率'} /></div>
                        <div className="col-xs-2 conditionfee"><Live800 classes={'live800'} title={'咨询顾问'} type={'a'} tips={'咨询顾问'} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="schoolrank-bottile">注：排名仅提供参考意义，每个州都有顶尖中学，可能并未上榜，详情咨询顺顺顾问了解</div>
            </div>
          </div>
        </div>
        <div className="rel1920 cobste">
          <div className="rel1100">
            <div className="servicestudent">
              <h2>机构千千万，顺顺留学能帮助孩子做什么</h2>
              <div className="servicestudent-list">
                <div className="servicestudent-box">
                  <div className="servicestudent-img"><img src={require('../img/usaAllPic/midschoolV1/usa-midschool-company1.png')} alt="" /></div>
                  <div className="servicestudent-con">
                    <div className="servicestudent-title">给孩子美式申请——前哈佛招生官、常青藤导师</div>
                    <div className="servicestudent-desc">
                      <p><em>&nbsp;</em><span>顶尖的师资团队，外教导师均毕业于斯坦福、哥伦比亚大学、哈佛大学等顶尖院校</span></p>
                      <p><em>&nbsp;</em><span>为孩子提供最地道的美式思维的申请</span></p>
                      <p><em>&nbsp;</em><span>首位华人哈佛招生委员，帮孩子更高录取率申到名校</span></p>
                    </div>
                    <div className="servicestudent-btn yuyue-teacher"><Yuyue qudao_details={'SEM/美国V3中学页PC_1/尊享/预约外籍导师'} btnTitle={'预约外籍导师'} /></div>
                  </div>
                </div>
                <div className="servicestudent-box-tese">
                  <div className="servicestudent-con">
                    <div className="servicestudent-title">给您和孩子最优质高效的服务——线上门店双服务</div>
                    <div className="servicestudent-desc">
                      <p>顺顺在全国设有16家分公司，家长可以在门店进行服务的同时，远程沟通任何指定老师，打破了地域的限制，同时又能享受最顶尖的资源</p>
                    </div>
                    <div className="servicestudent-city">
                      <Live800 classes={'live800'} title={'北京'} type={'a'} tips={'北京'} />、<Live800 classes={'live800'} title={'深圳'} type={'a'} tips={'深圳'} />、
                      <Live800 classes={'live800'} title={'上海'} type={'a'} tips={'上海'} />、<Live800 classes={'live800'} title={'成都'} type={'a'} tips={'成都'} />、
                      <Live800 classes={'live800'} title={'西安'} type={'a'} tips={'西安'} />、<Live800 classes={'live800'} title={'重庆'} type={'a'} tips={'重庆'} />、
                      <Live800 classes={'live800'} title={'厦门'} type={'a'} tips={'厦门'} />、<Live800 classes={'live800'} title={'长沙'} type={'a'} tips={'长沙'} />、
                      <Live800 classes={'live800'} title={'济南'} type={'a'} tips={'济南'} />、<Live800 classes={'live800'} title={'郑州'} type={'a'} tips={'郑州'} />、
                      <Live800 classes={'live800'} title={'天津'} type={'a'} tips={'天津'} />、<Live800 classes={'live800'} title={'南京'} type={'a'} tips={'南京'} />、
                      <Live800 classes={'live800'} title={'广州'} type={'a'} tips={'广州'} />、<Live800 classes={'live800'} title={'宁波'} type={'a'} tips={'宁波'} />、
                      <Live800 classes={'live800 endaa'} title={'青岛'} type={'a'} tips={'青岛'} />等城市均有门店
                    </div>
                    <div className="servicestudent-btn"><Live800 classes={'live800'} title={'城市详细地址'} type={'a'} tips={'城市详细地址'} /></div>
                  </div>
                  <div className="servicestudent-img"><img src={require('../img/usaAllPic/midschoolV1/usa-midschool-company2.png')} alt="" /></div>
                </div>
                <div className="servicestudent-box">
                  <div className="servicestudent-img"><img src={require('../img/usaAllPic/midschoolV1/usa-midschool-company3.png')} alt="" /></div>
                  <div className="servicestudent-con">
                    <div className="servicestudent-title">提高孩子录取率——专为初、高中生定制的课外活动</div>
                    <div className="servicestudent-desc">
                      <p><i>顺顺专为中学生定制了</i><Live800 classes={'live800 blue'} title={'夏威夷/马尔代夫志愿者'} type={'a'} tips={'夏威夷/马尔代夫志愿者'} /><i>、</i>
                        <Live800 classes={'live800 blue'} title={'滇金丝猴考察'} type={'a'} tips={'滇金丝猴考察'} /><i>、</i>
                        <Live800 classes={'live800 blue'} title={'机器人训练营'} type={'a'} tips={'机器人训练营'} /><i>、</i>
                        <Live800 classes={'live800 blue'} title={'哈佛耶鲁实验室项目'} type={'a'} tips={'哈佛耶鲁实验室项目'} /><i>、</i>
                        <Live800 classes={'live800 blue'} title={'青岛帆船赛'} type={'a'} tips={'青岛帆船赛'} /><i>等活动，更加符合美国院校的录取要求，提高录取率！</i></p>
                    </div>
                    <div className="servicestudent-subcon">活动满额截止，具体名额和时间请<Live800 classes={'live800'} title={'咨询顾问'} type={'a'} tips={'咨询顾问'} />了解</div>
                    <div className="servicestudent-btn">
                      <Live800 classes={'live800 blue'} title={'咨询活动详情'} type={'a'} tips={'咨询活动详情'} />
                      <Live800 classes={'live800 red'} title={'了解活动费用'} type={'a'} tips={'了解活动费用'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SocityShun />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V3中学页PC_1/底部表单/获得申请方案'} />
        <BotFormData h2title={'88.7%申到理想院校，快来顺顺获offer吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'找顺顺·读名校'} />
        <SuccessModal />
        <AbroadNatrue />
        <PageInterModals circle={2} time1={10000} time2={10000} ceyiceQudaoDetails={'SEM/美国V3中学页PC_1/弹层/测一测/'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

