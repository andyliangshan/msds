const React = require('react');

require('./offers.less');

const PropTypes = React.PropTypes;
class Activity extends React.Component {
  static propTypes = {
    offersData: PropTypes.array,
    title: PropTypes.string,
  };
  static defaultProps = {
    title: '2017英国商科录取案例（持续更新中 ...）',
  };

  render() {
    const { offersData, title } = this.props;
    return (
      <div className="schoolrank-list">
        <div className="schoolrank-list-header">{title}</div>
        <div className="list-wraper">
          <div className="schoolrank-list-body">
            {offersData.map((item) =>
              <div className="schoolrankrow row" key={Math.random()}>
                <div className="col-xs-2 ranknum">{item.name}</div>
                <div className="col-xs-3 schoolname">{item.chinese_name}</div>
                <div className="col-xs-1 location">{item.project}</div>
                <div className="col-xs-3 enroll">
                  {item.exams.length ? item.exams.map((v) => {
                    return (<em key={Math.random()}>{v.exam_type} : {v.score || '暂无'}</em>);
                  }) : <em key={Math.random()}>暂无</em>}
                </div>
                <div className="col-xs-3 conditionfee">{item.school_name}</div>
              </div>,
            )}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Activity;
