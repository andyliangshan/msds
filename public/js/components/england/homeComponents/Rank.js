const React = require('react');

const PropTypes = React.PropTypes;

const Live800 = require('../../../components/Live800/Live800');

class Rank extends React.Component {
  static propTypes = {
    rankData: PropTypes.object,
    rankNav: PropTypes.array,
    switchRank: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      alias: 'en_ranking_2017',
      rankData: {},
    };
  }

  componentDidMount() {
  }
  handleSwitch(index, alias) {
    this.setState({
      activeIndex: index,
      alias,
    });
    this.props.switchRank(alias);
  }

  render() {
    const { rankNav, rankData } = this.props;
    const { activeIndex, alias } = this.state;
    return (
      <div className="rank-wraper wd1000">
        <div className="rank">
          <ul className="table-title">
            <li className="top1">热门排名</li>
            <li className="top2">排名</li>
            <li className="top3">名称</li>
            <li className="top4">评估</li>
            <li className="top5">在线咨询</li>
          </ul>
          <div className="table-content clearfix">
            <ul className="kinds">
              {
                rankNav.map((item, index) =>
                  <li key={item.id} className={activeIndex === index ? 'active' : ''} style={{ borderTop: index === 0 ? 'none' : '1px solid #e3eaee' }} onClick={() => { this.handleSwitch(index, item.alias); }}>{item.name}</li>,
                )
              }
              <li><Live800 classes={'live800 zixun'} title={'咨询其他专业院校 >>'} type={'a'} tips={'咨询其他专业院校 >>'} /></li>
              <li><a className="zixun" target="_blank" href="http://lp.shunshunliuxue.cn/en/v2/schoolranking/">查看全部排名&nbsp;&gt;&gt;</a></li>
            </ul>
            <ul className="schools">
              {
                rankData[alias] && rankData[alias].map((item) =>
                  <li className="school clearfix" key={item.id}>
                    {item.ranking === '1' && <div className="ranking ranking1 top2 fl">{item.ranking}</div>}
                    {item.ranking === '2' && <div className="ranking ranking2 top2 fl">{item.ranking}</div>}
                    {item.ranking === '3' && <div className="ranking ranking3 top2 fl">{item.ranking}</div>}
                    {(item.ranking !== '1' && item.ranking !== '2' && item.ranking !== '3') && <div className="ranking ranking top2 fl">{item.ranking}</div>}
                    <div className="top3 name fl">
                      <div className="c-name">{item.name}</div>
                      <div className="e-name">{item.enname}</div>
                    </div>
                    <div className="top4 blue-text fl"><a href="javascript:void(0)" className="blue-text" data-toggle="modal" data-target="#applyjpModalMaster">测录取率</a></div>
                    <Live800 classes={'live800 top5 blue-text fl'} title={'咨询录取条件'} type={'a'} tips={'咨询录取条件'} />
                  </li>,
                )
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Rank;
