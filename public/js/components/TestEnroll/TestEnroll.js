require('./TestEnroll.less');

const React = require('react');

const PropTypes = React.PropTypes;
const regx = require('../../core/regexp');
// const SuccessModal = require('../SuccessModal/SuccessModal');

const style = {
  marginLeft: '5px',
};

class TestEnroll extends React.Component {
  /**
   * 使用 --不-- 需要在页面单独引入 const SuccessModal = require('../SuccessModal/SuccessModal');
   * 测试录取率表单
   * 在页面使用 <TestEnroll qudao_details="渠道详情"
   * h2title="表单title"
   * btnSubmitTitle="表单提交按钮"
   * propsBtnTitle="页面引入的按钮文案"
   * propsBtnClass="页面引入的按钮的class"
   * modelId=“ID做唯一区分，就一个组件使用时不需要设置”
   * applyCountry=“申请国家” defaultIam=“显示默认我是...下拉选项”
   * defaultProject="" defaultGPA="" />
   * @returns {XML}
   */
  static defaultProps = {
    abroadData: { name: '同学', apply_contry: '美国' },
    qudao_details: 'SEM/英国名校/院校/测试录取率',
    h2title: '测试录取率',
    btnSubmitTitle: '提交',
    propsBtnTitle: '',
    propsBtnClass: '',
    modelId: 'applyjpModalMaster',
    applyCountry: '', // 申请国家，没填写默认美国，在父组件设定
    defaultIam: '高中生', // 我是 -- 研究生 -本科生 -初中生 -大专生 -高中生 下面2一样，都是选择默认显示的选择框
    defaultProject: '本科', // 申请项目 -- 硕士 -高中 -本科 -博士
    defaultGPA: '3.0-3.3', // GPA成绩 -- 默认选中GPA显示
  };

  static propTypes = {
    abroadData: PropTypes.object,
    qudao_details: PropTypes.string.isRequired,
    h2title: PropTypes.string.isRequired,
    btnSubmitTitle: PropTypes.string.isRequired,
    propsBtnClass: PropTypes.string,
    propsBtnTitle: PropTypes.string.isRequired,
    modelId: PropTypes.string.isRequired,
    applyCountry: PropTypes.string,
    defaultIam: PropTypes.string,
    defaultProject: PropTypes.string,
    defaultGPA: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = {
      errorTips: '',
      setClose: false,
      formData: {
        current_education: props.defaultIam,
        apply_education: props.defaultProject,
        average_score: props.defaultGPA,
        toefl: '',
        ielts: '',
        mobile: '',
      },
    };
    this.isSubmit = true;
  }
  resetErrorTips() {
    setTimeout(() => {
      this.setState({
        errorTips: '',
      });
    }, 2000);
  }

