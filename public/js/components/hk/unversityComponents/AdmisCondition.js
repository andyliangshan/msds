const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class AdmisCondition extends React.Component {
  static defaultProps = {
    condition: {},
  }
  static propTypes = {
    condition: PropTypes.object.isRequired,
  }
  render() {
    const { condition } = this.props;
    return (
      <div className="content-common admission">
        <div className="condition wd1000">
          <div className="title">
            <h3>
              <span className="title-name">{condition.name}</span>
              <span className="title-desc">录取条件</span>
            </h3>
            <div className="title-icon">
              <img src={`${__CDN__}/public/img/hk/v1/university/icon_title.png`} alt="" />
            </div>
          </div>
          <div className="conditon-info">
            <ul className="program clearfix">
              <li className="fl">
                <h4>硕士方案一：授课型</h4>
                <p dangerouslySetInnerHTML={{ __html: condition.program1 }}></p>
                <Live800 classes={'live800 live-hk'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
                {/* <div className="live-hk">咨询这个方案</div> */}
              </li>
              <li className="fr">
                <h4>硕士方案二：研究型</h4>
                <p dangerouslySetInnerHTML={{ __html: condition.program2 }}></p>
                <Live800 classes={'live800 live-hk'} title={'咨询这个方案'} type={'a'} tips={'咨询这个方案'} />
              </li>
            </ul>
            <div className="condition">
              <div className="master">
                <h4>硕士录取条件</h4>
                <ul className="condition-list">
                  {
                    condition.master && condition.master.map(item =>
                      <li key={`${Math.random()}master`}>
                        <span className="circle"></span>
                        <span>{item}</span>
                      </li>,
                    )
                  }
                </ul>
              </div>
              <div className="master undergrade">
                <h4>本科录取条件</h4>
                <ul className="condition-list">
                  {
                    condition.undergrade && condition.undergrade.map(item =>
                      <li key={`${Math.random()}under`}>
                        <span className="circle"></span>
                        <span>{item}</span>
                      </li>,
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = AdmisCondition;
