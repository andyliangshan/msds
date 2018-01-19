require('./Yuyue.less');

const React = require('react');

const PropTypes = React.PropTypes;

const CustomModal = require('../CustomModal');
const regx = require('../../core/regexp');

const textarea = {
  width: '100%',
  height: '100px',
  fontSize: '14px',
  borderRadius: '4px',
  WebkitBorderRadius: '4px',
  MozBorderRadius: '4px',
  border: '1px solid #e3eaee',
  padding: '5px 5px 5px 12px',
  resize: 'none',
  marginBottom: '10px',
};
class Yuyue extends React.Component {

  static defaultProps = {
    abroadData: { apply_contry: '美国' },
    btnTitle: '在线预约',
    wrapModalTitle: '免费预约',
    submitBtn: '获取方案',
    btnClass: '',
    qudao_details: 'SEM/美国V4聚合页PC/外教/提问',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    apply_contry: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
    wrapModalTitle: PropTypes.string, //  内部modal 大标题 default: 免费预约
    submitBtn: PropTypes.string,  // 提交按钮文字 default: 获取方案
    btnTitle: PropTypes.string, //  触发modal按钮文件
    btnClass: PropTypes.string, //  触发modal按钮 的动态class
  };

  constructor(props) {
    super();
    this.state = {
      multiItem: props.apply_contry || '美国',
      errorTips: '',
      setClose: false,
    };
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
    const name = this.refs.inputNameYuyue.value;
    const mobile = this.refs.inputMobileYuyue.value;
    const textremark = this.refs.textremark.value;
    if (!name) {
      this.setState({
        errorTips: '姓名不能为空!',
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
    if ($.isClickSubmit) return;
    $.isClickSubmit = true;
    const $btn = $(evt.currentTarget);
    $btn.attr('disabled', true).text('loading...');
    abroadData.name = name;
    abroadData.mobile = mobile;
    abroadData.qudao_details = qudao_details; //  eslint-disable-line
    abroadData.xifenqudao = 'SEM';
    abroadData.remark = textremark;
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
        <CustomModal btnclasses={`yuyue-modal-btn ${this.props.btnClass}`} modalclasses={'yuyue-container'} title={''} isFooter={false} btnTitle={this.props.btnTitle} setClose={this.state.setClose}>
          <h3>{this.props.wrapModalTitle}</h3>
          <p><input className="form-group" placeholder="请输入姓名" type="text" ref="inputNameYuyue" /></p>
          <p><input className="form-group" placeholder="请输入手机号码" type="text" ref="inputMobileYuyue" /></p>
          <p><textarea ref="textremark" placeholder="请输入您的问题" style={textarea}></textarea></p>
          <p className="err-tips">{this.state.errorTips}</p>
          <p><button type="button" className="btn btn-default" onClick={evt => this.submitAbroad(evt)}>{this.props.submitBtn}</button></p>
        </CustomModal>
      </div>);
  }
}

module.exports = Yuyue;
