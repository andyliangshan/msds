const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class Question extends React.Component {
  static propTypes = {
    title: PropTypes.node,
  };
  render() {
    const { title } = this.props;
    return (
      <div className="question-wrapper" id="question">
        <div className="question wd1000">
          {title}
          <div className="left fl">
            <div className="q-item">
              <h4 className="q-title">
                <span className="q-num">01</span>
                <span>去美国读初中，到底要花多少钱？</span>
              </h4>
              <p className="q-desc">
                <span>美国私立中学分为私立寄宿和私立走读。私立寄宿学校的学生住在学校宿舍，基本上只需要缴纳学费和住宿费，以及其他的杂费，每年在45000~60000美金不等，有的学校还需要学生额外缴纳ESL语言的费用，大约是3000~6000美金。私立走读学校的学生...</span>
                <Live800 classes={'live800 q-live800'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
              </p>
            </div>
            <div>
              <h4 className="q-title">
                <span className="q-num">02</span>
                <span>送孩子去美国读中学，如何确保孩子的安全？</span>
              </h4>
              <p className="q-desc">
                <span>（1）查看安全统计数据根据联邦法律，所有的美国学校必须披露校园犯罪的统计数字，包括强奸、凶杀、抢劫和纵火的案件数字。你也许可以发现这些信息在学校网站的某处贴着，或者这些信息可以通过教育部的在线“校园安全和安全数据分析工具”来查看。… </span>
                <Live800 classes={'live800 q-live800'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
              </p>
            </div>
          </div>
          <div className="right fr">
            <div className="q-item">
              <h4 className="q-title">
                <span className="q-num">03</span>
                <span>如何为孩子选择一所合适的中学？</span>
              </h4>
              <p className="q-desc">
                <span>（1）地理位置</span>
                <span>地理位置的确定，通常会根据家长的愿望和朋友圈来做确定。一般来说，美国的东部和西部比较繁荣，交通方便，文化底蕴深厚，学校也较多，这是家长和学生多数选择的地域。但费用也相对较贵，通常在5万美金&nbsp;</span>
                <Live800 classes={'live800 q-live800'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
              </p>
            </div>
            <div>
              <h4 className="q-title">
                <span>更多问题咨询</span>
              </h4>
              <div className="q-desc">
                <p><Live800 classes={'live800 q-live'} title={'寄宿中学与走读中学申请的难易程度对比，成功率如何?'} type={'a'} tips={'咨询详情'} /></p>
                <p><Live800 classes={'live800 q-live'} title={'什么样的学生适合寄宿中学0R走读中学？'} type={'a'} tips={'咨询详情'} /></p>
                <p><Live800 classes={'live800 q-live'} title={'融入美国高中生活有哪些方法？'} type={'a'} tips={'咨询详情'} /></p>
                <p><Live800 classes={'live800 q-live'} title={'美国高中都有哪些课外活动？'} type={'a'} tips={'咨询详情'} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Question;
