/**
 * Created by luomengjieluo on 17/5/3.
 * description
 */
require('./PageInterModals.less');

const React = require('react');
const Live800 = require('../../components/Live800');
const CeyiceModal = require('./CeyiceModal');

const PropTypes = React.PropTypes;

class CommonModal extends React.Component {

  static defaultProps = {
    ceyiceQudaoDetails: 'SEM/美国热门院校-nyuPC/弹层/测一测/',
    bgimg: require('./allcountry1.png'),
  };

  static propTypes = {
    ceyiceQudaoDetails: PropTypes.string, //  内部测一测渠道详情
    bgimg: PropTypes.string,
  };

  componentDidMount() {
    setTimeout(() => {
      $('.adBg').show();
    }, 6000);
  }

  setLoop() {
    $('.adBg').hide();
  }

  render() {
    return (
      <div className="adBg" style={{ display: 'none' }}>
        <div className="bg-pic-img bm1" style={{ display: 'block', background: `url(${this.props.bgimg}) no-repeat center` }}>
          <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'评估竞争力'} />
          <div className="ceyice-button test-enroll">
            <CeyiceModal qudao_details={this.props.ceyiceQudaoDetails} btnTitle={''} />
          </div>
          <div className="toclose" onClick={(evt) => this.setLoop(evt)} data-growing-title={'我不关心'}></div>
        </div>
      </div>
    );
  }
}

module.exports = CommonModal;
