/**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class IntCRP extends React.Component {
  static defaultProps = {
    showLive800: false,
  }
  static propTypes = {
    majorTabData: PropTypes.object,
    showLive800: PropTypes.bool,
  };

  render() {
    const { majorTabData, showLive800 } = this.props;
    return (
      <div className="rel1920 crp">
        <div className="rel1100 pd30">
          <div className="fservice">
            <h2>极致服务—申请透明可跟踪，服务不满闪电退费</h2>
            <div className="fs-left">
              {majorTabData.serviceData.map((item) => {
                return (
                  <div key={Math.random()} className="l-top">
                    <p><em></em>{item.t1}</p>
                    <p className="spe">{item.text}</p>
                  </div>
                );
              })}
              <p className="xuehua"><img src={require('../../../../img/usaAllPic/major/xuehua.png')} alt="" />顺顺承诺，服务不满意，确认无误15天内退款</p>
              { showLive800 && <Live800 classes={'live800 live-crp'} title={'了解全程透明的顺顺系统'} type={'a'} tips={'了解全程透明的顺顺系统'} /> }
            </div>
            <div className="fs-right">
              <img src={require('../../../../img/usaAllPic/major/qq.png')} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = IntCRP;
