/**
 * Created by noodles on 2017/6/14.
 * description
 */
/* eslint global-require: 0 */

require('../../../libs/slick-carousel/slick/slick');
require('../../../libs/slick-carousel/slick/slick.less');
require('../../../libs/slick-carousel/slick/slick-theme.less');
require('./yasi.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Header = require('../../components/Header');
const Footer = require('../../components/Footer');
const Live800 = require('../../components/Live800');  //  eslint-disable-line
const Dropdown = require('../../components/Dropdown');
const yasiData = require('./yasi.json');
const Yuyue = require('../../components/Yuyue/Yuyue');
const regx = require('../../core/regexp');
const SuccessModal = require('../../components/SuccessModal');


class Yupei extends React.Component {

  static defaultProps = {
    abroadData: { apply_contry: '语培', qudao_details: '官网/语培雅思/提分方案', xifenqudao: 'SEM' },
    examFilterData: {},
  };

  static propTypes = {
    abroadData: PropTypes.object,
    examFilterData: PropTypes.object, //  下拉生成学习方案对象
    // tips: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      errorTips: '',
      isAbroadForm: false,  //  是否提交成功
      examDropdownArr: [],  //  生成方案 -》 考试成绩下拉框数组
      // 根据下拉选项 筛选的 学习方案结果
      examFilterResult: {
        tj_class: '基础+提高1',
        tj_class_time: '13个月',
        keshi: '190课时',
        keshi_time: '14个月',
      },
    };
  }

  componentWillMount() {
    document.title = '雅思考试_雅思学习_雅思培训班_雅思培训机构-顺顺留学';
    $('meta[name="keywords"]').attr('content', '雅思，雅思考试，雅思学习，雅思培训班，雅思培训机构');
    $('meta[name="description"]').attr('content', '【顺顺留学】雅思(IELTS)频道为您提供有关雅思考试时间、雅思学习资料、记忆方法等雅思考试资讯方面的相关信息，同时还为您提供雅思培训班，雅思培训课程等相关信息。');
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
      slidesToShow: 4,
      slidesToScroll: 4,
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

  dpFilter(key, val) {
    Object.assign(this.props.examFilterData, { [key]: val });
    if (key === 'type') {
      if (Object.keys(this.props.examFilterData)) {
        delete this.props.examFilterData.exam;
      }
      this.setState({
        examDropdownArr: yasiData.yasiPlan.plan[val],
      });
    }
    const examFilterData = this.props.examFilterData;
    if (Object.keys(examFilterData).length === 3) {
      // const arr = [];
      // for (let key in examFilterData) arr.push(examFilterData[key]);  //  eslint-disable-line
      // const resStr = arr.reduce((item1, item2) => `${item1}+${item2}`);
      const resStr = `${examFilterData.type}+${examFilterData.exam}+${examFilterData.ielts}`;
      this.setState({
        examFilterResult: yasiData.yasiPlan.results[resStr],
      });
    }
  }

  submitAbroad(evt, pos) {
    //  pos -> top, bottom
    const { abroadData } = this.props;
    const name = this.refs[`nameRef${pos}`].value.trim();
    const mobile = this.refs[`mobileRef${pos}`].value.trim();
    const time = abroadData.planning_year;
    if (!name) {
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
      const base800 = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=72111';
      const opened = `${base800}&clientId=${window.jzlvisitor_id.substr(0, 16)}`;
      /* eslint-disable */
      const centerWidth = window.innerWidth / 2 - 245;
      const centerHeight = window.innerHeight / 2 - 260;
      window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=520');
      /* eslint-enable */
    }
  }

  render() {
    const examResObj = this.state.examFilterResult;
    return (
      <div id="yasi">
        <Header />
        <div className="yupei-banner">
          <img src={require('../../../img/other/yasi/yasi-banner.png')} alt="" width="100%" />
          <div className="banner-content">
            <div className="banner-text">
              <p className="banner-btn"><Live800 classes={'live800 live8001'} title={'我要提分'} type={'a'} tips={'热门院校排名'} /></p>
              <div className="footer-form-content">
                <div className="form-input clearfix">
                  <input type="text" placeholder="称呼" ref="nameReftop" />
                  <Dropdown classes={'application-project pull-left'} defaultItem={'目标成绩'} items={yasiData.avgs} dropUpDown={'down'} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
                  <Dropdown classes={'application-project'} defaultItem={'期望出国时间'} items={yasiData.abord_time} dropUpDown={'down'} cb={(key, val) => this.dpCb(key, val)} formKey={'planning_year'} />
                  <input className="phone-number" type="text" placeholder="手机号码" ref="mobileReftop" />
                  <p className="err-tips">{this.state.errorTips}</p>
                </div>
                <button type="button" className="btn btn-primary yupei-btn" onClick={evt => this.submitAbroad(evt, 'top')}>获取提分方案</button>
              </div>
            </div>
          </div>
        </div>
        <div className="yupei-introduction">
          <div className="yasi-text rel1000">
            <h3>{yasiData.text.title}</h3>
            <p>{yasiData.text.t1}<br />{yasiData.text.t2}</p>
            <div className="yasi-country row">
              <div className="col-xs-3">
                <img src={require('../../../img/other/yasi/yasi1.png')} alt="" width="100%" />
                <p>绝大多数（超过3300所）美国院校包括所有常青藤盟校认可雅思成绩。迄今为止已有20万份雅思成绩单发往美国！</p>
              </div>
              <div className="col-xs-3">
                <img src={require('../../../img/other/yasi/yasi2.png')} alt="" width="100%" />
                <p>雅思考试是您圆梦英国的首选。被100%英国院校认可，也被英国名校当作衡量申请者语言水平的优先级选择！</p>
              </div>
              <div className="col-xs-3">
                <img src={require('../../../img/other/yasi/yasi3.png')} alt="" width="100%" />
                <p>雅思考试是留学加拿大的最佳捷径！100%被加拿大院校和移民语言测评认可，更被中加学生合作计划（SPP）和学习直入计划（SDS）唯一认可！</p>
              </div>
              <div className="col-xs-3 no-margin">
                <img src={require('../../../img/other/yasi/yasi4.png')} alt="" width="100%" />
                <p>通过雅思考试，您会觉得澳洲从未如此之近！100%的认可度，最早被认可的国际化标准语言考试，让您与澳洲零距离！</p>
              </div>
            </div>
          </div>
          <div className="yupei-text-button rel1000">
            <p><Live800 classes={'live800 live8001'} title={'热门专业院校排名与最低雅思成绩要求'} type={'a'} tips={'热门院校排名'} /></p>
          </div>
        </div>
        <div className="yasi-difficulty rel1000">
          <h3>顺顺语培专门解决中国考生的雅思难点</h3>
          <div className="yasi-difficulty-content clearfix">
            <div className="difficulty-box more-width">
              <img src={require('../../../img/other/yasi/yasi5.png')} alt="" />
              <div className="right-text">
                <h5>听力五大难点</h5>
                <p><strong>1. 听不到 </strong>— 跟丢/找不到答案点</p>
                <p><strong>2. 听到反应不过来 </strong>— 听到答案句，无时间加工</p>
                <p><strong>3. 反应过来 </strong>— 写错-格式/单复数/拼写...</p>
                <p><strong>4. 某种题型不擅长 </strong>— 题型技巧不熟悉</p>
                <p><strong>5. 固定考点不熟悉 </strong>— 十大场景固定考点不熟悉</p>
              </div>
            </div>
            <div className="difficulty-box">
              <img src={require('../../../img/other/yasi/yasi6.png')} alt="" />
              <div className="right-text">
                <h5>阅读五大难点</h5>
                <p><strong>1. 单词不认识 </strong>— 判断题目的关键词不认识</p>
                <p><strong>2. 定位困难 </strong>— 题型特点和定位方法不当</p>
                <p><strong>3. 长难句不懂 </strong>— 五大修饰关系不熟悉</p>
                <p><strong>4. 某种题型不擅长 </strong>— 题型技巧不熟悉</p>
                <p><strong>5. 时间不够用 </strong>— 做题顺序安排不当</p>
              </div>
            </div>
            <div className="difficulty-box more-width">
              <img src={require('../../../img/other/yasi/yasi7.png')} alt="" />
              <div className="right-text">
                <h5>写作五大难点</h5>
                <p><strong>1. 文章结构不正确 </strong>— Task1图形数/Task2四种文体</p>
                <p><strong>2. 数据/论点不充分 </strong>— 题型特点和定位方法不当</p>
                <p><strong>3. 词汇同义替换少 </strong>— Teenager crime / Juvenile delinquency</p>
                <p><strong>4. 高分语法体现少 </strong>— 六大从句/ 非谓语/ 强调/ 倒装/<span className="text-box"> 独立主格/ 插入语 /特殊标点</span></p>
                <p><strong>5. 论证不充分 </strong>— 阐述/举例/对比/扩展……</p>
              </div>
            </div>
            <div className="difficulty-box">
              <img src={require('../../../img/other/yasi/yasi8.png')} alt="" />
              <div className="right-text">
                <h5>口语五大难点</h5>
                <p><strong>1. 流利度 </strong>— 答案扩展/逻辑连接词/犹豫中断</p>
                <p><strong>2. 词汇 </strong>— eg. crowded/ sardines in can/ <span className="text-box-last">couldn’t fall down even if u r shot</span></p>
                <p><strong>3. 语法 </strong>— 从句/ 非谓语/ 强调/ 倒装/感叹</p>
                <p><strong>4. 发音 </strong>— 听懂-准确-连读弱读-重音-语调</p>
                <p><strong>5. 考点 </strong>— 虚拟 / 时态 / 对比……</p>
              </div>
            </div>
          </div>
        </div>
        <div className="yupei-famteacher-container">
          <div className="yupei-famteacher rel1000">
            <h3>{yasiData.teachTitle}</h3>
            <div className="famteacher-content row">
              {yasiData.famteacher.map(ft => {
                return (<div className="col-xs-3">
                  <img src={ft.logo} alt="" />
                  <p>{ft.p}</p>
                </div>);
              })}
            </div>
          </div>
          <div className="slick-wrap famteacher-wrap" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="multiple-items">
              {yasiData.teachers.map((teach) => {
                return (<div className="consultant-content">
                  <img src={teach.image} alt="" />
                  <h3>{teach.name}</h3>
                  {teach.plist.map(pl => {
                    return (<p>{pl}</p>);
                  })}
                  <div className="consultant-button">
                    <Yuyue qudao_details={`官网/语培雅思/预约老师/${teach.name}`} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={`预约${teach.xing}老师帮我提分`} />
                  </div>
                </div>);
              })}
            </div>
          </div>
        </div>
        <div className="yasi-plan">
          <div className="yasi-plan-img">
            <div className="yasi-plan-form">
              <p className="yasi-plan-btn">
                <Live800 classes={'live800 live8001'} title={'帮我规划学习路径'} type={'a'} tips={'热门院校排名'} />
              </p>
              <div className="yasi-form-content">
                <div className="form-input clearfix">
                  <Dropdown classes={'application-project full-width'} defaultItem={'参加过的考试'} items={yasiData.exam} dropUpDown={'up'} cb={(key, val) => this.dpFilter('type', val)} />
                  <Dropdown classes={'application-project'} defaultItem={'雅思目标分数'} items={yasiData.target_score} dropUpDown={'up'} cb={(key, val) => this.dpFilter('ielts', val)} />
                  <Dropdown classes={'application-project pull-left'} defaultItem={'考试成绩'} items={this.state.examDropdownArr} dropUpDown={'up'} cb={(key, val) => this.dpFilter('exam', val)} />
                  <p className="err-tips">{this.state.errorTips}</p>
                </div>
                <div className="yasi-plan-table">
                  <table className="table table-striped">
                    <thead><tr><th colSpan="2">雅思学习方案</th></tr></thead>
                    <tbody>
                      <tr className="gray-back">
                        <td>推荐班型</td>
                        <td>预估时长</td>
                      </tr>
                      <tr>
                        <td>{examResObj.tj_class}</td>
                        <td>{examResObj.tj_class_time}</td>
                      </tr>
                      <tr className="gray-back">
                        <td>推荐一对一</td>
                        <td>预估时长</td>
                      </tr>
                      <tr>
                        <td>{examResObj.keshi}</td>
                        <td>{examResObj.keshi_time}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shunshun-exam rel1000">
          <h3>顺顺雅思全真模考</h3>
          <ul className="nav nav-tabs shunshun-exam-tab" role="tablist">
            <li role="presentation" className="active">
              <a href="#yasi1" aria-controls="yasi1" role="tab" data-toggle="tab">
                <img src={require('../../../img/other/yasi/yasi1-1.png')} alt="" />
                <p>一样的界面</p>
              </a>
            </li>
            <li role="presentation">
              <a href="#yasi2" aria-controls="yasi2" role="tab" data-toggle="tab">
                <img src={require('../../../img/other/yasi/yasi1-2.png')} alt="" />
                <p>一样的考题</p>
              </a>
            </li>
            <li role="presentation">
              <a href="#yasi3" aria-controls="yasi3" role="tab" data-toggle="tab">
                <img src={require('../../../img/other/yasi/yasi1-3.png')} alt="" />
                <p>一样的时限</p>
              </a>
            </li>
            <li role="presentation">
              <a href="#yasi4" aria-controls="yasi4" role="tab" data-toggle="tab">
                <img src={require('../../../img/other/yasi/yasi1-4.png')} alt="" />
                <p>一样的成绩单</p>
              </a>
            </li>
            <li role="presentation">
              <a href="#yasi5" aria-controls="yasi2" role="tab" data-toggle="tab">
                <img src={require('../../../img/other/yasi/yasi1-5.png')} alt="" />
                <p>全局能力分析</p>
              </a>
            </li>
            <li role="presentation">
              <a href="#yasi6" aria-controls="yasi3" role="tab" data-toggle="tab">
                <img src={require('../../../img/other/yasi/yasi1-6.png')} alt="" />
                <p>单向针对性分析</p>
              </a>
            </li>
            <li role="presentation">
              <a href="#yasi7" aria-controls="yasi4" role="tab" data-toggle="tab">
                <img src={require('../../../img/other/yasi/yasi1-7.png')} alt="" />
                <p>详细结果一目了然</p>
              </a>
            </li>
          </ul>
          <div className="tab-content shunshun-exam-content">
            <div role="tabpanel" className="tab-pane active" id="yasi1">
              <img src={require('../../../img/other/yasi/1.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验雅思全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi2">
              <img src={require('../../../img/other/yasi/2.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验雅思全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi3">
              <img src={require('../../../img/other/yasi/3.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验雅思全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi4">
              <img src={require('../../../img/other/yasi/4.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验雅思全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi5">
              <img src={require('../../../img/other/yasi/5.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验雅思全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi6">
              <img src={require('../../../img/other/yasi/6.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验雅思全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi7">
              <img src={require('../../../img/other/yasi/7.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验雅思全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
          </div>
        </div>
        <div className="scientific-positioning">
          <h3>{yasiData.scientific.title}</h3>
          <div className="rel1000">
            <ul className="nav nav-tabs scientific-tab" role="tablist">
              {yasiData.scientific.steps.map((sp, idx) => {
                return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={`#scientific${idx + 1}`} aria-controls={`scientific${idx + 1}`} role="tab" data-toggle="tab"><strong>Step.{idx + 1}</strong>{sp}</a></li>);
              })}
            </ul>
            <div className="tab-content scientfic-macimg">
              <div role="tabpanel" className="tab-pane active padding-around" id="scientific1">
                <div className="tab-pane-top">
                  <img src={yasiData.scientific.ct1.topImg} alt="" width="100%" />
                </div>
                <div className="tab-pane-down">
                  <ul className="nav nav-tabs" role="tablist">
                    {yasiData.scientific.ct1.tbs.thead.map((hd, idx) => {
                      return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={hd.href} aria-controls="tl" role="tab" data-toggle="tab">{hd.txt}</a></li>);
                    })}
                  </ul>
                  <div className="tab-content">
                    {yasiData.scientific.ct1.tbs.tdList.map((tb, idx) => {
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
                          <Yuyue qudao_details={'官网/语培雅思/预约模考'} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={'预约参加全真模考'} />
                        </div>
                      </div>);
                    })}
                  </div>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific2">
                <h4>{yasiData.scientific.ct2.title}</h4>
                <div className="tab-pane-down">
                  <ul className="nav nav-tabs" role="tablist">
                    {yasiData.scientific.ct2.tbs.thead.map((hd, idx) => {
                      return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={hd.href} aria-controls="tl" role="tab" data-toggle="tab" dangerouslySetInnerHTML={{ __html: hd.txt }}></a></li>);
                    })}
                  </ul>
                  <div className="tab-content">
                    {yasiData.scientific.ct2.tbs.tdList.map((tb, idx) => {
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
                          <Yuyue qudao_details={'官网/语培雅思/预约模考'} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={'预约参加全真模考'} />
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
                <img src={require('../../../img/other/yasi/img6.png')} alt="" width="100%" />
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific5">
                <table className="table table-bordered table-condensed table-responsive" dangerouslySetInnerHTML={{ __html: yasiData.scientific.ct5 }}></table>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific6">
                <table className="table table-bordered table-condensed table-responsive" dangerouslySetInnerHTML={{ __html: yasiData.scientific.ct6 }}></table>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific7">
                <img src={require('../../../img/other/yupei/img8.png')} alt="" width="100%" />
              </div>
            </div>
          </div>
        </div>
        <div className="case-analysis">
          <h3>{yasiData.analysis.title}</h3>
          <div className="slick-wrap" style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <div className="case-items">
              {yasiData.analysis.datas.map(item => {
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
                return (<div><img src={require(`../../../img/other/yasi/wei${item}.png`)} alt="" /></div>);  //  eslint-disable-line
              })}
            </div>
          </div>
          <div className="curriculum-structure">
            <div className="curriculum-structure-content rel1000">
              <h3>选择适合你的课程体系</h3>
              <div className="curriculum-structure-table">
                <table className="table">
                  <tbody valign="middle">
                    <tr>
                      <th>产品名称</th>
                      <th className="width300">产品特点</th>
                      <th className="width300">适用人群</th>
                      <th>免费试听</th>
                      <th>了解更多</th>
                    </tr>
                    <tr>
                      <td>中教一对一</td>
                      <td>一对一定制课程，适合所有学生</td>
                      <td>一对一定制课程，适合所有学生</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培雅思/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>外教一对一</td>
                      <td>西方人思维授课，更了解批卷考官心态，教授更加地道的专业知识和国外文化，帮助同学通过考试或者在留学前充分了解国外生活和学习习惯</td>
                      <td>口语写作冲刺雅思7+或者托福26+或以学习国外文化为目的</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培雅思/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>助教一对一</td>
                      <td>提升课后复习效率，更加高效完成课上知识的吸收和练习能力</td>
                      <td>自觉性稍弱，需要老师督促完成课后作业及自主复习内容的同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培雅思/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>周末班【面试/远程】</td>
                      <td>课程时间灵活安排，工作生活和雅思学习不冲突</td>
                      <td>在校生或已经参加工作不能在平时安排时间学习的同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培雅思/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>平时班【面试/远程】</td>
                      <td>封闭集训，短时冲分的保障</td>
                      <td>全脱产同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培雅思/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>大学预修外教课程</td>
                      <td>国外专业课的“扫盲学前班”，为适应国外各门专业课提前预习，缩短适应期</td>
                      <td>希望体验国外课堂、提高英语能力，或者意向预习国外专业课程的同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培雅思/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>外教海外生存课</td>
                      <td>国外生活&学习提前了解，缩短国外生活学习适应期</td>
                      <td>当年或当季要出国留学的同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培雅思/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="related-business">
          <h3>{yasiData.business.title}</h3>
          <div className="related-business-content rel1000">
            <div className="row">
              {yasiData.business.list.map((lp, idx) => {
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
                <input type="text" placeholder="称呼" ref="nameRefbottom" />
                <Dropdown classes={'application-project'} defaultItem={'期望出国时间'} items={yasiData.abord_time} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'planning_year'} />
                <Dropdown classes={'application-project pull-left'} defaultItem={'目标成绩'} items={yasiData.avgs} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
                <Dropdown classes={'application-project'} defaultItem={'活动/实习经历'} items={yasiData.activity} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'remark'} />
                <input className="phone-number" type="text" placeholder="手机号码" ref="mobileRefbottom" />
                <p className="err-tips">{this.state.errorTips}</p>
              </div>
              <button type="button" className="btn btn-primary yupei-btn" onClick={evt => this.submitAbroad(evt, 'bottom')}>获取整套留学方案</button>
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
