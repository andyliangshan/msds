const React = require('react');

require('./offers.less');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

const style = {
  background: 'none',
  textAlign: 'center',
};
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
                <div className="col-xs-1 ranknum">{item.name}</div>
                <div className="col-xs-2 location">{item.country}·{item.project}</div>
                <div className="col-xs-3 schoolname" style={style}>{item.chinese_name}</div>
                <div className="col-xs-3 scholarship">{item.scholarship}{item.scholarship_currency}</div>
                <div className="col-xs-2 visitor">{item.advisor.user_name}老师</div>
                <div className="col-xs-1 querybtns"><Live800 classes={'live800'} title={'咨询Ta'} type={'a'} tips={'咨询Ta'} /></div>
              </div>,
            )}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Activity;
