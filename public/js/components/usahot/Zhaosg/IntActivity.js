/**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');
const Live800 = require('../../../components/Live800/Live800');
const Yuyue = require('../../../components/Yuyue/Yuyue2');

const PropTypes = React.PropTypes;

class IntActivity extends React.Component {

  static propTypes = {
    activityData: PropTypes.array,
  };

  render() {
    const { activityData } = this.props;
    return (
      <div className="activity-wraper">
        <div className="activity wd1000">
          <div className="title">
            <h3 className="first">全国10城巡回分享，抓住身边的机会</h3>
          </div>
          <div className="intro">
            <h4>活动内容</h4>
            <ul className="intro-list clearfix">
              <li className="fl">★&nbsp;20年招生经验案例解读</li>
              <li className="fl">★&nbsp;针对申请2018年秋季学生建议</li>
              <li className="fl">★&nbsp;为2019-2020年申请学生，提供长期规划建议</li>
              <li className="fl mr0">★&nbsp;开发10个黄金席位一对一评审</li>
            </ul>
          </div>
          <ul className="cities clearfix">
            {
              activityData.map((item, index) =>
                <li key={Math.random()} className={(index + 1) % 5 === 0 ? 'fl mr0' : 'fl'}>
                  <div className="masked"></div>
                  <div className="text">
                    <div className="city">
                      <strong>{item.city}</strong>
                    </div>
                  </div>
                  <Live800 classes={'live800 all-live'} title={''} type={'a'} tips={'活动详情'} />
                </li>,
              )
            }
          </ul>
          <div className="yuyue-wraper">
            <Yuyue qudao_details={'SEM/美国招生官PC/活动介绍/报名活动'} btnTitle={'报名活动'} wrapModalTitle={'活动报名表'} submitBtn={'提交'} />
            <Live800 classes={'live800 advisory'} title={'咨询当地活动详情'} type={'a'} tips={'活动详情'} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = IntActivity;
