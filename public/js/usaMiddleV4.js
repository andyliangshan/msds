/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-promise').polyfill();
// require('whatwg-fetch');
require('fetch-ie8');
require('core-js/fn/object/assign');  //  Object.assign for ie8

if (__DEV__) {
  require('console-polyfill');
}

const React = require('react');
const ReactDOM = require('react-dom');

const findDOMNode = ReactDOM.findDOMNode;

require('../libs/bootstrap/js/tooltip');
require('../libs/bootstrap/js/tab');

const UtilNet = require('./core/UtilNet');

// public
const Header = require('./components/Header');
const Banner = require('./components/Banner');
const Live800 = require('./components/Live800/Live800');
const BotFormData = require('./components/usahot/BotForm/BotFormData');
const PageInterModals = require('./components/PageInterModals/PageInterModals2');
const AbroadForm = require('./components/AbroadForm');
const TestEnroll = require('./components/usahot/TestEnroll/TestEnroll');
// const TestEnroll = require('./components/TestEnroll/TestEnroll');
const SuccessModal = require('./components/SuccessModal');
const C = require('./core/conf');

// data
const usaMiddleV4Data = require('./components/usahot/ExtraData/usaMiddleV4.json');
const majorTabData = require('./components/usahot/ExtraData/majorTabData.json');
// self
const Offers = require('./components/usahot/MiddleV4/Offers');
const IntZsg = require('./components/usahot/MiddleV4/IntZsg');
const AdmitCost = require('./components/usahot/MiddleV4/AdmitCost');
const IntJury = require('./components/usahot/MiddleV4/IntJury');
const SchoolRank = require('./components/usahot/MiddleV4/SchoolRank');
const Question = require('./components/usahot/MiddleV4/Question');
const Excellence = require('./components/usahot/MiddleV4/Excellence');

class UsaMiddle extends React.Component {

  constructor() {
    super();
    this.state = {
      tabIndex: 0,
      fixed: false,
      rankData: [],
    };
  }
  componentWillMount() {
    UtilNet.generateCookiePKID();
    if (typeof window.removeEventListener !== 'undefined') {
      window.removeEventListener('scroll', this.debounce.bind(this), false);
      // window.removeEventListener('wheel', this.handleScrool.bind(this), false);
    } else {
      window.detachEvent('onscroll', this.debounce.bind(this));
      // window.detachEvent('onmousewheel', this.handleScrool.bind(this));
    }
  }

  componentDidMount() {
    this.fetchData('高中', 300);
    if (typeof window.addEventListener !== 'undefined') {
      // window.addEventListener('scroll', this.handleScrool.bind(this), false);
      window.addEventListener('scroll', this.debounce(this.handleScrool.bind(this), 200).bind(this), false);
    } else {
      window.attachEvent('onscroll', this.debounce(this.handleScrool.bind(this), 200).bind(this));
      // window.attachEvent('onscroll', this.handleScrool.bind(this));
    }
  }
  // 简单的防抖动函数
  debounce(func, wait) {
    // 定时器变量
    let timeout;
    return () => {
        // 每次触发 scroll handler 时先清除定时器
      clearTimeout(timeout);
        // 指定 xx ms 后触发真正想进行的操作 handler
      timeout = setTimeout(func, wait);
    };
  }
  handleScrool() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const tabHeight = this.refs.tab.offsetHeight;
    const basicTop = scrollTop + tabHeight;

