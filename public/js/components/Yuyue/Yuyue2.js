require('./Yuyue.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');

class Yuyue extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '美国' },
    btnTitle: '在线预约',
    wrapModalTitle: '免费预约',
    // submitBtn: '获取方案',
    btnClass: '',
    defaultShowProgram: '申请中学',
    childrens: null,
    blackBtn: '',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    apply_contry: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
    wrapModalTitle: PropTypes.string, //  内部modal 大标题 default: 免费预约
    // submitBtn: PropTypes.string,  // 提交按钮文字 default: 获取方案
    btnTitle: PropTypes.string, //  触发modal按钮文件
    btnClass: PropTypes.string, //  触发modal按钮 的动态class
    defaultShowProgram: PropTypes.string, //  下拉国家默认选项
    childrens: PropTypes.element,
    blackBtn: PropTypes.string,
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
        $btn.attr('disabled', false).text('获取方案');
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
        <CustomModal btnclasses={`yuyue-modal-btn ${this.props.btnClass}`} modalclasses={`yuyue-container ${this.props.blackBtn}`} title={''} isFooter={false}
                     btnTitle={this.props.btnTitle} setClose={this.state.setClose}>
          <h3>{this.props.wrapModalTitle}</h3>
          {this.props.childrens}
          <Dropdown classes={'yuyue-country'} defaultItem={this.props.defaultShowProgram} items={itemData.programnew} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_education'} />
          <Dropdown classes={'yuyue-avgs'} defaultItem={'北京'} items={itemData.citynew} cb={(key, val) => this.dpCb(key, val)} formKey={'attribution'} />
          <p><input className="form-group" placeholder="请输入手机号码" type="text" ref="inputMobileYuyue" /></p>
          <p className="err-tips">{this.state.errorTips}</p>
          <p><button type="button" className="btn btn-default" onClick={evt => this.submitAbroad(evt)}><img src={require('./glod_btn5.png')} alt="" /></button></p>
        </CustomModal>
      </div>);
  }
}

module.exports = Yuyue;
