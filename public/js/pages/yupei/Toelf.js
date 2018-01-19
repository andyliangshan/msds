/**
 * Created by noodles on 2017/6/14.
 * description
 */
/* eslint global-require: 0 */

require('../../../libs/slick-carousel/slick/slick');
require('../../../libs/slick-carousel/slick/slick.less');
require('../../../libs/slick-carousel/slick/slick-theme.less');
require('./toelf.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Header = require('../../components/Header');
const Footer = require('../../components/Footer');
const Live800 = require('../../components/Live800');  //  eslint-disable-line
const Dropdown = require('../../components/Dropdown');
const tuofuData = require('./tuofu.json');
const Yuyue = require('../../components/Yuyue/Yuyue');
const regx = require('../../core/regexp');
const SuccessModal = require('../../components/SuccessModal');


class Yupei extends React.Component {

  static defaultProps = {
    abroadData: { apply_contry: '语培', qudao_details: '官网/语培托福/提分方案', xifenqudao: 'SEM' },
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
    document.title = '托福考试_托福学习_托福培训班_托福培训机构-顺顺留学';
    $('meta[name="keywords"]').attr('content', '托福，托福考试，托福学习，托福培训班，托福培训机构');
    $('meta[name="description"]').attr('content', '【顺顺留学】托福(IELTS)频道为您提供有关托福考试时间、托福学习资料、记忆方法等托福考试资讯方面的相关信息，同时还为您提供托福培训班，托福培训课程等相关信息。');
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
        examDropdownArr: tuofuData.yasiPlan.plan[val],
      });
    }
    const examFilterData = this.props.examFilterData;
    if (Object.keys(examFilterData).length === 3) {
      // const arr = [];
      // for (let key in examFilterData) arr.push(examFilterData[key]);  //  eslint-disable-line
      // const resStr = arr.reduce((item1, item2) => `${item1}+${item2}`);
      const resStr = `${examFilterData.type}+${examFilterData.exam}+${examFilterData.ielts}`;
      this.setState({
        examFilterResult: tuofuData.yasiPlan.results[resStr],
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
      <div id="toelf">
        <Header />
        <div className="yupei-banner">
          <img src={require('../../../img/other/tuofu/tuofu-banner.png')} alt="" width="100%" />
          <div className="banner-content">
            <div className="banner-text">
              <p className="banner-btn"><Live800 classes={'live800 live8001'} title={'我要提分'} type={'a'} tips={'热门院校排名'} /></p>
              <div className="footer-form-content">
                <div className="form-input clearfix">
                  <input type="text" placeholder="称呼" ref="nameReftop" />
                  <Dropdown classes={'application-project pull-left'} defaultItem={'目标成绩'} items={tuofuData.avgs} dropUpDown={'down'} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
                  <Dropdown classes={'application-project'} defaultItem={'期望出国时间'} items={tuofuData.abord_time} dropUpDown={'down'} cb={(key, val) => this.dpCb(key, val)} formKey={'planning_year'} />
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
            <h3>{tuofuData.text.title}</h3>
            <p>{tuofuData.text.t1}<br />{tuofuData.text.t2}</p>
            <div className="yasi-country row">
              <div className="col-xs-3">
                <img src={require('../../../img/other/tuofu/tuofu1.png')} alt="" width="100%" />
                <p>考试时间：60–80 分钟</p>
                <p>问题：36–56 个问题</p>
                <p>任务：阅读从学术文章中选摘的 3 个或 4 个段落并回答问题。</p>
              </div>
              <div className="col-xs-3">
                <img src={require('../../../img/other/tuofu/tuofu2.png')} alt="" width="100%" />
                <p>考试时间：60–90 分钟</p>
                <p>问题：34–51 个问题</p>
                <p>任务：听演讲、课堂讨论和对话录音，然后回答问题。</p>
              </div>
              <div className="col-xs-3">
                <img src={require('../../../img/other/tuofu/tuofu3.png')} alt="" width="100%" />
                <p>考试时间：20 分钟</p>
                <p>问题：6 项任务</p>
                <p>任务：针对一个熟悉的话题发表观点；根据阅读及听力任务的内容口头表达观点。</p>
              </div>
              <div className="col-xs-3 no-margin">
                <img src={require('../../../img/other/tuofu/tuofu4.png')} alt="" width="100%" />
                <p>考试时间：50 分钟</p>
                <p>问题：2 项任务</p>
                <p>任务：根据阅读及听力任务的内容完成一篇作文；在作文中要阐述自己的观点。</p>
              </div>
            </div>
          </div>
          <div className="yupei-text-button rel1000">
            <p><Live800 classes={'live800 live8001'} title={'热门专业院校排名与最低托福成绩要求'} type={'a'} tips={'热门院校排名'} /></p>
          </div>
        </div>
        <div className="yasi-difficulty rel1000">
          <h3>顺顺语培专门解决中国考生的雅思难点</h3>
          <div className="yasi-difficulty-content clearfix">
            <div className="difficulty-box more-width">
              <img src={require('../../../img/other/yasi/yasi5.png')} alt="" />
              <div className="right-text">
                <h5>听力五大难点</h5>
                <p><strong>1. 听不懂生词 </strong>— 生词太多，听不明白</p>
                <p><strong>2. 听不懂句子 </strong>— 复合句听到但分析难</p>
                <p><strong>3. 听到反应不过来 </strong>— 不会运用笔记法</p>
                <p><strong>4. 反应过来记不住 </strong>— 跟丢/找不到答案点</p>
                <p><strong>5. 听力考点不熟悉 </strong>— 十三大固定考点不熟悉</p>
              </div>
            </div>
            <div className="difficulty-box">
              <img src={require('../../../img/other/yasi/yasi6.png')} alt="" />
              <div className="right-text">
                <h5>阅读五大难点</h5>
                <p><strong>1. 单词不认识 </strong>— 题目的关键词汇不认识</p>
                <p><strong>2. 无法快速定位 </strong>— 题型特点和定位方法不当</p>
                <p><strong>3. 段落长难句不懂 </strong>— 五大修饰关系不熟悉</p>
                <p><strong>4. 某种题型不擅长 </strong>— 题型技巧不熟悉</p>
                <p><strong>5. 逻辑不理解 </strong>— 逻辑不清楚概括有困难</p>
              </div>
            </div>
            <div className="difficulty-box more-width">
              <img src={require('../../../img/other/yasi/yasi7.png')} alt="" />
              <div className="right-text">
                <h5>写作五大难点</h5>
                <p><strong>1. 综合写作听力听不懂 </strong>— 听力抓不住重点，笔记有问题</p>
                <p><strong>2. 综合写作套路不熟练 </strong>— 阅读和听力的内容逻辑不清楚</p>
                <p><strong>3. 独立写作不会破题 </strong>— 六种破题方法不了解</p>
                <p><strong>4. 论证不会展开 </strong>— 阐述/举例/对比/扩展……</p>
                <p><strong>5. 表达欠缺、词语匮乏 </strong>— 不会使用多种语言形式表达</p>
              </div>
            </div>
            <div className="difficulty-box">
              <img src={require('../../../img/other/yasi/yasi8.png')} alt="" />
              <div className="right-text">
                <h5>口语五大难点</h5>
                <p><strong>1. 流利度不够 </strong>— 答案扩展/逻辑连接词/犹豫中断</p>
                <p><strong>2. 词汇过于简单 </strong>— 不会使用高级词汇表达，只会简单词</p>
                <p><strong>3. 语言句型单一化 </strong>— 从句/ 非谓语/ 强调/ 倒装/感叹</p>
                <p><strong>4. 时间把控不合理 </strong>— 规定时间内内容组织困难</p>
                <p><strong>5. 听力信息记不全 </strong>— 听力重点信息不会记录，抓不住重点</p>
              </div>
            </div>
          </div>
        </div>
        <div className="yupei-famteacher-container">
          <div className="yupei-famteacher rel1000">
            <h3>{tuofuData.teachTitle}</h3>
            <div className="famteacher-content row">
              {tuofuData.famteacher.map(ft => {
                return (<div className="col-xs-3">
                  <img src={ft.logo} alt="" />
                  <p>{ft.p}</p>
                </div>);
              })}
            </div>
          </div>
          <div className="slick-wrap famteacher-wrap" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="multiple-items">
              {tuofuData.teachers.map((teach) => {
                return (<div className="consultant-content">
                  <img src={teach.image} alt="" />
                  <h3>{teach.name}</h3>
                  {teach.plist.map(pl => {
                    return (<p>{pl}</p>);
                  })}
                  <div className="consultant-button">
                    <Yuyue qudao_details={`官网/语培托福/预约老师/${teach.name}`} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={`预约${teach.xing}老师帮我提分`} />
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
                  <Dropdown classes={'application-project full-width'} defaultItem={'参加过的考试'} items={tuofuData.exam} dropUpDown={'up'} cb={(key, val) => this.dpFilter('type', val)} />
                  <Dropdown classes={'application-project'} defaultItem={'托福目标分数'} items={tuofuData.target_score} dropUpDown={'up'} cb={(key, val) => this.dpFilter('ielts', val)} />
                  <Dropdown classes={'application-project pull-left'} defaultItem={'考试成绩'} items={this.state.examDropdownArr} dropUpDown={'up'} cb={(key, val) => this.dpFilter('exam', val)} />
                  <p className="err-tips">{this.state.errorTips}</p>
                </div>
                <div className="yasi-plan-table">
                  <table className="table table-striped">
                    <thead><tr><th colSpan="2">托福学习方案</th></tr></thead>
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
          <h3>顺顺托福全真模考</h3>
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
              <img src={require('../../../img/other/toelf/a1-1.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验托福全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi2">
              <img src={require('../../../img/other/toelf/a2-2.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验托福全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi3">
              <img src={require('../../../img/other/toelf/a3-3.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验托福全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi4">
              <img src={require('../../../img/other/toelf/a4-4.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验托福全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi5">
              <img src={require('../../../img/other/toelf/a5-5.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验托福全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi6">
              <img src={require('../../../img/other/toelf/a6-6.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验托福全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="yasi7">
              <img src={require('../../../img/other/toelf/a7-7.png')} alt="" />
              <div className="yasi-text-button rel1000">
                <p><Live800 classes={'live800 live8001'} title={'体验托福全真模考'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
          </div>
        </div>
        <div className="scientific-positioning">
          <h3>{tuofuData.scientific.title}</h3>
          <div className="rel1000">
            <ul className="nav nav-tabs scientific-tab" role="tablist">
              {tuofuData.scientific.steps.map((sp, idx) => {
                return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={`#scientific${idx + 1}`} aria-controls={`scientific${idx + 1}`} role="tab" data-toggle="tab"><strong>Step.{idx + 1}</strong>{sp}</a></li>);
              })}
            </ul>
            <div className="tab-content scientfic-macimg">
              <div role="tabpanel" className="tab-pane active padding-around" id="scientific1">
                <div className="tab-pane-top">
                  <img src={tuofuData.scientific.ct1.topImg} alt="" width="100%" />
                </div>
                <div className="tab-pane-down">
                  <ul className="nav nav-tabs" role="tablist">
                    {tuofuData.scientific.ct1.tbs.thead.map((hd, idx) => {
                      return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={hd.href} aria-controls="tl" role="tab" data-toggle="tab">{hd.txt}</a></li>);
                    })}
                  </ul>
                  <div className="tab-content">
                    {tuofuData.scientific.ct1.tbs.tdList.map((tb, idx) => {
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
                          <Yuyue qudao_details={'官网/语培托福/预约模考'} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={'预约参加全真模考'} />
                        </div>
                      </div>);
                    })}
                  </div>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific2">
                <h4>{tuofuData.scientific.ct2.title}</h4>
                <div className="tab-pane-down">
                  <ul className="nav nav-tabs" role="tablist">
                    {tuofuData.scientific.ct2.tbs.thead.map((hd, idx) => {
                      return (<li role="presentation" className={idx === 0 ? 'active' : ''}><a href={hd.href} aria-controls="tl" role="tab" data-toggle="tab" dangerouslySetInnerHTML={{ __html: hd.txt }}></a></li>);
                    })}
                  </ul>
                  <div className="tab-content">
                    {tuofuData.scientific.ct2.tbs.tdList.map((tb, idx) => {
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
                          <Yuyue qudao_details={'官网/语培托福/预约模考'} defaultShowCountry={'英国'} submitBtn={'提交'} btnTitle={'预约参加全真模考'} />
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
                <img src={require('../../../img/other/yupei/img6-6.png')} alt="" width="100%" />
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific5">
                <table className="table table-bordered table-condensed table-responsive" dangerouslySetInnerHTML={{ __html: tuofuData.scientific.ct5 }}></table>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific6">
                <table className="table table-bordered table-condensed table-responsive" dangerouslySetInnerHTML={{ __html: tuofuData.scientific.ct6 }}></table>
              </div>
              <div role="tabpanel" className="tab-pane" id="scientific7">
                <img src={require('../../../img/other/yupei/img8.png')} alt="" width="100%" />
              </div>
            </div>
          </div>
        </div>
        <div className="case-analysis">
          <h3>{tuofuData.analysis.title}</h3>
          <div className="slick-wrap" style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <div className="case-items">
              {tuofuData.analysis.datas.map(item => {
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
                      <td>一对一定制课程，根据每个学生个人情况定制课程内容，使课程更据有针对性，适合所有学生</td>
                      <td>一对一定制课程，适合所有学生</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培托福/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>外教一对一</td>
                      <td>西方人思维授课，更了解批卷考官心态，教授更加地道的专业知识和国外文化帮助同学通过考试或者在留学前充分了解国外生活和学习习惯</td>
                      <td>口语写作冲刺托福26+学习国外文化为目的</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培托福/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>助教一对一</td>
                      <td>提升课后复习效率，更加高效完成课上知识的吸收和练习能力</td>
                      <td>自觉性稍弱，需要老师督促完成课后作业以及自主复习内容的同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培托福/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>周末班【面试/远程】</td>
                      <td>课程时间灵活安排，工作生活和托福学习不冲突</td>
                      <td>在校生或已经参加工作不能在平时安排时间学习的同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培托福/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>平时班【面试/远程】</td>
                      <td>封闭集训，短时间冲分的保障</td>
                      <td>全脱产同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培托福/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>大学预修外教课程</td>
                      <td>国外专业课“扫盲学前班”，为适应国外各门专业课提前预习，缩短适应期</td>
                      <td>希望体验国外课堂，提高英语能力，或者意向预习国外专业课程的同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培托福/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
                        </div>
                      </td>
                      <td><p><Live800 classes={'live800 live8001 curriculumStructure'} title={'了解更多'} type={'a'} tips={'选择课程体系'} /></p></td>
                    </tr>
                    <tr>
                      <td>外教海外生存课</td>
                      <td>国外生活&学习提前了解，缩短国外生活学习适应期</td>
                      <td>当年或当季要出国留学同学</td>
                      <td>
                        <div className="consultant-button">
                          <Yuyue qudao_details={'官网/语培托福/免费试听'} submitBtn={'提交'} btnTitle={'免费试听'} wrapModalTitle={'免费试听'} type={'a'} />
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
          <h3>{tuofuData.business.title}</h3>
          <div className="related-business-content rel1000">
            <div className="row">
              {tuofuData.business.list.map((lp, idx) => {
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
                <Dropdown classes={'application-project'} defaultItem={'期望出国时间'} items={tuofuData.abord_time} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'planning_year'} />
                <Dropdown classes={'application-project pull-left'} defaultItem={'目标成绩'} items={tuofuData.avgs} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'average_score'} />
                <Dropdown classes={'application-project'} defaultItem={'活动/实习经历'} items={tuofuData.activity} dropUpDown={'up'} cb={(key, val) => this.dpCb(key, val)} formKey={'remark'} />
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
