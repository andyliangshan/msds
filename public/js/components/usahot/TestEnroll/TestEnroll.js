require('./TestEnrollStyle.less');

const React = require('react');

const PropTypes = React.PropTypes;
const regx = require('../../../core/regexp');

const style = {
  marginLeft: '5px',
};

class TestEnroll extends React.Component {
  /**
   * 测试录取率表单
   * @returns {XML}
   */
  static defaultProps = {
    abroadData: { name: '同学', apply_contry: '英国' },
    qudao_details: 'SEM/英国名校/院校/测试录取率',
    h2title: '评估我的条件',
    btnSubmitTitle: '评估我的条件',
    modelId: 'applyjpModalMaster',
    defaultIam: 'master',
    defaultChoose: 'master',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    qudao_details: PropTypes.string.isRequired,
    h2title: PropTypes.string.isRequired,
    btnSubmitTitle: PropTypes.string.isRequired,
    modelId: PropTypes.string.isRequired,
    defaultIam: PropTypes.string,
    defaultChoose: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      errorTips: '',
      errorTips1: '',
      errorTips2: '',
      setClose: false,
    };
  }
  resetErrorTips() {
    setTimeout(() => {
      this.setState({
        errorTips: '',
        errorTips1: '',
        errorTips2: '',
      });
    }, 2000);
  }

  submitAbroad(evt) {
    evt.preventDefault();
    const { abroadData, qudao_details } = this.props;
    const toefl = this.refs.toeflValue.value;
    const ielts = this.refs.ieltsValue.value;
    const mobile = this.refs.inputMobileYuyue.value;

    if (toefl) {
      $('.err-tips1').hide();
      if (!regx.reg.test(toefl)) {
        this.setState({
          errorTips1: '托福成绩错误',
        });
        this.resetErrorTips();
        return;
      }
    }
    if (ielts) {
      $('.err-tips2').show();
      $('.err-tips1,.err-tips').hide();
      if (!regx.reg1.test(ielts) || ielts > 9) {
        this.setState({
          errorTips2: '雅思成绩错误',
        });
        this.resetErrorTips();
        return;
      }
    }
    if (!regx.MOBILE_REG.test(mobile)) {
      $('.err-tips').show();
      $('.err-tips1,.err-tips2').hide();
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
            errorTips1: '网络异常请稍后再试',
            errorTips2: '网络异常请稍后再试',
          });
          this.resetErrorTips();
        } else {
          this.setState({
            errorTips: '',
            errorTips1: '',
            errorTips2: '',
            setClose: true,
          });
          $('.subscribeModal_master').modal('hide');
          $('#successModal').on('hidden.bs.modal', () => {
            this.setState({ setClose: false });
          });
          $('#successModal').modal('show');
        }
      });
  }

  render() {
    const { defaultIam, defaultChoose } = this.props;
    return (
      <div className="enroll-wrap">
        <div className="modal fade subscribeModal_master" id={this.props.modelId} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <span data-dismiss="modal" className="close">&times;</span>
                <div className="pgfrom">
                  <div className="school-instr-sider">{this.props.h2title}</div>
                  <form className="form-inline formbox subscribe-form1">
                    <div className="form-group">
                      <label htmlFor="proam1">
                        <span><b>*</b><em>我是:</em></span>
                        <select className="form-control" id="proam1" defaultValue={defaultIam}>
                          <option value="isUndergraduate">本科生</option>
                          <option value="isJubior">初中生</option>
                          <option value="isMiddle">高中生</option>
                          <option value="isCollege">大专生</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="score1">
                        <span><b>*</b><em>申请项目:</em></span>
                        <select className="form-control" id="score1" defaultValue={defaultChoose}>
                          <option value="master">硕士</option>
                          <option value="middle">高中</option>
                          <option value="undergraduate">本科</option>
                          <option value="doctor">博士</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="GPA1">
                        <span><b>*</b><em>GPA:</em></span>
                        <select className="form-control" id="GPA1" style={style}>
                          <option>3.0-3.3</option>
                          <option>3.8-4.0</option>
                          <option>3.7-3.8</option>
                          <option>3.5-3.7</option>
                          <option>3.3-3.5</option>
                          <option>2.5-3.0</option>
                          <option>2.0-2.5</option>
                          <option>0.0-2.0</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="toefl">
                        <span><b>&nbsp;</b><em>托福成绩:</em></span>
                        <input type="text" className="form-control" name="toefl" ref="toeflValue" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="ielts">
                        <span><b>&nbsp;</b><em>雅思成绩:</em></span>
                        <input type="text" className="form-control" name="ielts" ref="ieltsValue" />
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone1">
                        <span><b>*</b><em>手机号:</em></span>
                        <input type="text" className="form-control" id="phone1" name="mobile" placeholder="请填写手机号" ref="inputMobileYuyue" />
                      </label>
                    </div>
                    <div className="err-tips1">{this.state.errorTips1}</div>
                    <div className="err-tips2">{this.state.errorTips2}</div>
                    <div className="err-tips">{this.state.errorTips}</div>
                    <div className="btn"><button onClick={evt => this.submitAbroad(evt)}>{this.props.btnSubmitTitle}</button></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = TestEnroll;
