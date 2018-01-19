/**
 * Created by luomengjieluo on 17/5/3.
 * description
 */

require('./CeyiceModal.less');

const React = require('react');
const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');
const C = require('../../core/conf');

const PropTypes = React.PropTypes;

class CeyiceModal extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知' },
    btnTitle: '测一测',
    looptime: 1000,
  };

  static propTypes = {
    abroadData: PropTypes.object,   //  资源数据
    btnTitle: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
    // looptime: PropTypes.number, //  弹层轮播时间
  };

  constructor() {
    super();
    this.state = {
      graduateMap: [],   //  平均分列表
      errorTips: '',  //  资源字段 错误信息
      errorMobileTips: '',  //  mobile错误信息
      setClose: false,
      setCloseMobile: false,
      mobileModalShow: false,
    };
    this.cacheGraduateMap = {};
  }

  dpCb(key, val) {
    Object.assign(this.props.abroadData, { [key]: val });
    if (this.cacheGraduateMap[val]) {
      this.setState({
        graduateMap: this.cacheGraduateMap[val],
      });
      return;
    }
    if (key === 'apply_education') {
      $.ajax({
        type: 'POST',
        url: '/api/cache',
        data: {
          api: 'http://school.shunshunliuxue.com:8000/info/contents/',
          query: { category: 96, related_id: val },
          cache: { time: __DEV__ ? 60 : C.globalCacheTime },
        },
        dataType: 'json',
        success: data => {
          const res = data.results.map(item => item.value);
          this.cacheGraduateMap[val] = res;
          setTimeout(() => {
            this.cacheGraduateMap = null;
          }, 1000 * 60 * 30); //  cache 30min
          this.setState({
            graduateMap: res,
          });
        },
      });
    }
  }

  resetErrorTips() {
    setTimeout(() => {
      this.setState({
        errorTips: '',
        errorMobileTips: '',
      });
    }, 2000);
  }

  showMobile(evt) {
    evt.preventDefault();
    if (Object.keys(this.props.abroadData).length >= 5) {
      this.setState({
        setClose: true,
        mobileModalShow: true,
      });
    } else {
      this.setState({
        errorTips: '请补全信息！',
      });
      this.resetErrorTips();
    }
  }

  submitAbroad(evt) {
    evt.preventDefault();
    const { abroadData, qudao_details } = this.props;
    const mobile = this.refs.inputMobileCeyice.value;
    if (!regx.MOBILE_REG.test(mobile)) {
      this.setState({
        errorMobileTips: '手机号码错误',
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
            errorMobileTips: '网络异常请稍后再试！',
          });
          this.resetErrorTips();
        } else {
          this.setState({
            errorTips: '',
            setCloseMobile: true,
          });
          $('#successModal').on('hidden.bs.modal', () => {
            this.setState({ setClose: false, setCloseMobile: false, mobileModalShow: false });
          });
          $('#successModal').modal('show');
        }
      });
  }

  callStateFunc(action) {
    if (action === 'close') {
      this.setState({
        mobileModalShow: false,
        setClose: false,
      });
    }
  }

  render() {
    const abroadData = this.props.abroadData;
    return (
      <div className="ceyice-container" data-growing-title="测一测">
        <CustomModal callStateFunc={action => this.callStateFunc(action)} setClose={this.state.setClose} btnclasses={'ceyice-modal-btn'} modalclasses={'ceyice-modal'} title={''} isFooter={false} btnTitle={this.props.btnTitle}>
          <h3><img src={require('./img2.jpg')} alt="" width="100%" /></h3>
          <span className="ceyice-span">申请国家</span><Dropdown classes={'ceyice-country dropdown-list'} defaultItem={abroadData.apply_contry || '申请国家'} items={itemData.country} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_contry'} />
          <span className="ceyice-span">申请项目</span><Dropdown classes={'ceyice-city dropdown-list'} defaultItem={abroadData.apply_education || '申请项目'} items={itemData.education} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_education'} />
          <span className="ceyice-span">就读学校</span><Dropdown classes={'ceyice-avgs dropdown-list'} defaultItem={abroadData.graduate_school || '目前就读年级'} items={this.state.graduateMap} cb={(key, val) => this.dpCb(key, val)} formKey={'graduate_school'} />
          <span className="ceyice-span">平均成绩</span><Dropdown classes={'ceyice-education dropdown-list'} defaultItem={abroadData.average_score || '国内平均成绩'} items={itemData.avgs} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
          <p className="err-tips">{this.state.errorTips}</p>
          <p><button type="button" className="btn btn-default ceyice-button" onClick={evt => this.showMobile(evt)}> </button></p>
        </CustomModal>
        <CustomModal callStateFunc={action => this.callStateFunc(action)} selfshow={this.state.mobileModalShow} setClose={this.state.setCloseMobile} modalclasses={'ceyice-modal'} btnclasses={''} isFooter={false} title={''} btnTitle={''}>
          <h3><img src={require('./img3.jpg')} alt="" width="100%" /></h3>
          <span className="ceyice-span">手机号码</span><p><input className="form-group" placeholder="请输入手机号码" type="text" ref="inputMobileCeyice" /></p>
          <p className="err-tips">{this.state.errorMobileTips}</p>
          <p><button type="button" className="btn btn-default ceyiceMobile-button" onClick={evt => this.submitAbroad(evt)}> </button></p>
        </CustomModal>
      </div>);
  }
}

module.exports = CeyiceModal;
