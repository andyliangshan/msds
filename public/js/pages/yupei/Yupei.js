/**
 * Created by noodles on 2017/6/14.
 * description
 */
/* eslint global-require: 0 */

require('../../../libs/slick-carousel/slick/slick');
require('../../../libs/slick-carousel/slick/slick.less');
require('../../../libs/slick-carousel/slick/slick-theme.less');

const React = require('react');
const Link = require('react-router').Link;

const PropTypes = React.PropTypes;

const Header = require('../../components/Header');
const Footer = require('../../components/Footer');
const Live800 = require('../../components/Live800');  //  eslint-disable-line
const Dropdown = require('../../components/Dropdown');
const yupeiData = require('./yupei.json');
const Yuyue = require('../../components/Yuyue/Yuyue');
const regx = require('../../core/regexp');
const SuccessModal = require('../../components/SuccessModal');


class Yupei extends React.Component {

  static defaultProps = {
    abroadData: { apply_contry: '语培', qudao_details: '官网/语培首页/留学方案', xifenqudao: 'SEM' },
  };

  static propTypes = {
    abroadData: PropTypes.object,
    // tips: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      errorTips: '',
      isAbroadForm: false,  //  是否提交成功
    };
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    $('.multiple-items').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
    });
    $('.case-items').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
    $('.wechat-img').slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: true,
      autoplaySpeed: 3000,
    });
  }

  resetErrorTips() {
    setTimeout(() => {
      this.setState({
        errorTips: '',
      });
    }, 2000);
  }

  dpCb(key, val) {
    Object.assign(this.props.abroadData, { [key]: val });
  }

  submitAbroad(evt) {
    const { abroadData } = this.props;
    const name = this.refs.nameRef.value;
    const mobile = this.refs.mobileRef.value;
    const time = abroadData.planning_year;
    if (name === '称呼') {
      this.setState({
        errorTips: '称呼不能为空',
      });
      this.resetErrorTips();
      return;
    }
    if (!time) {
      this.setState({
        errorTips: '期望出国时间不能为空',
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
    const $btn = $(evt.currentTarget);
    if ($.isClickSubmit) return;
    $.isClickSubmit = true;
    $btn.attr('disabled', true);

    Object.assign(this.props.abroadData, { name, mobile });
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
            isAbroadForm: true,
          });
          $('#successModal').modal('show');
        }
      });
  }

  live800(evt, bol) {
    if (bol) {
      evt.preventDefault();
      // const liveTips = this.props.tips;
      const base800 = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=72111';
      // const enterurl = encodeURIComponent(decodeURIComponent(location.href));
      // const firstEnterurl = encodeURIComponent(decodeURIComponent(location.href) + liveTips);
      // const opened = `${base800}&enterurl=${enterurl}&firstEnterurl=${firstEnterurl}&jzl_id=${window.jzlvisitor_id}`;
      const opened = `${base800}&clientId=${window.jzlvisitor_id.substr(0, 16)}`;
      /* eslint-disable */
      const centerWidth = window.innerWidth / 2 - 245;
      const centerHeight = window.innerHeight / 2 - 260;
      window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=520');
      /* eslint-enable */
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="yupei-banner">
          <img src={require('../../../img/other/yupei/yupei-banner.png')} alt="" />
        </div>
        <div className="yupei-introduction">
          <div className="yupei-text rel1000">
            <p><strong>{yupeiData.text.strong}</strong>{yupeiData.text.t1}<br />{yupeiData.text.t2}<br />{yupeiData.text.t3}</p>
          </div>
          <div className="yupei-text-button rel1000">
            <p className="margin-right">
              <Live800 classes={'live800 live8001'} title={'顺顺雅思'} type={'a'} tips={'热门院校排名'} />
              <Link to="ielts" style={{ background: 'transparent' }}>&nbsp;</Link>
            </p>
            <p>
              <Live800 classes={'live800 live8001'} title={'顺顺托福'} type={'a'} tips={'热门院校排名'} />
              <Link to="toelf" style={{ background: 'transparent' }}>&nbsp;</Link>
            </p>
          </div>
        </div>
        <div className="yupei-famteacher rel1000">
          <h3>{yupeiData.teachTitle}</h3>
          <div className="famteacher-content row">
            {yupeiData.famteacher.map(ft => {
              return (<div className="col-xs-3">
                <img src={ft.logo} alt="" />
                <p>{ft.p}</p>
              </div>);
            })}
          </div>
        </div>
        <div className="slick-wrap famteacher-wrap" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="multiple-items">
            {yupeiData.teachers.map((teach) => {
              return (<div className="consultant-content">
                <img src={teach.image} alt="" />
                <h3>{teach.name}</h3>
                {teach.plist.map(pl => {
                  return (<p>{pl}</p>);
                })}
                <div className="consultant-button">
                  <Yuyue qudao_details={`官网/语培首页/预约老师/${teach.name}`} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={`预约${teach.xing}老师帮我提分`} />
                </div>
              </div>);
            })}
          </div>
        </div>
        <div className="scientific-positioning">
          <h3>{yupeiData.scientific.title}</h3>
          <div className="rel1000">
            <ul className="nav nav-tabs scientific-tab" role="tablist">
              {yupeiData.scientific.steps.map((sp, idx) => {
                return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={`#scientific${idx + 1}`} aria-controls={`scientific${idx + 1}`} role="tab" data-toggle="tab"><strong>Step.{idx + 1}</strong>{sp}</a></li>);
              })}
            </ul>
            <div className="tab-content scientfic-macimg">
              <div role="tabpanel" className="tab-pane active padding-around" id="scientific1">
                <div className="tab-pane-top">
                  <img src={yupeiData.scientific.ct1.topImg} alt="" width="100%" />
                </div>
                <div className="tab-pane-down">
                  <ul className="nav nav-tabs" role="tablist">
                    {yupeiData.scientific.ct1.tbs.thead.map((hd, idx) => {
                      return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={hd.href} aria-controls="tl" role="tab" data-toggle="tab">{hd.txt}</a></li>);
                    })}
                  </ul>
                  <div className="tab-content">
                    {yupeiData.scientific.ct1.tbs.tdList.map((tb, idx) => {
                      return (<div role="tabpanel" className={`tab-pane ${idx === 0 ? 'active' : ''}`} id={tb.key}>
                        <table className="table table-bordered table-condensed table-responsive">
                          <tbody>
                            {tb.list.map(tbl => {
                              return (<tr>
                                <td>{tbl[0]}</td>
                                <td>{tbl[1]}</td>
                                <td className="text-left">{tbl[2]}</td>
                              </tr>);
                            })}
                          </tbody>
                        </table>
                        <div className="tab-button">
                          <Yuyue qudao_details={'官网/语培首页/预约模考'} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={'预约参加全真模考'} />
                        </div>
                      </div>);
                    })}
                  </div>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific2">
                <h4>{yupeiData.scientific.ct2.title}</h4>
                <div className="tab-pane-down">
                  <ul className="nav nav-tabs" role="tablist">
                    {yupeiData.scientific.ct2.tbs.thead.map((hd, idx) => {
                      return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={hd.href} aria-controls="tl" role="tab" data-toggle="tab" dangerouslySetInnerHTML={{ __html: hd.txt }}></a></li>);
                    })}
                  </ul>
                  <div className="tab-content">
                    {yupeiData.scientific.ct2.tbs.tdList.map((tb, idx) => {
                      return (<div role="tabpanel" className={`tab-pane ${idx === 0 ? 'active' : ''}`} id={tb.key}>
                        <table className="table table-bordered table-condensed table-responsive">
                          <tbody>
                            {tb.list.map(tbl => {
                              return (<tr>
                                {tbl.map(td => {
                                  return (<td colSpan={td === '上课内容' || td === '课后自主完成' ? 2 : 1}>{td}</td>);
                                })}
                              </tr>);
                            })}
                          </tbody>
                        </table>
                        <div className="tab-button">
                          <Yuyue qudao_details={'官网/语培首页/预约模考'} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={'预约参加全真模考'} />
                        </div>
                      </div>);
                    })}
                  </div>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific3">
                <img src={require('../../../img/other/yupei/img5.png')} alt="" width="100%" />
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific4">
                <img src={require('../../../img/other/yupei/img6.png')} alt="" width="100%" />
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific5">
                <table className="table table-bordered table-condensed table-responsive" dangerouslySetInnerHTML={{ __html: yupeiData.scientific.ct5 }}></table>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific6">
                <table className="table table-bordered table-condensed table-responsive" dangerouslySetInnerHTML={{ __html: yupeiData.scientific.ct6 }}></table>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific7">
                <img src={require('../../../img/other/yupei/img8.png')} alt="" width="100%" />
              </div>
            </div>
          </div>
        </div>
        <div className="yuanmeng rel1000">
          <div className="yuanmeng-title">
            <h3>{yupeiData.yuanmeng.t1}</h3>
            <p>{yupeiData.yuanmeng.t2}</p>
          </div>
          <div className="yuanmeng-content row">
            {yupeiData.yuanmeng.htmls.map(hl => {
              return (<div className="col-xs-4">
                <div className="yuanmeng-img" dangerouslySetInnerHTML={{ __html: hl.top }}></div>
                <div className="yuanmeng-text" dangerouslySetInnerHTML={{ __html: hl.bottom }}></div>
              </div>);
            })}
          </div>
        </div>
        <div className="yupei-case">
          <div className="yupei-case-container rel1000">
            <h3>顺顺语培海量高分提分案例</h3>
            <div className="table-content">
              <table className="table">
                <thead>
                  <tr>
                    {yupeiData.tables.titleList.map((hd, idx) => {
                      let thS = {};
                      if (idx === 0) {
                        thS = { width: '76px' };
                      } else if (idx === 1) {
                        thS = { width: '100px' };
                      } else if (idx === 4) {
                        thS = { width: '126px' };
                      } else if (idx === 10 || idx === 9 || idx === 6) {
                        thS = { width: '60px' };
                      }
                      let classN = '';
                      if (idx === 9) classN = 'blue';
                      else if (idx === 10) classN = 'blue-d';
                      else if (idx === 11) classN = 'blue-l';
                      return (<th style={thS} className={classN}>{hd}</th>);
                    })}
                  </tr>
                </thead>
                <tbody>
                  {yupeiData.tables.list.map(tb => {
                    return (<tr>
                      {tb.map((th, idx) => {
                        let thS = {};
                        if (idx === 0) {
                          thS = { width: '76px' };
                        } else if (idx === 1) {
                          thS = { width: '100px' };
                        } else if (idx === 4) {
                          thS = { width: '126px' };
                        } else if (idx === 10 || idx === 9 || idx === 6) {
                          thS = { width: '58px' };
                        }
                        let classN = '';
                        if (idx === 1) classN = 'width126';
                        else if (idx === 4) classN = 'width162';
                        else if (idx === 9) classN = 'blue';
                        else if (idx === 10) classN = 'blue-d';
                        else if (idx === 11) classN = 'blue-l';
                        return (<th style={thS} className={classN}>{th}</th>);
                      })}
                    </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="case-analysis">
          <h3>{yupeiData.analysis.title}</h3>
          <div className="slick-wrap" style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <div className="case-items">
              {yupeiData.analysis.datas.map(item => {
                return (<div className="case-tab-list">
                  <div className="margin30">
                    <div className="tab-list-up">
                      <ul className="up-list clearfix">
                        {item.top.map(tp => {
                          return (<li className="list-img">
                            <img src={tp.icon} alt="" />
                            <p>{tp.t1}<br />{tp.t2}</p>
                          </li>);
                        })}
                      </ul>
                    </div>
                    <div className="tab-list-down clearfix">
                      <div className="tab-list-left">
                        <h4>{item.bottom.h4}</h4>
                        <p>{item.bottom.p}</p>
                      </div>
                      <div className="tab-list-right">
                        <img src={item.bottom.img} alt="" width="100%" />
                      </div>
                    </div>
                  </div>
                </div>);
              })}
            </div>
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="wechat-img">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                return (<div><img src={require(`../../../img/other/yupei/wei${item}.png`)} alt="" /></div>);  //  eslint-disable-line
              })}
            </div>
          </div>
          <div className="yupei-img clearfix rel1000">
            <div className="ielts-img">
              <img onClick={evt => this.live800(evt, true)} src={require('../../../img/other/yupei/ssys.png')} alt="" />
            </div>
            <div className="toefl-img">
              <img onClick={evt => this.live800(evt, true)} src={require('../../../img/other/yupei/sstf.png')} alt="" />
            </div>
          </div>
        </div>
        <div className="related-business">
          <h3>{yupeiData.business.title}</h3>
          <div className="related-business-content rel1000">
            <div className="row">
              {yupeiData.business.list.map((lp, idx) => {
                return (<div className="col-xs-3">
                  <div className="related-img">
                    <a onClick={evt => this.live800(evt, idx === 0)} href={lp.link} target="_blank" style={{ zIndex: 9, top: 0 }}>
                      <img src={lp.img} alt="" />
                    </a>
                    <p>{lp.txt}</p>
                  </div>
                </div>);
              })}
            </div>
          </div>
        </div>
        <div className="footer-form">
          <div className="rel1000">
            <h2>来顺顺,<br />你的国际化教育我包了</h2>
            <div className="footer-form-content">
              <div className="form-input clearfix">
                <input type="text" placeholder="称呼" ref="nameRef" />
                <Dropdown classes={'application-project'} defaultItem={'期望出国时间'} items={yupeiData.abord_time} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'planning_year'} />
                <Dropdown classes={'application-project pull-left'} defaultItem={'目标成绩'} items={yupeiData.avgs} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
                <Dropdown classes={'application-project'} defaultItem={'活动/实习经历'} items={yupeiData.activity} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'remark'} />
                <input className="phone-number" type="text" placeholder="手机号码" ref="mobileRef" />
                <p className="err-tips">{this.state.errorTips}</p>
              </div>
              <button type="button" className="btn btn-primary yupei-btn" onClick={evt => this.submitAbroad(evt)}>获取整套留学方案</button>
            </div>
          </div>
        </div>
        <SuccessModal text={'留学方案制定中，专业的留学顾问会在24小时内联系您'} />
        <Footer qudao_details="'1'" />
      </div>
    );
  }
}

module.exports = Yupei;
