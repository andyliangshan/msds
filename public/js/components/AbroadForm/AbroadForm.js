require('./AbroadForm.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Dropdown = require('../Dropdown');
const CustomModal = require('../CustomModal');
const itemData = require('./item.json');
const regx = require('../../core/regexp');

const style = {
  color: '#272727',
};

class AbroadForm extends React.Component {

  static defaultProps = {
    abroadData: { name: '未知', apply_contry: '美国' },
  };

  static propTypes = {
    abroadData: PropTypes.object,
    apply_contry: PropTypes.string,
    qudao_details: PropTypes.string.isRequired,
  };

  constructor(props) {
    super();
    this.state = {
      multiItem: props.apply_contry || '美国',
      //  根据选择内容 自动选择弹出那个modal（提示信息modal，输入手机号modal）
      modalType: 0,
      errorTips: '',
      isAbroadForm: false,  //  是否提交成功
      hideForm: false,  //  隐藏表单
    };
  }

  componentDidMount() {
    const doc = document;
    const $form = $('.abroad-container');
    let bottom0 = false;
    $(window).scroll(() => {
      if ($form.css('bottom') === '-100px') {
        return;
      }
      const scrollTop = $(doc).scrollTop();
      /**
       //  文档总高度
       const totalHeight = $(doc).height();  //  eslint-disable-line
       //  当前窗口内的高度
       const clientHeight = $(window).height();  //  eslint-disable-line
       //  滚动条距离底部的距离totalHeight - scrollTop - clientHeight
       const ptop = totalHeight - scrollTop - clientHeight;  //  eslint-disable-line
       **/
      if (scrollTop > 120) {
        if (bottom0) return;
        bottom0 = true;
        $form.css('bottom', 0);
      } else {
        if (!bottom0) return;
        bottom0 = false;
        $form.css('bottom', -99);
      }
    });
  }

  multiItemClick(evt) {
    evt.preventDefault();
    const value = evt.target.innerHTML;
    this.setState({
      multiItem: value,
    });
    Object.assign(this.props.abroadData, { apply_contry: value });
    if (Object.keys(this.props.abroadData).length === 5) {
      this.setState({
        modalType: 1,
      });
    }
  }

  dpCb(key, val) {
    Object.assign(this.props.abroadData, { [key]: val });
    if (Object.keys(this.props.abroadData).length === 5) {
      this.setState({
        modalType: 1,
      });
    }
  }

  resetErrorTips() {
    setTimeout(() => {
      this.setState({
        errorTips: '',
      });
    }, 2000);
  }

  closebtnForm(evt) {
    evt.preventDefault();
    $('.abroad-container').css('bottom', -100);
    $('.botform-Conable').css('margin-bottom', 0);
  }

  submitAbroad(evt) {
    evt.preventDefault();
    const { abroadData, qudao_details } = this.props;
    const mobile = this.refs.inputMobile.value;
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
          $('#mobileModal').modal('hide');
          this.setState({
            errorTips: '',
            isAbroadForm: true,
          });
        }
      });
  }

  render() {
    return (
      <div className="abroad-container" style={{ zIndex: 5 }}>
        {this.state.isAbroadForm ? (<div className="success-title">提交成功！顺顺顾问立即开始分析，并在24小时内联系您！如不想等待，请直接联系我们</div>) : (
          <div className="abroad-form">
            <div className="closebtnForm">
              <div onClick={evt => this.closebtnForm(evt)}>×</div>
            </div>
            <div className="dropdown dropup">
              <div className="div-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <p style={style}>{this.state.multiItem}</p>
                <span className="caret"></span>
              </div>
              <ul className="dropdown-menu application-country">
                <li className="hot-country">热门</li>
                {itemData.apply_contry.slice(0, 11).map((item) => {
                  return (<li key={Math.random()} onClick={evt => this.multiItemClick(evt)}>{item}</li>);
                })}
                <span className="split-country"></span>
                <li className="more-country">更多</li>
                {itemData.apply_contry.slice(11).map((item) => {
                  return (<li key={Math.random()} onClick={evt => this.multiItemClick(evt)}>{item}</li>);
                })}
              </ul>
            </div>
            <Dropdown classes={'application-project'} defaultItem={'申请项目'} items={itemData.program} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'apply_education'} />
            <Dropdown classes={'application-grade'} defaultItem={'目前就读年级'} items={itemData.classes} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'current_education'} />
            <Dropdown classes={'application-results'} defaultItem={'国内平均成绩'} items={itemData.avgs} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
            {this.state.modalType ? (
              <CustomModal modalclasses={'application-btn'} btnclasses={'abroad-modal-btn'} title={''} isFooter={false} btnTitle={'获得申请方案'} >
                <p className="input-wrap"><input type="text" ref="inputMobile" placeholder="留下手机号码,以便准备好方案后短信通知你" /></p>
                <p className="err-tips">{this.state.errorTips}</p>
                <div className="modal-btn-wrap"><button type="button" className="btn btn-primary" onClick={evt => this.submitAbroad(evt)}>获取方案</button></div>
              </CustomModal>
            ) : (
              <CustomModal modalclasses={'application-btn'} btnclasses={'abroad-modal-btn'} title={''} isFooter={false} btnTitle={'获得申请方案'}>
                <p className="input-wrap-empty">请填写完整信息</p>
              </CustomModal>
            )}
          </div>
        )}
      </div>
    );
  }
}

module.exports = AbroadForm;
