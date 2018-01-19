/**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');

const PropTypes = React.PropTypes;

class IntOffers extends React.Component {

  static propTypes = {
    bData: PropTypes.array,
  };

  render() {
    const { bData } = this.props;
    return (
      <div className="offers wd1000">
        <div className="schoolrank-list">
          <div className="schoolrank-list-header">
            <span className="first">顺顺名校录取榜</span>
            <span className="second">只给你最满意的结果</span>
          </div>
          <div className="schoolrank-wraper">
            <div className="schoolrank-list-body">
              {bData.map((item) =>
                <div className="schoolrankrow row" key={Math.random()}>
                  <div className="col-xs-2 ranknum">{item.student.name}</div>
                  <div className="col-xs-3 schoolname">{item.school.chinese_name}</div>
                  <div className="col-xs-1 location">{item.project}</div>
                  <div className="col-xs-3 enroll">
                    {item.student.exams.length ? item.student.exams.map((v) => {
                      return (<em key={Math.random()}>{v.exam_type} : {v.score || '暂无'}</em>);
                    }) : <em key={Math.random()}>暂无</em>}
                  </div>
                  {item.student.educational_history.length ?
                    item.student.educational_history.map((iv, inIndex) => {
                      return (
                        <div className="col-xs-3 conditionfee" key={Math.random()}>
                          {inIndex === 0 ? <div>{iv.school || '暂无'}</div> : <div>{iv.school || '暂无'}</div>}
                        </div>
                      );
                    }) : <div className="col-xs-3 conditionfee">暂无</div>}
                </div>,
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = IntOffers;
