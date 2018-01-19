require('./BaomingActivity.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');

class BaomingActivity extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '美国' },
    btnTitle: '报名活动',
    wrapModalTitle: '报名活动',
    submitBtn: '提交',
    btnClass: '',
    defaultShowCountry: '实习活动',
    qudao_details: 'SEM/美国V4排名PC/广告位/报名活动',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    apply_contry: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
    wrapModalTitle: PropTypes.string, //  内部modal 大标题 default: 免费预约
    submitBtn: PropTypes.string,  // 提交按钮文字 default: 获取方案
    btnTitle: PropTypes.string, //  触发modal按钮文件
    btnClass: PropTypes.string, //  触发modal按钮 的动态class
    defaultShowCountry: PropTypes.string, //  下拉国家默认选项
  };

  constructor(props) {
    super();
    this.state = {
      multiItem: props.apply_contry || '实习活动',
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
    console.log(abroadData);
    const mobile = this.refs.inputMobileYuyue.value;
    if (!regx.MOBILE_REG.test(mobile)) {
      this.setState({
        errorTips: '手机号码错误',
      });
      this.resetErrorTips();
      return;
    }
    if ($.isClickSubmit) return;
    $.isClickSubmit = true;
    const $btn = $(evt.currentTarget);
    $btn.attr('disabled', true).text('loading...');
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
        $.isClickSubmit = false;
        $btn.attr('disabled', false).text('提交');
        if (data.code) {
          this.setState({
            errorTips: '网络异常请稍后再试！',
          });
          this.resetErrorTips();
        } else {
          this.setState({
            errorTips: '',
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
      <div className="yuyue-container">
        <CustomModal btnclasses={`yuyue-modal-btn ${this.props.btnClass}`} modalclasses={'yuyue-container'} title={''} isFooter={false} btnTitle={this.props.btnTitle} setClose={this.state.setClose}>
          <h3>{this.props.wrapModalTitle}</h3>
          <Dropdown classes={'yuyue-country'} defaultItem={this.props.defaultShowCountry} items={itemData.country} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
          <p><input className="form-group" placeholder="请输入手机号码" type="text" ref="inputMobileYuyue" /></p>
          <p className="err-tips">{this.state.errorTips}</p>
          <p><button type="button" className="btn btn-default" onClick={evt => this.submitAbroad(evt)}>{this.props.submitBtn}</button></p>
        </CustomModal>
      </div>);
  }
}

module.exports = BaomingActivity;
