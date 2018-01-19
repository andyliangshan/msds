const React = require('react');
const TestEnroll = require('../../TestEnroll/TestEnroll');

const PropTypes = React.PropTypes;

class Rank extends React.Component {
  static defaultProps = {
    schoolname: '香港大学',
    rankInfo: [],
  }
  static propTypes = {
    schoolname: PropTypes.string.isRequired,
    rankInfo: PropTypes.object,
  }
  render() {
    const { schoolname, rankInfo } = this.props;
    return (
      <div className="content-common">
        <div className="rank wd1000">
          <div className="title">
            <h3>
              <span className="title-name">{schoolname}</span>
              <span className="title-desc">最新排名</span>
            </h3>
            <div className="title-icon">
              <img src={`${__CDN__}/public/img/hk/v1/university/icon_title.png`} alt="" />
            </div>
          </div>
          <div className="rank-info clearfix">
            <ul className="rank-list fl">
              {
                rankInfo.ranks && rankInfo.ranks.map(item =>
                  <li key={`${item.id}rank`}>
                    {
                      item.ranking ? <strong className="rank-number">#{item.ranking}</strong> :
                      <strong className="rank-number">暂无</strong>
                    }
                    <span className="rank-range">{item.type}</span>
                  </li>,
                )
              }
            </ul>
            {/* <div className="rank-test fl" data-toggle="modal" data-target="#applyjpModalMaster">测试我的录取率&gt;&gt;</div> */}
            <TestEnroll qudao_details={`SEM/香港V1名校_${schoolname}PC/排名/测录取率`} modelId="hk" h2title="测试我的录取率" btnSubmitTitle="提交" propsBtnTitle="测试我的录取率>>" defaultIam="本科生" defaultProject="硕士" propsBtnClass="rank-test fl" applyCountry="香港" />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Rank;
