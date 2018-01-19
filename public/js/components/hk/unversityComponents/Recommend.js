const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class Recommend extends React.Component {
  static defaultProps = {
    schoolname: '香港大学',
  }
  static propTypes = {
    schoolname: PropTypes.string.isRequired,
    position: PropTypes.object,
  }
  render() {
    const { schoolname, position } = this.props;
    return (
      <div className="content-common recommend">
        <div className="condition wd1000">
          <div className="title">
            <h3>
              <span className="title-name">{schoolname}</span>
              <span className="title-desc">热门大学推荐</span>
            </h3>
            <div className="title-icon">
              <img src={`${__CDN__}/public/img/hk/v1/university/icon_title.png`} alt="" />
            </div>
          </div>
          <div className="recommend-info clearfix">
            <ul className="profession-img fl" style={{ ...position }}>
              <li><Live800 classes={'live800 live-case'} title={''} type={'a'} tips={''} /></li>
              <li><Live800 classes={'live800 live-case'} title={''} type={'a'} tips={''} /></li>
              <li><Live800 classes={'live800 live-case'} title={''} type={'a'} tips={''} /></li>
              <li><Live800 classes={'live800 live-case'} title={''} type={'a'} tips={''} /></li>
              <li><Live800 classes={'live800 live-case'} title={''} type={'a'} tips={''} /></li>
              <li><Live800 classes={'live800 live-case'} title={''} type={'a'} tips={''} /></li>
            </ul>
            <div className="recomend-info fl">
              <div className="content">
                <h4>本科选专业时间</h4>
                <p>本科申请比研究生需要提前一些</p>
                <p>一般在<span className="time">5月</span>接受下一年秋季入学的申请。面试安排于<span className="time">6月中旬</span>在网上公布。<span className="time">7月初</span>公布录取名单</p>
              </div>
              <div className="content master">
                <h4>研究生选专业时间</h4>
                <p>研究生选择适合的项目，进行申请</p>
                <p>一般在<span className="time">9月</span>接受下一年秋季入学的申请，次年 2月底左右结束，部分院校会接受延期申请</p>
                <p><span className="time">授课式硕士的录取一般是 先申请先录取，录满为止</span></p>
                <p>水平条件相当的2位学生，会录取第一位，而后者最多只能加入到候选名单中，因此顺顺老师学生能建议尽早申请</p>
              </div>
              {/* <div className="live-recomend">更多专业咨询</div> */}
              <Live800 classes={'live800 live-recomend'} title={'更多专业咨询'} type={'a'} tips={'更多专业咨询'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Recommend;
