/**
 * Created by luomengjieluo on 17/5/3.
 * description
 */
require('./PageInterModals.less');

const React = require('react');
const Live800 = require('../../components/Live800');
const CeyiceNew = require('./CeyiceNew');

const PropTypes = React.PropTypes;

const d3Map = {
  usa: require('./tp5.png'),
  uk: require('./tp55.png'),
  hk: require('./country_hk.png'),
};

class CommonModal extends React.Component {

  static defaultProps = {
    circle: 1,
    time1: 1000,
    time2: 1000,
    ceyiceQudaoDetails: 'SEM/美国热门院校-nyuPC/弹层/测一测/',
    country: 'hk',
  };

  static propTypes = {
    //  轮播次数
    circle: PropTypes.number, //  eslint-disable-line
    time1: PropTypes.number,
    time2: PropTypes.number,
    ceyiceQudaoDetails: PropTypes.string, //  内部测一测渠道详情
    country: PropTypes.string,  //  测一测的 三维图片 暂时取值区间 ---- usa, uk
  };

  constructor(props) {
    super();
    this.state = {
      currentModal: -1,  //  当前显示的索引
      circle: props.circle,
      showForm: false,
    };
    this.isMount = true;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        currentModal: 0,
      });
    }, this.props.time1);
  }

  /**
   * @param evt
   * @param idx  当前弹层索引 start 0
   * @param time  下一个弹层 弹出 时间
   */
  setModalLoop(evt, idx, time) {
    evt.preventDefault();
    this.setState({
      currentModal: -1,
    });
    setTimeout(() => {
      this.setState({
        currentModal: idx + 1,
      });
    }, time);
  }

  setLoop() {
    this.state.circle = this.state.circle - 1;
    this.setState({ currentModal: -1 });
    if (this.state.circle > 0) {
      setTimeout(() => {
        this.setState({ currentModal: 0 });
      }, this.props.time1);
    }
  }
  showForm(e) {
    e.preventDefault();
    this.setState({
      showForm: true,
    });
  }
  hideForm() {
    const self = this;
    self.setState({
      showForm: false,
    });
  }
  render() {
    const bkImg = d3Map[this.props.country];
    const { showForm } = this.state;
    return (
      <div>
        <div className="adBg" style={{ display: this.state.currentModal === -1 ? 'none' : 'block' }}>
          <div className="bg-pic-img bm1" style={{ display: this.state.currentModal === 0 ? 'block' : 'none', background: `url(${bkImg}) #fff no-repeat center`, boxShadow: '0 0 5px 5px rgba(0, 0, 0, .1)' }}>
            <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'评估竞争力'} />
            <div className="ceyice-button test-enroll" onClick={(evt) => this.setModalLoop(evt, 0, this.props.time2)} data-growing-title="我不关心"></div>
            <div className="toclose toclose-hk1" onClick={(e) => this.showForm(e)}>
            </div>
          </div>
          <div className="bg-pic-img bg-pichk" style={{ display: this.state.currentModal === 1 ? 'block' : 'none' }}>
            <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'活动报名'} />
            <Live800 classes={'live800 live8001 bg'} title={''} type={'a'} tips={'咨询详情'} />
            <div className="toclose toclose-hk2" onClick={(evt) => this.setLoop(evt)} data-growing-title="我不关心"></div>
          </div>
        </div>
        {showForm && <CeyiceNew qudao_details={this.props.ceyiceQudaoDetails} showForm={showForm} hideForm={e => this.hideForm(e)} />}
      </div>
    );
  }
}

module.exports = CommonModal;
