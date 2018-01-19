require('./Pipei.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');

const style = {
  display: 'inline-block',
  fontSize: '20px',
  fontWeight: '700',
  fontFamily: 'Arial',
  color: '#e52e16',
  fontStyle: 'normal',
  verticalAlign: 'middle',
  paddingTop: '3px',
};
const style1 = {
  display: 'inline-block',
  fontSize: '14px',
  fontFamily: 'Arial',
  color: '#000',
  fontStyle: 'normal',
  textDecoration: 'none',
};
class Pipei extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '英国' },
    wrapModalTitle: '测试匹配度',
    submitBtn: '确定',
    btnTitle: '测试匹配度',
    btnClass: '',
    defaultShowCountry: '英国研究生排名',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    apply_contry: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
    wrapModalTitle: PropTypes.string, //  内部modal 大标题 default: 为我选校
    submitBtn: PropTypes.string,  // 内部提交按钮文字 default: 确定
    btnTitle: PropTypes.string, //  触发modal按钮文字
    btnClass: PropTypes.string, //  触发modal按钮 的动态class
    defaultShowCountry: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = {
      multiItem: props.apply_contry || '英国',
      errorTips: '',
      setClose: false,
    };
  }

  dpCb(key, val) {
    Object.assign(this.props.abroadData, { [key]: val });
  }

  resetErrorTips() {
    setTimeout(() => {
      this.setState({
        errorTips: '',
      });
    }, 2000);
  }

  submitAbroad(evt) {
    evt.preventDefault();
    const { abroadData, qudao_details } = this.props;
    const weixin = this.refs.inputWeixinPipei.value;
    const mobile = this.refs.inputMobilePipei.value;
    if (!weixin) {
      this.setState({
        errorTips: '微信号错误',
      });
      this.resetErrorTips();
      return;
    }
    if (!regx.MOBILE_REG.test(mobile)) {
      this.setState({
        errorTips: '手机号码错误',
      });
      this.resetErrorTips();
      return;
    }
    abroadData.mobile = mobile;
    abroadData.qudao_details = qudao_details; //  eslint-disable-line
    abroadData.xifenqudao = 'SEM';
    abroadData.remark = `我的微信号:${weixin}`;
    fetch('/api/abroadPlan', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(abroadData),
    }).then(res => res.json())
      .then(data => {
        if (data.code) {
          this.setState({
            errorTips: '网络异常请稍后再试！',
          });
          this.resetErrorTips();
        } else {
          this.setState({
            errorTips: '提交成功！！',
            setClose: true,
          });
          $('#successModal').on('hidden.bs.modal', () => {
            this.setState({ setClose: false });
          });
          $('#successModal').modal('show');
        }
      });
  }

  render() {
    return (
      <div className="pipei">
        <CustomModal btnclasses={`modal-btn ${this.props.btnClass}`} title={''} isFooter={false} btnTitle={this.props.btnTitle} setClose={this.state.setClose} modalclasses={'pipei-container'}>
          <div className="pipei-form">
            <h3>{this.props.wrapModalTitle}</h3>
            <span className="pipei-span"><em style={style}>*</em><i style={style1}>资料:</i></span><Dropdown classes={'apply-country'} defaultItem={this.props.defaultShowCountry} items={itemData.metaril} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
            <span className="pipei-span"><em style={style}>*</em><i style={style1}>微信:</i></span><p className="pipei-input"><input type="text" placeholder="请填写微信" ref="inputWeixinPipei" /></p>
            <span className="pipei-span"><em style={style}>*</em><i style={style1}>手机:</i></span><p className="pipei-input"><input type="text" placeholder="请填写手机号码" ref="inputMobilePipei" /></p>
            <p className="err-tips">{this.state.errorTips}</p>
            <p className="modal-tips" data-toggle="tooltip" data-placement="right" title="" data-original-title="手机号码只用于<br/>顺顺留学的必要留学沟通<br/>小顺子打死也不会出卖你的!">
              <span><img src="https://o6achqjeh.qnssl.com/public/assets/images/en/enmaster/why.png" alt="" /></span>隐私声明
            </p>
            <p><button type="button" className="btn btn-default" onClick={evt => this.submitAbroad(evt)}>{this.props.submitBtn}</button></p>
          </div>
          <div className="pipei-text">
            <h3>大家选择顺顺</h3>
            <ul>
              <li><img src={require('./dui.png')} alt="" /><span>88.7%申到理想院校</span></li>
              <li><img src={require('./dui.png')} alt="" /><span>全程透明、可跟踪</span></li>
              <li><img src={require('./dui.png')} alt="" /><span>一对一原创定制文书</span></li>
              <li><img src={require('./dui.png')} alt="" /><span>服务不满闪电退款</span></li>
            </ul>
          </div>
        </CustomModal>
      </div>);
  }
}

module.exports = Pipei;
