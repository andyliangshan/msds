/**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

class IntInfo extends React.Component {

  render() {
    return (
      <div className="info">
        <div className="servicestudent-box wd1000">
          <div className="servicestudent-img"><img src={`${__CDN__}/public/img/usaAllPic/zhaosg/activity-imgs.png`} alt="" /></div>
          <div className="servicestudent-con">
            <div className="servicestudent-title">原创、有效活动，提高录取率</div>
            <div className="servicestudent-desc">
              <p>
                <i>顺顺专为中学生定制了</i>
                <Live800 classes={'live800 blue'} title={'美国国会实习'} type={'a'} tips={'美国国会实习'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'哈佛耶鲁实验室项目'} type={'a'} tips={'哈佛耶鲁实验室项目'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'名校影响力训练营'} type={'a'} tips={'名校影响力训练营'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'国际期刊论文发表'} type={'a'} tips={'国际期刊论文发表'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'500强实习'} type={'a'} tips={'500强实习'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'机器人训练营'} type={'a'} tips={'机器人训练营'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'夏威夷志愿者'} type={'a'} tips={'夏威夷志愿者'} /><i>、</i>
                <i>等活动，从领导力、科研能力、论文能力、社会责任感等更方面设置活动，更加符合美国院校的录取要求，提高录取率！</i>
              </p>
            </div>
            <div className="servicestudent-subcon">具体活动的时间、费用、剩余名额不同，请咨询获取</div>
            <div className="servicestudent-btn">
              <Live800 classes={'live800 blue'} title={'咨询活动详情'} type={'a'} tips={'咨询活动详情'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = IntInfo;
