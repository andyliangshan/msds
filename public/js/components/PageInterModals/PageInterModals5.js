/**
 * Created by luomengjieluo on 17/5/3.
 * description
 */
require('./PageInterModals.less');

const React = require('react');
const Live800 = require('../../components/Live800');
const CeyiceModal = require('./CeyiceModal');
const BaomingModal = require('./BaomingModal');

const PropTypes = React.PropTypes;

const d3Map = {
  usa: require('./tp5.png'),
  uk: require('./tp55.png'),
};

class CommonModal extends React.Component {

  static defaultProps = {
    circle: 1,
    time1: 1000,
    time2: 1000,
    time3: 1000,
    time4: 1000,
    ceyiceQudaoDetails: 'SEM/美国热门院校-nyuPC/弹层/测一测/',
    baomingQudaoDetail: 'SEM/美国热门院校-nyuPC/弹层/报名',
    country: 'usa',
  };

  static propTypes = {
    //  轮播次数
    circle: PropTypes.number, //  eslint-disable-line
    time1: PropTypes.number,
    time2: PropTypes.number,
    time3: PropTypes.number,
    // time4: PropTypes.number,
    ceyiceQudaoDetails: PropTypes.string, //  内部测一测渠道详情
    baomingQudaoDetail: PropTypes.string, //  内部报名渠道详情
    country: PropTypes.string,  //  测一测的 三维图片 暂时取值区间 ---- usa, uk
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

  openPanel(evt) {
    evt.preventDefault();
    // const liveTips = '立即咨询';
    // const base800 = 'http://webchat.shunshunliuxue.com/live800/chatClient/chatbox.jsp?companyID=8958&configID=3';
    // const enterurl = encodeURIComponent(decodeURIComponent(location.href));
    // const firstEnterurl = encodeURIComponent(decodeURIComponent(location.href) + liveTips);
    // const opened = `${base800}&enterurl=${enterurl}&firstEnterurl=${firstEnterurl}&jzl_id=${window.jzlvisitor_id}`;
    const base800 = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=72111';
    const opened = `${base800}&clientId=${window.jzlvisitor_id.substr(0, 16)}`;
    /* eslint-disable */
    const centerWidth = window.innerWidth / 2 - 245;
    const centerHeight = window.innerHeight / 2 - 260;
    window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=520');
    /* eslint-enable */
  }

  render() {
    const bkImg = d3Map[this.props.country];
    return (
      <div className="adBg" style={{ display: this.state.currentModal === -1 ? 'none' : 'block' }}>
        <div className="bg-pic-img bm1" style={{ display: this.state.currentModal === 0 ? 'block' : 'none', background: `url(${bkImg}) no-repeat center` }}>
          <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'测一测'} />
          <div className="ceyice-button test-enroll">
            <CeyiceModal qudao_details={this.props.ceyiceQudaoDetails} btnTitle={''} />
          </div>
          <div className="toclose" onClick={(evt) => this.setModalLoop(evt, 0, this.props.time2)} data-growing-title={'我不关心'}></div>
        </div>
        <div className="bg-pic-img bg-pic2" style={{ display: this.state.currentModal === 1 ? 'block' : 'none' }}>
          <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'活动报名'} />
          <div className="baoming-button">
            <div className="bm1 baoming-bm"><BaomingModal qudao_details={this.props.baomingQudaoDetail} btnTitle={''} /></div>
            <div className="bm2 baoming-bm"><BaomingModal qudao_details={this.props.baomingQudaoDetail} btnTitle={''} /></div>
            <div className="bm3 baoming-bm"><BaomingModal qudao_details={this.props.baomingQudaoDetail} btnTitle={''} /></div>
          </div>
          <Live800 classes={'live800 live8001 bg'} title={''} type={'a'} tips={'咨询详情'} />
          <div className="toclose" onClick={(evt) => this.setModalLoop(evt, 1, this.props.time3)} data-growing-title={'我不关心'}></div>
        </div>
        <div className="bg-pic-img bg-pic3 bm1" style={{ display: this.state.currentModal === 2 ? 'block' : 'none' }}>
          <Live800 classes={'live800 live8001 bg-pic'} title={''} type={'a'} tips={'弹窗1'} data-growing-title={'为我解读'} />
          <Live800 classes={'live800 live8001 bg'} title={''} type={'a'} tips={'为我解读'} data-growing-title={'为我解读'} />
          <div className="toclose" onClick={(evt) => this.setLoop(evt)} data-growing-title={'我不关心'}></div>
        </div>
      </div>
    );
  }
}

module.exports = CommonModal;
