const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

require('./activity.less');

class Activity extends React.Component {

  render() {
    return (
      <div className="activity">
        <h3>背景活动·为简历加分，更高名校录取</h3>
        <div className="servicestudent-box">
          <div className="servicestudent-img"><img src={`${__CDN__}/public/img/usaAllPic/zhaosg/activity-imgs.png`} alt="" /></div>
          <div className="servicestudent-con">
            <div className="servicestudent-title">原创、有效活动，提高录取率</div>
            <div className="servicestudent-desc">
              <p>
                <i>专为商科专业定制，如</i>
                <Live800 classes={'live800 blue'} title={'剑桥耶鲁实验室项目'} type={'a'} tips={'剑桥耶鲁实验室项目'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'国际期刊论文发表'} type={'a'} tips={'国际期刊论文发表'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'500强实习'} type={'a'} tips={'500强实习'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'机器人训练营'} type={'a'} tips={'机器人训练营'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'发明专利申请'} type={'a'} tips={'发明专利申请'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'马尔代夫志愿者'} type={'a'} tips={'马尔代夫志愿者'} /><i>、</i>
                <i>等活动，从领导力、论文能力、专业技能等更方面设置活动，更加符合英国录取的要求，提高录取率！</i>
              </p>
            </div>
            <div className="servicestudent-subcon">具体活动的时间、费用、剩余名额不同，请咨询获取</div>
            <div className="servicestudent-btn">
              <Live800 classes={'live800 blue'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Activity;
