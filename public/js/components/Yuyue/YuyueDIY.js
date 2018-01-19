require('./Yuyue.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');
const SuccessModal = require('../SuccessModal/SuccessModal');

class YuyueDIY extends React.Component {
  /**
   * 使用 --不-- 需要在页面单独引入 const SuccessModal = require('../SuccessModal/SuccessModal');
   * 预约表单
   * 在页面使用 <YuyueDIY qudao_details=“渠道详情” btnTitle=“页面按钮文案” wrapModalTitle=“表单title” submitBtn=“表单提交按钮文案” btnClass=“页面按钮class” defaultShowCountry=“默认下拉显示” defaultSelectColor=“下拉有选项颜色” />
   * 选择显示哪个下拉 -- applyCountry applyProject 默认显示一个，一个为"1"，另外一个就必须要设置为false。
   * @returns {XML}
   */
  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '' },
    btnTitle: '在线预约',
    wrapModalTitle: '免费预约',
    submitBtn: '获取方案',
    btnClass: '',
    defaultShowCountry: '美国',
    defaultShowEducation: '申请本科',
    defaultSelectColor: '#000',
    applyCountry: '1',
    applyEducation: false,
  };

  static propTypes = {
    abroadData: PropTypes.object,
    qudao_details: PropTypes.string.isRequired,
    wrapModalTitle: PropTypes.string, //  内部modal 大标题 default: 免费预约
    submitBtn: PropTypes.string,  // 提交按钮文字 default: 获取方案
    btnTitle: PropTypes.string, //  触发modal按钮文件
    btnClass: PropTypes.string, //  触发modal按钮 的动态class
    defaultShowCountry: PropTypes.string, //  下拉国家默认选项
    defaultShowEducation: PropTypes.string,
    defaultSelectColor: PropTypes.string,
    applyCountry: PropTypes.bool,
    applyEducation: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
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
    const { abroadData, qudao_details, applyEducation, defaultShowCountry, defaultShowEducation } = this.props;
    const mobile = this.refs.inputMobileYuyue.value;
    if (!abroadData.attribution || abroadData.attribution === '') {
      this.setState({
        errorTips: '请选择就近城市',
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
    abroadData.apply_contry = abroadData.apply_contry || defaultShowCountry;
    if (applyEducation) {
      abroadData.apply_education = abroadData.apply_education || defaultShowEducation;
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
          abroadData.apply_contry = defaultShowCountry;
          abroadData.attribution = '';
          $('#successModal').on('hidden.bs.modal', () => {
            this.setState({ setClose: false });
          });
          $('#successModal').modal('show');
        }
      });
  }

  render() {
    return (
      <div>
        <div className="yuyue-container">
          <CustomModal btnclasses={`yuyue-modal-btn ${this.props.btnClass}`} modalclasses={'yuyue-container'} title={''} isFooter={false} btnTitle={this.props.btnTitle} setClose={this.state.setClose}>
            <h3>{this.props.wrapModalTitle}</h3>
            {
              this.props.applyCountry && <Dropdown classes={'yuyue-country'} defaultSelectColor={this.props.defaultSelectColor} defaultItem={this.props.defaultShowCountry} items={itemData.country} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
            }
            {
              this.props.applyEducation && <Dropdown classes={'yuyue-country'} defaultSelectColor={this.props.defaultSelectColor} defaultItem={this.props.defaultShowEducation} items={itemData.programnew} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_education'} />
            }
            <Dropdown classes={'yuyue-avgs'} defaultItem={'选择就近城市'} items={itemData.city} cb={(key, val) => this.dpCb(key, val)} formKey={'attribution'} />
            <p><input className="form-group" placeholder="请输入手机号码" type="text" ref="inputMobileYuyue" /></p>
            <p className="err-tips">{this.state.errorTips}</p>
            <p><button type="button" className="btn btn-default" onClick={evt => this.submitAbroad(evt)}>{this.props.submitBtn}</button></p>
          </CustomModal>
        </div>
        <SuccessModal />
      </div>);
  }
}

module.exports = YuyueDIY;
