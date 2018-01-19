/**
 * Created by andy on 17/10/12.
 */

const React = require('react');

const PropTypes = React.PropTypes;

require('./headerInfo.less');

class HeaderInfo extends React.Component {

  static propTypes = {
    headerInfoData: PropTypes.array,
  };

  render() {
    const { headerInfoData } = this.props;
    return (
      <div className="HeaderInfo rel1920">
        <div className="rel1000">
          <div className="newinfo">
            {headerInfoData && headerInfoData.map((item, index) => {
              return (
                <div className={`newinfo-box ${index === 2 ? 'enddiv' : ''}`} key={Math.random()}>
                  <div className="newinfo-box-pic"><img src={`${__CDN__}/public/img/usaAllPic/schoolrankingV4/usa-v4-rank-head-icon${item.id}.png`} alt="" /></div>
                  <div className="newinfo-box-title">{item.title}</div>
                  <div className="newinfo-box-subtitle">{item.subTitle}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = HeaderInfo;
