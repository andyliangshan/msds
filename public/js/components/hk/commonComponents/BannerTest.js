const React = require('react');
const SelectTwo = require('./SelectTwo');
const regx = require('../../../core/regexp');

require('./bannerTest.less');

const PropTypes = React.PropTypes;

class BannerTest extends React.Component {

  static defaultProps = {
    bannerTest: {},
    showSelect: false,
    title: '免费条件测评',
    country: '香港',
    project: '本科',
    qudao_details: 'hk/v1/fam/hku',
    xifenqudao: 'SEM',
    name: 'X同学',
  };

  static propTypes = {
    bannerTest: PropTypes.object,
    country: PropTypes.string,
    project: PropTypes.string,
    title: PropTypes.string,
    qudao_details: PropTypes.string,
    xifenqudao: PropTypes.string,
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: 0,
      formData: {
        country: props.country,
        project: props.project,
        mobile: '',
      },
      errors: {
        mobile: '',
      },
    };
    this.isSubmit = true;
  }
  componentDidMount() {
    fetch('/api/offers', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        if (!data.err_code) {
          this.setState({
            offers: data.data.count,
          });
        }
      });
    const self = this;
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('click', e => self.hideSelect(e), false);
    } else {
      window.attachEvent('onclick', e => self.hideSelect(e));
    }
  }
  showSelect(e) {
    e.preventDefault();
    let { showSelect } = this.state;
    const seft = this;
    showSelect = !showSelect;
    seft.setState({
      showSelect,
    });
  }

  hideSelect(e) {
    e.preventDefault();
    const target = e.target || e.srcElement;
    const attrClass = target.getAttribute('class');
    if (attrClass && attrClass !== 'select fl') {
      if (attrClass.indexOf('no-hide') === -1) {
        this.setState({
          showSelect: false,
        });
      }
    }
  }

  selectProject(key, name) {
    const { formData } = this.state;
    formData[key] = name;
    this.setState({
      formData,
    });
    if (key === 'project') {
      this.setState({
        showSelect: false,
      });
    }
  }

  handleChangeTel(e) {
    const { formData } = this.state;
    const target = e.target || e.srcElement;
    const name = target.name;
    const value = target.value.length > 11 ? target.value.slice(0, 11) : target.value;
    formData[name] = value;
    this.setState({
      formData,
    });
  }

  submitTestData(e) {
    e.preventDefault();
    const { formData, errors } = this.state;
    if (!regx.MOBILE_REG.test(formData.mobile)) {
      errors.mobile = '请正确填写手机号';
      this.setState({
        errors,
      });
      setTimeout(() => {
        errors.mobile = '';
        this.setState({
          errors,
        });
      }, 2000);
      return;
    }
    if (this.isSubmit) {
      this.isSubmit = false;
      const abordData = { ...formData };
      delete abordData.country;
      delete abordData.project;
      abordData.apply_contry = formData.country;
      abordData.apply_education = formData.project;
      abordData.qudao_details = this.props.qudao_details;
      abordData.xifenqudao = this.props.xifenqudao;
      abordData.name = this.props.name;
      fetch('/api/abroadPlan', {
        method: 'post',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(abordData),
      }).then(res => res.json())
        .then(data => {
          if (data.code) {
            errors.mobile = '网络异常请稍后再试！';
            this.setState({
              errors,
            });
            setTimeout(() => {
              errors.mobile = '';
              this.setState({
                errors,
              });
              this.isSubmit = true;
            }, 2000);
          } else {
            this.isSubmit = true;
            // $('#successModal').on('hidden.bs.modal', () => {
            //   this.setState({ setClose: false });
            // });
            $('#successModal').modal('show');
          }
        });
    }
  }

  render() {
    const { bannerTest, title } = this.props;
    const { showSelect, formData, errors, offers } = this.state;
    return (
      <div className="banner-content">
        <div className="banner-test">
          <div className="bannerform-top clearfix">
            <div className="big-title fl">{title}</div>
            <a className="line fl"></a>
            <div className="small-title fl">顺顺已经为<span className="shit">{offers}</span>学生提供测评结果</div>
          </div>
          <form className="form-banner clearfix">
            <div className="one-font">申</div>
            <div className="select-box fl">
              <div className="select fl" onClick={(e) => this.showSelect(e)}>
                <span>{formData.country}</span>
                <span>{formData.project}</span>
                <a className={showSelect ? 'allow-up' : 'allow-down'}></a>
              </div>
              <SelectTwo countryAll={bannerTest.country}
                         country={formData.country}
                         projectAll={bannerTest.project}
                         project={formData.project}
                         showSelect={showSelect}
                         selectCountry={(key, name) => this.selectProject(key, name)}
                         selectProject={(key, name) => this.selectProject(key, name)} />
            </div>
            <div className="tel-wraper fl">
              <input type="text" name="mobile" placeholder="填写手机号，获取免费名额" value={formData.mobile} onChange={(e) => this.handleChangeTel(e)} />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>
            <div className="submit fl" onClick={(e) => this.submitTestData(e)}>免费预约测评</div>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = BannerTest;
