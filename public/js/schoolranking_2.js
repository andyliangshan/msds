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
const Live800 = require('./components/Live800');
const AbroadForm = require('./components/AbroadForm');
const SuccessModal = require('./components/SuccessModal');
const PageInterModals = require('./components/PageInterModals/PageInterModals2');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const C = require('./core/conf');

const rankNewUsaSearchList = require('./components/usahot/ExtraData/rankNewUsaSearchList.json');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');
const EnrollTab = require('./components/usahot/EnrollTable/EnrollTab');

class UserAgent extends React.Component {

  constructor() {
    super();
    this.cacheMap = {};
    this.state = {
      schoolData: this.fetchData('zonghe', false),
      activeIndex: 0,
      subIndex: 0,
    };
  }

  componentWillMount() {
    UtilNet.generateCookiePKID();
  }

  componentDidMount() {
    UtilNet.replaceUtmSourceLink();
  }

  ullistMouseOver(evt, alias, activeIndex) {
    setTimeout(() => {
      $('html,body').animate({ scrollTop: 0 }, 1000);
      // 初始化变量
      let flag = 0;
      const $dt = $('.ullist');
      const $dd = $('.ullist').children('.subli');
      // 初始化状态
      if (activeIndex === flag) return false;
      flag = activeIndex;
      $dd.not($dd.eq(flag)).slideUp();
      $dd.eq(flag).slideDown();
      $dt.eq(flag).addClass('active');
      $dt.not($dt.eq(flag)).removeClass('active');
      return false;
    }, 0);
    const bkdata = this.fetchData(alias, false);
    this.setState({
      activeIndex,
      subIndex: 0,
      schoolData: bkdata,
    });
  }

  classifyDataClick(evt, rankname, subIndex) {
    evt.preventDefault();
    evt.stopPropagation();
    $('html,body').animate({ scrollTop: 0 }, 1000);
    setTimeout(() => {
      $('.rank-school-right').animate({ scrollTop: 0 }, 1000);
    }, 0);
    const bk = this.fetchData(rankname, false);
    this.setState({
      subIndex,
      schoolData: bk,
    });
  }

