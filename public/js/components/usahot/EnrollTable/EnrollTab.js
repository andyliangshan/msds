require('./EnrollTabStyle.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../../Dropdown');
const CustomModal = require('../../CustomModal');
const itemData = require('./item.json');
const regx = require('../../../core/regexp');

class EnrollTab extends React.Component {

  static defaultProps = {
    abroadData: { name: '同学', apply_contry: '美国' },
    wrapModalTitle: '留学体检表',
    submitBtn: '确定',
    closebtn: '放弃体检',
    btnTitle: '提交',
    btnClass: '',
    defaultShowCountry: '美国',
    defaultProgram: '硕士',
    defaultGPA: '82-84',
    defaultSchool: '211/985',
    defaultState: '本科在读',
    mainTitle: '留学体检表',
    selectedColor: '#999 !important',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    apply_contry: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
    wrapModalTitle: PropTypes.string, //  内部modal 大标题 default: 为我选校
    submitBtn: PropTypes.string,  // 内部提交按钮文字 default: 确定
    closebtn: PropTypes.string, // 放弃体检按钮 default: 放弃体检
    btnTitle: PropTypes.string, //  触发modal按钮文字
    btnClass: PropTypes.string, //  触发modal按钮 的动态class
    defaultShowCountry: PropTypes.string,
    defaultProgram: PropTypes.string,
    defaultGPA: PropTypes.string,
    defaultSchool: PropTypes.string,
    defaultState: PropTypes.string,
    mainTitle: PropTypes.string,
    selectedColor: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = {
      multiItem: props.apply_contry || '美国',
      errorTips: '',
      setClose: false,
      selectedColor: props.selectedColor,
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
    const mobile = this.refs.inputMobileXuanxiao.value;
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

  closeModal(evt) {
    evt.preventDefault();
    this.setState({
      setClose: true,
    });
  }

  render() {
    return (
      <div>
        <CustomModal btnclasses={`modal-btn ${this.props.btnClass}`} title={this.props.mainTitle} isFooter={false} btnTitle={this.props.btnTitle} setClose={this.state.setClose} modalclasses={'xuanxiao-container'}>
          <div className="xuanxiao-form">
            <h3>{this.props.wrapModalTitle}</h3>
            <span className="xuanxiao-span"><b>*</b>国家:</span><Dropdown classes={'apply-country'} defaultItem={this.props.defaultShowCountry} items={itemData.country} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
            <span className="xuanxiao-span"><b>*</b>项目:</span><Dropdown classes={'apply-program'} defaultItem={this.props.defaultProgram} items={itemData.program} selectedColor={{ color: this.state.selectedColor }} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_education'} />
            <span className="xuanxiao-span"><b>*</b>手机:</span><p className="xuanxiao-input"><input type="text" placeholder="请输入手机号码" ref="inputMobileXuanxiao" /></p>
            <p className="modal-tips" data-toggle="tooltip" data-placement="right" title="" data-original-title="手机号码只用于<br/>顺顺留学的必要留学沟通<br/>小顺子打死也不会出卖你的!">
              <span><img src="https://o6achqjeh.qnssl.com/public/assets/images/en/enmaster/why.png" alt="" /></span>隐私声明
            </p>
          </div>
          <div className="xuanxiao-text">
            <h3>成绩</h3>
            <span className="xuanxiao-span"><b>*</b>GPA:</span><Dropdown classes={'apply-GPA'} defaultItem={this.props.defaultGPA} items={itemData.GPA} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
            <span className="xuanxiao-span"><b>&nbsp;</b>托福:</span><Dropdown classes={'apply-tofel'} defaultItem={'非必填'} items={itemData.tofel} cb={() => this.dpCb()} />
            <span className="xuanxiao-span"><b>&nbsp;</b>GRE:</span><Dropdown classes={'apply-GRE'} defaultItem={'非必填'} items={itemData.GRE} cb={() => this.dpCb()} />
          </div>
          <div className="botcont clearfix">
            <div className="botbackground">
              <h3>背景</h3>
              <span className="xuanxiao-span"><b>*</b>院校:</span><Dropdown classes={'apply-school'} defaultItem={this.props.defaultSchool} items={itemData.school} cb={() => this.dpCb()} selectedColor={{ color: this.state.selectedColor }} />
              <span className="xuanxiao-span"><b>*</b>状态:</span><Dropdown classes={'apply-state'} defaultItem={this.props.defaultState} items={itemData.state} cb={() => this.dpCb()} selectedColor={{ color: this.state.selectedColor }} />
            </div>
            <div className="botscore">
              <h3>成绩</h3>
              <div className="radiobox"><em>论文发表</em><p><input type="radio" name="lunwen" />有<input type="radio" name="lunwen" defaultChecked="checked" />无</p></div>
              <div className="radiobox endradio"><em>实习活动</em><p><input type="radio" name="activity" />有<input type="radio" name="activity" defaultChecked="checked" />无</p></div>
            </div>
          </div>
          <div className="submitform">
            <p className="err-tips">{this.state.errorTips}</p>
            <p>
              <button type="button" className="btn btn-default" onClick={evt => this.submitAbroad(evt)}>{this.props.submitBtn}</button>
              <button type="button" className="btn btn-warning" onClick={evt => this.closeModal(evt)}>{this.props.closebtn}</button>
            </p>
          </div>
        </CustomModal>
      </div>);
  }
}

module.exports = EnrollTab;
