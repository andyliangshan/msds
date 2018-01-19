/* eslint-disable no-param-reassign */
const React = require('react');
// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const C = require('../../../core/conf');

const PropTypes = React.PropTypes;

const Live800 = require('../../../components/Live800/Live800');
const TestEnroll = require('../../../components/TestEnroll/TestEnroll');

require('./rank.less');

class Rank extends React.Component {
  static defaultProps = {
    rankData: [],
  }

  static propTypes = {
    rankData: PropTypes.array.isRequired,
    showCase: PropTypes.bool,
    clickShowCase: PropTypes.func,
    rankCaseIndex: PropTypes.any,
    rankIndex: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCase: false,
      cases: '',
      schoolname: '',
    };
  }

  hoverNavBar(index) {
    const thisItem = this.refs[`caselist${index}`];
    if (this.state.caseIndex !== index) {
      $(thisItem).addClass('hover-case');
    }
  }

  leaveNavBar(index) {
    const thisItem = this.refs[`caselist${index}`];
    $(thisItem).removeClass('hover-case');
  }

  enterCase(index, name) {
    this.setState({
      schoolname: name,
    }, this.detailMove);
    this.props.clickShowCase(index);
    this.fetchData(name);
  }

  detailMove() {
    $('#rankBox').animate({ width: '705px' });
    $('#caseDetail').animate({ right: '0px' });
  }

  fetchData(school, asy = false) {
    let d;
    // const { case } = this.state;
    const self = this;
    const obj = {
      offer_school: school,
      country: '美国',
    };
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/elastic/',
        query: {
          filters: JSON.stringify(obj),
          page_size: 3,
        },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: asy,
      success: data => {
        const res = data.results.slice(0, 3);
        d = res;
        self.setState({
          cases: res,
        });
      },
    });
    return d;
  }

  render() {
    const { cases, schoolname } = this.state;
    const { showCase, rankData, rankCaseIndex, rankIndex } = this.props;
    return (
      <div className="usaV4H1-rank clearfix">
        <div className={showCase ? 'rank-wraper shorten-width' : 'rank-wraper'} id="rankBox">
          <div className="rank-head">
            <div className="rank-title fl">排名</div>
            <div className="rank-name fl">名称</div>
            <div className="rank-offer fl">录取</div>
            <div className="rank-shun fl">顺顺案例</div>
          </div>
          <div className="rankbody-box">
            <ul className="rank-body">
              {
                rankData && rankData.map((item, index) =>
                  <li key={item.id}>
                    <div className={[item.ranking === '1' && 'rank-first', item.ranking === '2' && 'rank-second', item.ranking === '3' && 'rank-third', 'rank-title one fl'].join(' ')}>{item.ranking}</div>
                    <div className="rank-name two fl">
                      <strong>{item.name}</strong>
                      <span>{item.enname}</span>
                    </div>
                    <div className="rank-offer three fl">
                      {/* <a className="contrast rank-test">测录取率</a> */}
                      <TestEnroll propsBtnTitle="测录取率" propsBtnClass="contrast rank-test" defaultIam="本科生" defaultProject="硕士" qudao_details="SEM/美国V4聚合页_1PC/排名/测试录取率" />
                      <Live800 classes={'live800 contrast'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
                    </div>
                    <div className="rank-shun four fl">
                      {
                        rankIndex !== 1 ?
                          <div className={rankCaseIndex === index ? 'shun-inner detail-active' : 'shun-inner'}
                            ref={`caselist${index}`}
                            onClick={() => this.enterCase(index, item.name, item.id)}
                            onMouseEnter={() => this.hoverNavBar(index)}
                            onMouseLeave={() => this.leaveNavBar(index)}>查看案例</div> :
                          <div className="'shun-inner">-</div>
                      }
                    </div>
                  </li>,
              )}
            </ul>
          </div>
        </div>
        <div className="case-detail" id="caseDetail">
          <div className="case-title">{schoolname}相关录取案列</div>
          <div className="case-info">
            {
              cases.length > 0 ? cases.map((item) =>
                <div className="each-case" key={item.id}>
                  <div className="case-name">{item.student.name}</div>
                  <div className="case-profession">{item.school.chinese_name}&nbsp;{item.major_detail}</div>
                  <div className="case-score">
                    {item.student.exams.length > 0 && item.student.exams.map((exam, index) =>
                      <span key={exam.id}>{exam.exam_type}&nbsp;{exam.score}{index !== (item.student.exams.length - 1) && '，'}</span>,
                    )}
                  </div>
                  <div className="case-school">毕业院校：{item.student.educational_history.length > 0 ? item.student.educational_history[0].school : '暂无'}</div>
                  <div className="case-advisor">顾问：
                    {item.student.advisor.user_name ?
                      <Live800 classes={'live800 contrast'} title={item.student.advisor.user_name} type={'a'} tips={item.student.advisor.user_name} /> :
                      <span className="advisor-name">暂无</span>
                    }</div>
                </div>,
              ) :
              <div className="each-case">
                <div className="no-case">
                  <p>很抱歉，未找到该校相关案例！</p>
                  <p>请换个学校试试</p>
                </div>
              </div>
            }
            <div className="case-contrast">
              <Live800 classes={'live800 contrast'} title="更多案例>>" type={'a'} tips="更多案例>>" />
            </div>
          </div>
        </div>
        {/* <ReactCSSTransitionGroup
          transitionName={{
            enter: 'enter',
            enterActive: 'enterActive',
            leave: 'leave',
            leaveActive: 'leaveActive',
          }}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>

        </ReactCSSTransitionGroup> */}
      </div>
    );
  }
}

module.exports = Rank;
