/**
 * Created by luomengjieluo on 17/5/3.
 * description
 */
require('./PageInterModals.less');

const React = require('react');
const Live800 = require('../../components/Live800');
const CeyiceModal = require('./CeyiceModal');
const Yuyue = require('../../components/Yuyue/Yuyue2');

const PropTypes = React.PropTypes;

const d3Map = {
  bg1: require('./glodbg1.png'),
  bg2: require('./glodbg2.png'),
};

class CommonModal extends React.Component {

  static defaultProps = {
    circle: 1,
    time1: 1000,
    time2: 1000,
    ceyiceQudaoDetails: 'SEM/美国热门院校-nyuPC/弹层/测一测/',
    baomingQudaoDetail: 'SEM/美国热门院校-nyuPC/弹层/报名',
    country: 'bg1',
    baogao: 'bg2',
  };

  static propTypes = {
    //  轮播次数
    circle: PropTypes.number, //  eslint-disable-line
    time1: PropTypes.number,
    time2: PropTypes.number,
    ceyiceQudaoDetails: PropTypes.string, //  内部测一测渠道详情
    baomingQudaoDetail: PropTypes.string, //  内部报名渠道详情
    country: PropTypes.string,  //  测一测的 三维图片 暂时取值区间 ---- usa, uk
    baogao: PropTypes.string,  //  报告的 图片 暂时取值区间 ---- usa, uk, HK
  };

  constructor(props) {
    super();
    this.state = {
      currentModal: -1,  //  当前显示的索引
      circle: props.circle,
    };
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

  render() {
    const bkImg = d3Map[this.props.country];
    const baogaoImg = d3Map[this.props.baogao];
    const cyue = (<div className="yuyuetitle"><img src={`${__CDN__}/public/img/usaAllPic/usaV4_1/glod_btn4.png`} alt="" /></div>);
    return (
      <div className="adBg cgold" style={{ display: this.state.currentModal === -1 ? 'none' : 'block' }}>
        <div className="bg-pic-img bm1" style={{ display: this.state.currentModal === 0 ? 'block' : 'none', background: `url(${bkImg}) no-repeat center` }}>
          <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'评估竞争力'} />
          <div className="ceyice-button test-enroll glodCece">
            <CeyiceModal qudao_details={this.props.ceyiceQudaoDetails} btnTitle={''} />
          </div>
          <div className="toclose" onClick={(evt) => this.setModalLoop(evt, 0, this.props.time2)} data-growing-title="我不关心"><img src={require('./glod_btn3.png')} alt="" /></div>
        </div>

        <div className="bg-pic-img bg-pic2" style={{ display: this.state.currentModal === 1 ? 'block' : 'none', background: `url(${baogaoImg}) no-repeat center` }}>
          <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'立即预约招生官'} />
          <div className="baoming-button">
            <Yuyue qudao_details={this.props.baomingQudaoDetail} btnTitle={'立即预约招生官'} wrapModalTitle={'立即预约招生官'} submitBtn={'提交'} blackBtn={'blackBtn'} childrens={cyue} />
          </div>
          <div className="toclose" onClick={(evt) => this.setLoop(evt)} data-growing-title="我不关心"><img src={require('./glod_btn3.png')} alt="" /></div>
        </div>
      </div>
    );
  }
}

module.exports = CommonModal;
