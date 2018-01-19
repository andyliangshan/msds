require('./Pipei.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');

class Pipei extends React.Component {
   /**
   * 使用需要在页面单独引入 const SuccessModal = require('./components/SuccessModal');
   * 测试匹配选校表单
   * 在页面使用 <Pipei qudao_details=“渠道详情” wrapModalTitle=“放到页面的按钮文案” submitBtn=“表单提交按钮文案” btnTitle=”表单头部title“ btnClass=“页面按钮class” defaultShowCountry=“默认下拉显示” defaultShowGrade=“下拉年级” defaultShowCost=”“ />
   * 右侧文案修改
    const reason = { //需要那一项改变就在页面修改那一项，不需要改变的就不用写
      title: '为什么选择顺顺',
      one: '88.7%申到理想院校',
      two: '',
      three: '中学生海外监护111',
      four: '服务不满闪电退款111',
    };
   * @returns {XML}
   */

  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '' },
    wrapModalTitle: '测试匹配度', // 放到页面的按钮文案
    submitBtn: '确定', // 表单提交的按钮文案
    btnTitle: '测试匹配度', // 表单头部title
    btnClass: '', // 按钮的样式
    defaultShowCountry: '英国', // 选择国家下拉框默认显示
    defaultShowGrade: '高中', // 选择下拉所在年级默认显示
    defaultShowCost: '￥15万左右', // 选择下拉费用默认显示
    reason: {}, // 选择顺顺的理由，在使用的地方配置，这里哟默认值
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
    defaultShowGrade: PropTypes.string,
    defaultShowCost: PropTypes.string,
    reason: PropTypes.object,
  };

  constructor(props) {
    super();
    this.state = {
      multiItem: props.apply_contry || '英国',
      errorTips: '',
      setClose: false,
    };
    this.isSubmit = true; // 阻止重复提交
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
    const { abroadData, qudao_details, defaultShowCountry, defaultShowGrade, defaultShowCost } = this.props;
    const mobile = this.refs.inputMobilePipei.value;
    // let isSubmit = true;
    if (!regx.MOBILE_REG.test(mobile)) {
      this.setState({
        errorTips: '手机号码错误',
      });
      this.resetErrorTips();
      return;
    }
    if (!this.isSubmit) return;
    this.isSubmit = false;
    abroadData.mobile = mobile;
    abroadData.qudao_details = qudao_details; //  eslint-disable-line
    abroadData.apply_contry = abroadData.apply_contry || defaultShowCountry;
    abroadData.average_score = abroadData.average_score || defaultShowCost;
    abroadData.apply_education = abroadData.apply_education || defaultShowGrade;
    abroadData.xifenqudao = 'SEM';
    this.setState({
      errorTips: '提交中...',
      setClose: false,
    });
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
        this.isSubmit = true;
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
          abroadData.average_score = defaultShowCountry;
          abroadData.average_score = defaultShowCost;
          abroadData.apply_education = defaultShowGrade;
          $('#successModal').on('hidden.bs.modal', () => {
            this.setState({ setClose: false });
          });
          $('#successModal').modal('show');
        }
      });
  }

  render() {
    const { defaultShowCountry, defaultShowGrade, defaultShowCost, reason } = this.props;
    const reasonDefalut = {
      title: reason.title || '大家选择顺顺',
      one: reason.one || '88.7%申到理想院校',
      two: reason.two || '全程透明、可跟踪',
      three: reason.three || '中学生海外监护',
      four: reason.four || '服务不满闪电退款',
    };
    return (
      <div className="pipei">
        <CustomModal btnclasses={`modal-btn ${this.props.btnClass}`} title={''} isFooter={false} btnTitle={this.props.btnTitle} setClose={this.state.setClose} modalclasses={'pipei-container'}>
          <div className="pipei-form">
            <h3>{this.props.wrapModalTitle}</h3>
            <span className="pipei-span">申请国家:</span><Dropdown classes={'apply-country'} defaultItem={defaultShowCountry} items={itemData.country} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
            <span className="pipei-span">申请项目:</span><Dropdown classes={'apply-program'} defaultItem={defaultShowGrade} items={itemData.program} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_education'} />
            <span className="pipei-span">一年预算:</span><Dropdown classes={'apply-avgs'} defaultItem={defaultShowCost} items={itemData.avgs} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
            <span className="pipei-span">手机号:</span><p className="pipei-input"><input type="text" placeholder="请输入手机号码" ref="inputMobilePipei" /></p>
            <p className="err-tips">{this.state.errorTips}</p>
            <p className="modal-tips" data-toggle="tooltip" data-placement="right" title="" data-original-title="手机号码只用于<br/>顺顺留学的必要留学沟通<br/>小顺子打死也不会出卖你的!">
              <span><img src="https://o6achqjeh.qnssl.com/public/assets/images/en/enmaster/why.png" alt="" /></span>隐私声明
            </p>
            <p><button type="button" className="btn btn-default" onClick={evt => this.submitAbroad(evt)}>{this.props.submitBtn}</button></p>
          </div>
          <div className="pipei-text">
            <h3>{reasonDefalut.title}</h3>
            <ul>
              <li><img src={require('./dui.png')} alt="" /><span>{reasonDefalut.one}</span></li>
              <li><img src={require('./dui.png')} alt="" /><span>{reasonDefalut.two}</span></li>
              <li><img src={require('./dui.png')} alt="" /><span>{reasonDefalut.three}</span></li>
              <li><img src={require('./dui.png')} alt="" /><span>{reasonDefalut.four}</span></li>
            </ul>
          </div>
        </CustomModal>
      </div>);
  }
}

module.exports = Pipei;
