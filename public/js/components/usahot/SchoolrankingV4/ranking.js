/**
 * Created by andy on 17/10/13.
 */
const React = require('react');

const PropTypes = React.PropTypes;

const Live800 = require('../../../components/Live800/Live800');
const EnrollTab = require('../../../components/usahot/EnrollTable/EnrollTab');
const BaomingActivity = require('../../../components/BaomingActivity/BaomingActivity');
const Pipei = require('../../../components/Pipei/Pipei');
const C = require('../../../core/conf');

class Rank extends React.Component {
  static propTypes = {
    rankNav: PropTypes.object,
    firstIds: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      alias: props.firstIds,
      rankData: [],
      cacheMap: {},
    };
  }

  componentDidMount() {
    this.rankFetchData(this.props.firstIds);
    const HH = document.querySelector('.schools');
    const hh = document.querySelector('.kinds');
    if (hh.offsetHeight < HH.offsetHeight) {
      const hs = HH.offsetHeight;
      hh.style.height = hs + 'px'; // eslint-disable-line
      hh.style.background = '#f0f3ff';
    } else if (hh.offsetHeight > HH.offsetHeight) {
      const hs = hh.offsetHeight;
      HH.style.height = hs + 'px'; // eslint-disable-line
    }
  }
  handleSwitch(index, alias) {
    this.setState({
      activeIndex: index,
      alias,
    });
    this.switchRank(alias);
    $('.schools').animate({ scrollTop: 0 }, 500);
  }

  switchRank(alias) {
    const { cacheMap } = this.state;
    if (cacheMap[alias]) return;
    this.rankFetchData(alias);
  }

  rankFetchData(ids, asy = false) {
    if (this.state.cacheMap[ids]) {
      return this.state.cacheMap[ids];
    }
    let d;
    const { cacheMap } = this.state;
    const self = this;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'http://sem.major.shunshunliuxue.com/ranking/college',
        query: { country: 'usa', ranking: ids },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: asy,
      success: data => {
        const res = data.data.college_list[ids];
        cacheMap[ids] = res;
        d = res;
        self.setState({
          cacheMap,
          rankData: d,
        });
      },
    });
    return d;
  }

  insertLi(index, rankVal) {
    let liPic = null;
    if (index === 8 || index === 41 || index === 73) {
      liPic = (<li key={Math.random()}><div className="bannersite banner1"><a href="http://lp.shunshunliuxue.cn/usa/hot/home#/" target="_blank"><img src={`${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-4.png`} alt="" /></a></div></li>);
    } else if (index === 17 || index === 49 || index === 81) {
      liPic = (<li key={Math.random()}><div className="bannersite banner2"><a href="http://lp.shunshunliuxue.cn/fee/v2/" target="_blank"><img src={`${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-3.png`} alt="" /></a></div></li>);
    } else if (index === 25 || index === 57 || index === 89) {
      liPic = (<li key={Math.random()}><div className="bannersite banner3"><a href="http://lp.shunshunliuxue.cn/usa/agent/" target="_blank"><img src={`${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-1.png`} alt="" /></a></div></li>);
    } else if (index === 33 || index === 65 || index === 97) {
      liPic = (<li key={Math.random()}><div className="bannersite banner4" style={{ background: `url(${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-2.png) no-repeat` }}><EnrollTab qudao_details={'SEM/美国V4排名PC/小banner/留学体检'} wrapModalTitle={'基本信息'} /></div></li>);
    } else {
      liPic =
        (<li className="school clearfix" key={Math.random()}>
          <div className="rowData row">
            <div className={`col-xs-2 ranknum ${index === 0 ? 'colorred' : ''} ${index === 1 ? 'coloryellow' : ''} ${index === 2 ? 'colorpink' : ''}`}>{rankVal.ranking}</div>
            <div className="col-xs-4 ranksch">
              <div className="cname">{rankVal.name}</div>
              <div className="ename">{rankVal.enname}</div>
            </div>
            <div className="col-xs-2 rankinfo">
              {rankVal.link ? <a href={`${rankVal.link}`} className="schoolinfo" target="_blank">查看</a> : <span className="noschoolinfo" disabled="disabled">暂无</span>}</div>
            <div className="col-xs-4 rankbtn">
              <a href="javascript:void(0)" className="enroll" data-toggle="modal" data-target="#middleV4">测录取率</a>
              <Live800 classes={'live800 live8001 wangxun'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
            </div>
          </div>
        </li>);
    }
    return liPic;
  }

  render() {
    const { rankNav } = this.props;
    const { activeIndex, alias, cacheMap } = this.state;
    const reason = {
      three: '30,000+满意offer',
    };
    return (
      <div className="rel1920">
        <div className="rank-wraper wd1000">
          <div className="rank">
            <ul className="table-title">
              <li className="top1">排名分类</li>
              <li className="top2">排名</li>
              <li className="top3">名称</li>
              <li className="top4">院校介绍</li>
              <li className="top5">录取</li>
            </ul>
            <div className="table-content clearfix">
              <ul className="kinds">
                {
                  rankNav.item.map((val, idx) =>
                    <li key={Math.random()} className={activeIndex === idx ? 'active' : ''} onClick={() => { this.handleSwitch(idx, val.alias); }}>{val.name}</li>,
                  )
                }
              </ul>
              <ul className="schools">
                {
                  cacheMap[alias] && cacheMap[alias].map((rankVal, rankIndex) =>
                    this.insertLi(rankIndex, rankVal),
                  )
                }
              </ul>
            </div>
            <div className="weipic clearfix">
              <div className="showrankingPic firstBg"><a href={rankNav.link1} target="_blank">
                <img src={`${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-${rankNav.program}-pic1.jpg`} alt="" /></a></div>
              <div className="showrankingPic shownineth" style={{ background: `url(${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-${rankNav.program}-pic2.jpg) no-repeat center top` }}>
                <Pipei defaultShowCountry="美国" qudao_details={'SEM/美国V4排名PC/广告位/选校工具'} wrapModalTitle={'免费选校'} btnTitle={'免费选校'} reason={reason} defaultShowGrade={'硕士'} defaultShowCost={'￥25万左右'} />
              </div>
              <div className="showrankingPic bamingActivity" style={{ background: `url(${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-${rankNav.program}-pic3.jpg) no-repeat center top` }}>
                <BaomingActivity qudao_details={'SEM/美国V4排名PC/广告位/报名活动'} wrapModalTitle={'报名活动'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Rank;
