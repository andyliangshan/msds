/**
 * Created by '苏萧' on 2017/7/27.
 */
const React = require('react');
const Yuyue = require('../../../components/Yuyue/Yuyue2');
const Live800 = require('../../../components/Live800/Live800');

class ZsgMari extends React.Component {

  render() {
    return (
      <div className="mit">
        <div className="heliang wd1000 clearfix">
          <div className="words fr">
            <div className="title">来吧！先试试你的想法能不能打动我？</div>
            <div className="yuyue">
              <Yuyue qudao_details={'SEM/美国招生官PC/小banner/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} />
            </div>
            <div className="sanjiao-right"></div>
            <Live800 classes={'live800 all-live'} title={''} type={'a'} tips={'活动详情'} />
          </div>
          <div className="boss fl">
            <div className="img">
              <img src={`${__CDN__}/public/img/usaAllPic/zhaosg/head-marisa.png`} alt="" />
              <Live800 classes={'live800 all-live'} title={''} type={'a'} tips={'活动详情'} />
            </div>
            <div className="info">
              <h4>Marisa</h4>
              <strong>耶鲁大学&MIT前招生官</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ZsgMari;