  changeValue(e) {
    const { formData } = this.state;
    const name = e.target.name;
    // const text = e.target.selectedOptions && e.target.selectedOptions[0].text;
    const value = e.target.value;
    formData[name] = value;
    this.setState({
      formData,
    });
  }
  submitAbroad(evt) {
    evt.preventDefault();
    const { abroadData, qudao_details, applyCountry } = this.props;
    const { formData } = this.state;

    if (formData.toefl) { // 验证托福成绩
      if (!regx.reg.test(formData.toefl)) {
        $('.err-tips').show();
        this.setState({
          errorTips: '托福成绩错误',
        });
        this.resetErrorTips();
        return;
      }
    }
    if (formData.ielts) { // 验证雅思成绩
      if (!regx.reg1.test(formData.ielts) || formData.ielts > 9) {
        $('.err-tips').show();
        this.setState({
          errorTips: '雅思成绩错误',
        });
        this.resetErrorTips();
        return;
      }
    }
    if (!regx.MOBILE_REG.test(formData.mobile)) { // 验证手机号码
      $('.err-tips').show();
      this.setState({
        errorTips: '手机号码错误',
      });
      this.resetErrorTips();
      return;
    }
    Object.keys(formData).forEach((key) => {
      abroadData[key] = formData[key];
    });
    abroadData.remark = '';
    if (abroadData.toefl && !abroadData.ielts) {
      abroadData.remark = `toefl=${abroadData.toefl}`; // 后台没有toefl，ielts字段，拼接成备注信息传给后台
    } else if (!abroadData.toefl && abroadData.ielts) {
      abroadData.remark = `toefl=${abroadData.ielts}`; // 后台没有toefl，ielts字段，拼接成备注信息传给后台
    } else if (abroadData.toefl && abroadData.ielts) {
      abroadData.remark = `toefl=${abroadData.toefl}&ielts=${abroadData.ielts}`; // 后台没有toefl，ielts字段，拼接成备注remark传给后台
    } else if (!abroadData.toefl && !abroadData.ielts) {
      delete abroadData.remark;
    }
    delete abroadData.toefl;
    delete abroadData.ielts;
    abroadData.apply_contry = applyCountry || abroadData.apply_contry;
    abroadData.qudao_details = qudao_details; //  eslint-disable-line
    abroadData.xifenqudao = 'SEM';
    if (this.isSubmit) {
      this.isSubmit = false;
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
              setClose: true,
            });
            this.isSubmit = true;
            $('.subscribeModal_master').modal('hide');
            $('#successModal').on('hidden.bs.modal', () => {
              this.setState({ setClose: false });
            });
            $('#successModal').modal('show');
          }
        });
    }
  }

  render() {
    const { propsBtnClass, propsBtnTitle } = this.props;
    const { formData } = this.state;
    return (
      <div className="enroll-wrap">
        {propsBtnTitle && <div className={propsBtnClass} data-toggle="modal" data-target={`#${this.props.modelId}`}>{propsBtnTitle}</div>}
        {/* 如果页面只有一个地方用这个插件，propsBtnTitle传值 多次使用就全局调用这个组件 */}
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
                        <select className="form-control" id="proam1" name="current_education" value={formData.current_education} onChange={(e) => { this.changeValue(e); }} >
                          <option value="本科生">本科生</option>
                          <option value="硕士生">硕士生</option>
                          <option value="初中生">初中生</option>
                          <option value="高中生">高中生</option>
                          <option value="大专生">大专生</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="score1">
                        <span><b>*</b><em>申请项目:</em></span>
                        <select className="form-control" id="score1" name="apply_education" value={formData.apply_education} onChange={(e) => { this.changeValue(e); }}>
                          <option value="硕士">硕士</option>
                          <option value="高中">高中</option>
                          <option value="本科">本科</option>
                          <option value="博士">博士</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="GPA1">
                        <span><b>*</b><em>GPA:</em></span>
                        {/* <select className="form-control" id="GPA1" name="average_score" style={style} defaultValue={defaultGPA} value={formData.average_score} onChange={(e) => { this.changeValue(e); }}> */}
                        <select className="form-control" id="GPA1" name="average_score" style={style} value={formData.average_score} onChange={(e) => { this.changeValue(e); }}>
                          <option value="3.8-4.0">3.8-4.0</option>
                          <option value="3.7-3.8">3.7-3.8</option>
                          <option value="3.5-3.7">3.5-3.7</option>
                          <option value="3.3-3.5">3.3-3.5</option>
                          <option value="3.0-3.3">3.0-3.3</option>
                          <option value="2.5-3.0">2.5-3.0</option>
                          <option value="2.0-2.5">2.0-2.5</option>
                          <option value="0.0-2.0">0.0-2.0</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="toefl">
                        <span><b>&nbsp;</b><em>托福成绩:</em></span>
                        <input type="text" className="form-control" name="toefl" value={formData.toefl} onChange={(e) => { this.changeValue(e); }} />
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="ielts">
                        <span><b>&nbsp;</b><em>雅思成绩:</em></span>
                        <input type="text" className="form-control" name="ielts" value={formData.ielts} onChange={(e) => { this.changeValue(e); }} />
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone1">
                        <span><b>*</b><em>手机号:</em></span>
                        <input type="text" className="form-control" id="phone1" name="mobile" placeholder="请填写手机号" value={formData.mobile} onChange={(e) => { this.changeValue(e); }} />
                      </label>
                    </div>
                    <div className="err-tips">{this.state.errorTips}</div>
                    <div className="btn"><button onClick={evt => this.submitAbroad(evt)}>{this.props.btnSubmitTitle}</button></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <SuccessModal /> */}
      </div>
    );
  }
}

module.exports = TestEnroll;