    const offersTop = findDOMNode(this.refs.offers).offsetTop;
    const zsgTop = findDOMNode(this.refs.zsg).offsetTop;
    const admitCostTop = findDOMNode(this.refs.admitCost).offsetTop;
    const juryTop = findDOMNode(this.refs.jury).offsetTop;
    const rankTop = findDOMNode(this.refs.rank).offsetTop;
    const questionTop = findDOMNode(this.refs.question).offsetTop;
    const excellenceTop = findDOMNode(this.refs.excellence).offsetTop;
    if (basicTop >= offersTop && basicTop < zsgTop) {
      this.setState({
        tabIndex: 0,
        fixed: true,
      });
    } else if (basicTop >= zsgTop && basicTop < admitCostTop) {
      this.setState({
        tabIndex: 1,
        fixed: true,
      });
    } else if (basicTop >= admitCostTop && basicTop < juryTop) {
      this.setState({
        tabIndex: 2,
        fixed: true,
      });
    } else if (basicTop >= juryTop && basicTop < rankTop) {
      this.setState({
        tabIndex: 3,
        fixed: true,
      });
    } else if (basicTop >= rankTop && basicTop < questionTop) {
      this.setState({
        tabIndex: 4,
        fixed: true,
      });
    } else if (basicTop >= questionTop && basicTop < excellenceTop) {
      this.setState({
        tabIndex: 5,
        fixed: true,
      });
    } else if (basicTop >= excellenceTop) {
      this.setState({
        tabIndex: 6,
        fixed: true,
      });
    } else {
      this.setState({
        tabIndex: 0,
        fixed: false,
      });
    }
  }

  clickToChoose(e, index) {
    const ev = e || window.event;
    ev.preventDefault();
    this.setState({
      tabIndex: index,
    });

    const tabHeight = this.refs.tab.offsetHeight;
    const targetRef = findDOMNode(this.refs[e.target.attributes['data-ref'].value]);
    const targetHeight = targetRef.offsetTop - tabHeight;
    const speed = Math.floor(targetHeight / 800);
    const scrollMove = (scrollTo, count, time) => {
      const scrollFrom = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const every = 10;
      const scrollTop = parseInt(scrollTo, 10);
      time /= every; // eslint-disable-line
      const interval = setInterval(() => {
        count += 1; // eslint-disable-line
        document.body.scrollTop = document.documentElement.scrollTop = (((scrollTop - scrollFrom) / time) * count) + scrollFrom; // eslint-disable-line
        if (count >= time) {
          clearInterval(interval);
        }
      }, every);
    };
    scrollMove(targetHeight, speed, 200);
  }

  fetchData(ids, num) {
    let d;
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/elastic/',
        query: {
          filters: JSON.stringify({
            year: [2016, 2017],
            project: [ids],
            country: ['美国'],
            // school_ordering_range: [0, 1000],
          }),
          // order_by: JSON.stringify(['school__order', 'school__id']),
          page_size: num,
        },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: true,
      success: data => {
        d = data.results;
        this.setState({
          cash: true,
          rankData: d,
        });
      },
    });
    return d;
  }

  render() {
    const { tabIndex, fixed, rankData } = this.state;

    const bannerChildren = (<div className="wd1000 banner-head">
      <div className="yuyue-wraper">
        <Live800 classes={'live800 advisory'} title={'咨询详情'} type={'a'} tips={'活动详情'} />
      </div>
    </div>);
    const juryTitle = (<div>
      <div className="title-top"></div>
      <div className="title">
        <h3>
          <span>常青藤导师指导&nbsp;</span>
          <span className="first">美式申请思维</span>
        </h3>
      </div>
    </div>);
    const RankTitle = (<div>
      <div className="title-top"></div>
      <div className="title">
        <h3>
          <span className="first">美国</span>
          <span>高中排名</span>
        </h3>
      </div>
    </div>);
    const QuestionTitle = (<div>
      <div className="title-top"></div>
      <div className="title">
        <h3>
          <span className="first">常见问题解答</span>
        </h3>
      </div>
    </div>);
    const question = (<div>
      <Question title={QuestionTitle} />
    </div>);

    const bgColor = (<div className="bg-color"></div>);
    return (
      <div id="middlev4">
        <Header />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/middleV4/banner_v4.png`} childrens={bannerChildren} />
        <div className={fixed ? 'table-wrapper tab-fixed' : 'table-wrapper'} ref="tab">
          <ul className="wd1000 tab-list clearfix">
            {
              usaMiddleV4Data.tabnav.map((item, index) =>
                <li className={tabIndex === index ? 'active fl' : 'fl'} data-ref={item.ref} key={item.id} onClick={(e) => this.clickToChoose(e, index)}>{item.name}</li>,
              )
            }
          </ul>
        </div>
        <Offers ref="offers" rankData={rankData} />
        <IntZsg zsgData={usaMiddleV4Data.tabcontent.zsg} ref="zsg" />
        <AdmitCost ref="admitCost" />
        <IntJury juryData={usaMiddleV4Data.tabcontent.jury} title={juryTitle} ref="jury" />
        <SchoolRank schools={usaMiddleV4Data.tabcontent.schoolrank} title={RankTitle} ref="rank" />
        <Banner bg={`${__CDN__}/public/img/usaAllPic/middleV4/question_bg.png`} childrens={question} ref="question" />
        <Excellence majorTabData={majorTabData} ref="excellence" />
        <BotFormData h2title={'和1/5留美学生一起，入读理想学校吧!'} class1="hide" class2="show" class3="hide" class4="hide" queryBtnTitle={'选顺顺  申理想学校'} bgColor={bgColor} />
        <PageInterModals circle={1} time1={5000} time2={5000} time3={600000} ceyiceQudaoDetails={'SEM/美国V4中学PC/弹层/测一测'} baomingQudaoDetail={'SEM/美国V4中学PC/弹层/报名'} />
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国V4中学PC/吸底表单/获得申请方案'} />
        <TestEnroll qudao_details={'SEM/美国V4中学PC/院校排名/测录取率'} h2title={'评估高中录取率'} btnSubmitTitle={'提交'} modelId="middleV4" defaultIam="isMiddle" defaultChoose="middle" />
        <SuccessModal />
      </div>
    );
  }
}

ReactDOM.render(<UsaMiddle />, document.getElementById('app'));
