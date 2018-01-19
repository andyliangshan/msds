/**
 * Created by luomengjieluo on 17/5/3.
 * description
 */

const React = require('react');
const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');

const PropTypes = React.PropTypes;

class BaomingModal extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '美国' },
    btnTitle: '在线预约',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    apply_contry: PropTypes.string,
    btnTitle: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
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
    $btn.attr('disabled', true);
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
        $btn.attr('disabled', false);
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
          $('#baomingModal').modal('hide');
          $('#successModal').modal('show');
        }
      });
  }

  render() {
    return (
      <div className="ceyice-container" data-growing-title="活动报名">
        <CustomModal btnclasses={'baoming-bm'} modalclasses={'baoming-modal'} setClose={this.state.setClose} title={''} isFooter={false} btnTitle={this.props.btnTitle}>
          <h3><img src={require('./img3.jpg')} alt="" width="100%" /></h3>
          <span className="ceyice-span">申请国家</span><Dropdown classes={'ceyice-country dropdown-list'} defaultItem={'请选择国家'} items={itemData.country} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
          <span className="ceyice-span">手机号码</span><p><input className="form-group" placeholder="请输入手机号码" type="text" ref="inputMobileYuyue" /></p>
          <p className="err-tips">{this.state.errorTips}</p>
          <p><button type="button" className="btn btn-default ceyice-button" onClick={evt => this.submitAbroad(evt)}> </button></p>
        </CustomModal>
      </div>);
  }
}

module.exports = BaomingModal;
