/**
 * Created by '苏萧' on 2017/7/27.
 */
const React = require('react');
const Yuyue = require('../../../components/Yuyue/Yuyue2');
const Live800 = require('../../../components/Live800/Live800');

class HeLiang extends React.Component {

  render() {
    return (
      <div className="heliang wd1000 clearfix">
        <div className="words fl">
          <div className="title">招生官指导申请，这绝对是你的最佳机会！</div>
          <div className="yuyue">
            <Yuyue qudao_details={'SEM/美国招生官PC/小banner/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} />
          </div>
          <div className="sanjiao-right"></div>
          <Live800 classes={'live800 all-live'} title={''} type={'a'} tips={'活动详情'} />
        </div>
        <div className="boss fr">
          <div className="img">
            <img src={`${__CDN__}/public/img/usaAllPic/zhaosg/head-hl.png`} alt="" />
            <Live800 classes={'live800 all-live'} title={''} type={'a'} tips={'活动详情'} />
          </div>
          <div className="info">
            <h4>何亮</h4>
            <strong>哈佛大学前招生委员</strong>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = HeLiang;
