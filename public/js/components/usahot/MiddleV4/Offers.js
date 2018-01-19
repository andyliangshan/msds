const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class Offers extends React.Component {

  static propTypes = {
    rankData: PropTypes.array,
  };

  render() {
    const { rankData } = this.props;
    return (
      <div className="offers wd1000" id="offers">
        <div className="title-top"></div>
        <div className="title">
          <h3>
            <span className="first">顺顺-</span>
            <span>美国中学最新录取捷报</span>
          </h3>
          <div className="small-title">持续更新中......</div>
        </div>
        <div className="offers-list">
          <div className="list-head clearfix">
            <div className="fl head1">录取院校</div>
            <div className="fl head2">学生</div>
            <div className="fl head3">基本成绩</div>
            <div className="fl head4">院校背景</div>
          </div>
          <ul className="list-body" >
            {
              rankData && rankData.map(item =>
                <li className="clearfix" key={item.id}>
                  <div className="fl body1">{item.school.chinese_name}</div>
                  <div className="fl body2">{item.student.name}</div>
                  <div className="fl body3">
                    {
                      item.student.exams.length > 0 ?
                      item.student.exams.map(info =>
                        <span key={info.id}>{info.exam_type}:{info.score}&nbsp;&nbsp;</span>,
                      ) : <span>暂无</span>
                    }
                  </div>
                  <div className="fl body4">
                    {
                      item.student.educational_history.length > 0 ?
                        item.student.educational_history.map(info =>
                          <span key={info.id}>{info.school}</span>,
                        ) : <span>暂无</span>
                    }
                  </div>
                </li>,
              )
            }
          </ul>
        </div>
        <div className="live800-wraper">
          <Live800 classes={'live800 middlev4-live'} title={'立即咨询'} type={'a'} tips={'立即咨询'} />
        </div>
      </div>
    );
  }

}

module.exports = Offers;