  fetchData(alias, asy = true) {
    if (this.cacheMap[alias]) {
      return this.cacheMap[alias];
    }
    let dt;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://sem.major.shunshunliuxue.com/ranking/college',
        query: { country: 'usa', ranking_id: alias },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: asy,
      success: data => {
        const res = data.data.college_list[alias];
        this.cacheMap[alias] = res;
        dt = res;
      },
    });
    return dt;  //  eslint-disable-line
  }

  render() {
    const { activeIndex, schoolData, subIndex } = this.state;
    const alias = rankNewUsaSearchList[activeIndex] ? rankNewUsaSearchList[activeIndex] : '';
    return (
      <div>
        <Header />
        <div className="rel1920">
          <div className="rel1100">
            <div className="rank-school">
              <div className="rank-school-left">
                {rankNewUsaSearchList.map((item, index) => {
                  return (
                    <div className={`ullist ${index === 0 ? 'oneli' : ''} ${index === 6 ? 'enddiv' : ''} ${index === activeIndex ? 'active' : ''}`}
                         key={Math.random()} onClick={evt => this.ullistMouseOver(evt, item.subname[0].alias, index)}>
                      <div className="mainli">{item.title}<em className="active">&nbsp;</em></div>
                      <div className="subli">
                        {item.subname.map((v, ind) => {
                          return (
                            <a href="javascript:void(0)" className={`${ind === subIndex ? 'active' : ''}`} key={Math.random()} onClick={evt => this.classifyDataClick(evt, v.alias, ind)}>{v.item}</a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="rank-school-right">
                <div className="titlebox">
                  <div className="maintitle">{alias.subTitle[subIndex] ? alias.subTitle[subIndex].name : ''}</div>
                  <div className="subtext">{alias.subTitle[subIndex] ? alias.subTitle[subIndex].name1 : ''}</div>
                </div>
                <div className="schoolranking">
                  {schoolData.map((rankVal, rankIndex) => {
                    return (
                      <div key={Math.random()}>
                        <div className="rowData row">
                          <div className={`col-xs-2 ranknum ${rankIndex === 0 ? 'colorred' : ''} ${rankIndex === 1 ? 'coloryellow' : ''} ${rankIndex === 2 ? 'colorpink' : ''}`}>{rankVal.ranking}</div>
                          <div className="col-xs-4 ranksch">
                            <div className="cname">{rankVal.name}</div>
                            <div className="ename">{rankVal.enname}</div>
                          </div>
                          <div className="col-xs-4 rankbtn">
                            <a href="javascript:void(0)" className="enroll" data-toggle="modal" data-target="#applyjpModalMaster">测录取率</a>
                            <Live800 classes={'live800 live8001 wangxun'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
                          </div>
                          <div className="col-xs-2 rankinfo">
                            {rankVal.link ? <a href={`${rankVal.link}`} className="schoolinfo" target="_blank">该校更多信息</a> : <span className="noschoolinfo" disabled="disabled">暂无</span>}</div>
                        </div>
                        {alias.subTitle[subIndex].name1 === '综合大学' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/master/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic1.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="/usa/hot/home#/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic5.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/master/2017offer/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic8.png')} alt="" /></a></div> : ''}
                            {rankIndex === 49 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/allmajor/sk_jrx/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic4.png')} alt="" /></a></div> : ''}
                            {rankIndex === 59 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/fee/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                            {rankIndex === 69 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.subTitle[subIndex].name1 === '文理学院' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/undergraduate/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic2.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="/usa/hot/home#/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.subTitle[subIndex].name1 === '高中' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/midschool/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic3.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="/usa/hot/home#/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.title === '商科类排名' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/allmajor/sk_jrx/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic4.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/master/2017offer/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic8.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/master/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic1.png')} alt="" /></a></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 49 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/fee/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                            {rankIndex === 59 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.title === '理工类排名' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/allmajor/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic4.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/master/2017offer/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic8.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/master/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic1.png')} alt="" /></a></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 49 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/fee/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                            {rankIndex === 59 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.title === '教育类排名' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/allmajor/wkys_jyx/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic4.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/master/2017offer/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic8.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/master/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic1.png')} alt="" /></a></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 49 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/fee/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                            {rankIndex === 59 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.title === '法律类排名' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/major/liberal/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic4.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/master/2017offer/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic8.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/master/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic1.png')} alt="" /></a></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 49 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/fee/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                            {rankIndex === 59 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.title === '医学类排名' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/master/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic1.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/master/2017offer/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic8.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/fee/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                            {rankIndex === 49 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                        {alias.title === '护理类排名' ?
                          <div>
                            {rankIndex === 9 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/version2/master/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic1.png')} alt="" /></a></div> : ''}
                            {rankIndex === 19 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/usa/master/2017offer/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic8.png')} alt="" /></a></div> : ''}
                            {rankIndex === 29 ? <div className="showrankingPic shownineth"><EnrollTab qudao_details={'SEM/美国V3排名_2PC/广告位/留学体检'} wrapModalTitle={'基本信息'} /></div> : ''}
                            {rankIndex === 39 ? <div className="showrankingPic"><a href="http://zt.shunshunliuxue.com/fee/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic6.png')} alt="" /></a></div> : ''}
                            {rankIndex === 49 ? <div className="showrankingPic"><a href="/usa/agent/" target="_blank"><img src={require('../img/usaAllPic/rankV3/usa-rank-v3-pic7.png')} alt="" /></a></div> : ''}
                          </div> : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V3排名_2PC/吸底表单/获得申请方案'} />
        <BotFormData h2title={'88.7%申到理想院校，快来顺顺获offer吧!'} class1="hide" class2="show" class3="hide" class4="hide" />
        <SuccessModal />
        <TestEnroll qudao_details={'SEM/美国V3排名_2PC/排名/测试录取率'} h2title={'测试录取率'} btnSubmitTitle={'提交'} />
        <PageInterModals circle={2} time1={10000} time2={10000} time3={10000} ceyiceQudaoDetails={'SEM/美国V3排名_2PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V3排名_2PC/弹层/报名'} />
      </div>
    );
  }
}

ReactDOM.render(<UserAgent />, document.getElementById('app'));

