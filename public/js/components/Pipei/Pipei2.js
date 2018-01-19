require('./Pipei.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');

class Pipei extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '英国' },
    wrapModalTitle: '测试匹配度',
    submitBtn: '确定',
    btnTitle: '测试匹配度',
    btnClass: '',
    defaultShowCountry: '美国',
    defaultProgram: '硕士',
    defaultAvgs1: '￥30-40万',
    thirdth: '招生官+常青藤导师指导',
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
    defaultProgram: PropTypes.string,
    defaultAvgs1: PropTypes.string,
    thirdth: PropTypes.string, // 右侧第三个文案的拼值
  };

  constructor(props) {
    super();
    this.state = {
      multiItem: props.apply_contry || '美国',
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
    const mobile = this.refs.inputMobilePipei.value;
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
            <span className="pipei-span">申请国家:</span><Dropdown classes={'apply-country'} defaultItem={this.props.defaultShowCountry} items={itemData.country} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
            <span className="pipei-span">申请项目:</span><Dropdown classes={'apply-program'} defaultItem={this.props.defaultProgram} items={itemData.program} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_education'} />
            <span className="pipei-span">一年预算:</span><Dropdown classes={'apply-avgs'} defaultItem={this.props.defaultAvgs1} items={itemData.avgs1} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
            <span className="pipei-span">手机号:</span><p className="pipei-input"><input type="text" placeholder="请输入手机号码" ref="inputMobilePipei" /></p>
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
              <li><img src={require('./dui.png')} alt="" /><span>{this.props.thirdth}</span></li>
              <li><img src={require('./dui.png')} alt="" /><span>服务不满闪电退款</span></li>
            </ul>
          </div>
        </CustomModal>
      </div>);
  }
}

module.exports = Pipei;
