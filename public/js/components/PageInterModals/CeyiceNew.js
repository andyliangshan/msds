/**
 * Created by luomengjieluo on 17/5/3.
 * description
 */

require('./ceyiceNew.less');

const React = require('react');
const regx = require('../../core/regexp');
const Select = require('../Select/Select');
const itemData = require('./item.json');
// const C = require('../../core/conf');

const PropTypes = React.PropTypes;

class CeyiceNew extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知' },
    btnTitle: '我填好了',
    looptime: 1000,
  };

  static propTypes = {
    abroadData: PropTypes.object,   //  资源数据
    btnTitle: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
    hideForm: PropTypes.func,
    // looptime: PropTypes.number, //  弹层轮播时间
  };

  constructor() {
    super();
    this.state = {
      formData: {
        apply_contry: '香港',
        apply_education: '硕士',
        average_score: '选择平均成绩',
        remark: '托福、雅思、四六级',
        mobile: '',
      },
      errorTips: '',
    };
    this.cacheGraduateMap = {};
    this.isSubmit = true;
    this.isMount = true;
  }

  componentDidMount() {
    this.isMount = true;
    const self = this;
    if (this.isMount) {
      if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('click', e => self.hideForm(e), false);
      } else {
        window.attachEvent('onclick', e => self.hideForm(e));
      }
    }
  }

  componentWillUnmount() {
    const self = this;
    this.isMount = false;
    if (typeof window.addEventListener !== 'undefined') {
      window.removeEventListener('click', self.hideForm);
    } else {
      window.detachEvent('onclick', self.hideForm);
    }
  }

  resetErrorTips() {
    this.time = setTimeout(() => {
      this.setState({
        errorTips: '',
      });
    }, 2000);
  }

  changeSelect(name, value) {
    const { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  }
  hideForm(e) {
    e.preventDefault();
    const target = e.target || e.srcElement;
    const attrClass = target.getAttribute('class');
    if (attrClass && (attrClass === 'mark' || attrClass === 'close')) {
      this.props.hideForm();
    }
  }
  changeInputValue(e) {
    const { formData } = this.state;
    const target = e.target || e.srcElement;
    formData[target.name] = e.target.value;
    this.setState({
      formData,
    });
  }
  submitAbroad(evt) {
    evt.preventDefault();
    const { abroadData, qudao_details } = this.props;
    const { formData } = this.state;
    if (!regx.MOBILE_REG.test(formData.mobile)) {
      this.setState({
        errorTips: '手机号码错误',
      });
      this.resetErrorTips();
      return;
    }
    if (formData.average_score === '选择平均成绩') {
      this.setState({
        errorTips: '请选择平均成绩',
      });
      this.resetErrorTips();
      return;
    }
    if (formData.remark === '托福、雅思、四六级' || !(/\d+/.test(formData.remark))) {
      this.setState({
        errorTips: '请选择语言成绩',
      });
      this.resetErrorTips();
      return;
    }
    // Object.assign({ abroadData, ...formData });
    abroadData.qudao_details = qudao_details; //  eslint-disable-line
    abroadData.xifenqudao = 'SEM';
    const submitData = Object.assign({ ...abroadData, ...formData });
    if (!this.isSubmit) return;
    if (this.isSubmit) {
      this.isSubmit = false;
      fetch('/api/abroadPlan', {
        method: 'post',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
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
              errorTips: '',
            });
            this.props.hideForm();
            // $('#successModal').on('hidden.bs.modal', () => {
            //   this.setState({ setClose: false, setCloseMobile: false, mobileModalShow: false });
            // });
            $('#successModal').modal('show');
          }
        });
    }
  }

  render() {
    // const abroadData = this.props.abroadData;
    const { formData, errorTips } = this.state;
    const { btnTitle } = this.props;
    return (
      <div className="mark-box">
        <div className="main">
          <div className="close" onClick={e => this.hideForm(e)}>×</div>
          <div className="title">
            <h3>测试你合适的学校</h3>
          </div>
          <form className="form">
            <div className="form-info clearfix">
              <span className="desc fl"><i>*</i>意向国家</span>
              <Select itemData={itemData.country} defaultFirst={formData.apply_contry} name="apply_contry" changeSelect={(name, value) => this.changeSelect(name, value)} />
            </div>
            <div className="form-info clearfix">
              <span className="desc fl"><i>*</i>申请项目</span>
              <Select itemData={itemData.education} defaultFirst={formData.apply_education} name="apply_education" changeSelect={(name, value) => this.changeSelect(name, value)} />
            </div>
            <div className="form-info clearfix">
              <span className="desc fl"><i>*</i>平均成绩</span>
              <Select itemData={itemData.avgs} defaultFirst={formData.average_score} defaultColor="#999" name="average_score" changeSelect={(name, value) => this.changeSelect(name, value)} />
            </div>
            <div className="form-info clearfix">
              <span className="desc fl"><i>*</i>语言成绩</span>
              <Select itemData={itemData.score} defaultFirst={formData.remark} defaultColor="#999" name="remark" changeSelect={(name, value) => this.changeSelect(name, value)} />
            </div>
            <div className="form-info clearfix">
              <span className="desc fl"><i>*</i>电话号码</span>
              <input className="info remark fl" name="mobile" value={formData.mobile} placeholder="请输入手机号" onChange={(e) => this.changeInputValue(e)} />
            </div>
            { errorTips && <div className="err">{errorTips}</div> }
            <div className="submit" onClick={(e) => this.submitAbroad(e)}>{btnTitle}</div>
          </form>
        </div>
        <div className="mark" onClick={e => this.hideForm(e)}></div>
      </div>
    );
  }
}

module.exports = CeyiceNew;
