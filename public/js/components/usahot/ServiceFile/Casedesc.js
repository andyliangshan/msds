/**
 * Created by andy on 17/8/16.
 */
const React = require('react');

const Live800 = require('../../../components/Live800/Live800');

class Casedesc extends React.Component {

  render() {
    return (
      <div className="casedesc">
        <div className="casedata">
          <div className="casedata-img"><img src={require('../../../../../public/img/other/service/service-unline1.png')} alt="" /></div>
          <div className="casedata-desc">
            <div className="casedata-desc-title">线上+线下留学，互联网留学更专业省时</div>
            <div className="casedata-desc-text">
              <p>线上：留学全程实现线上操作，避免双方的来回奔波，更为异地学生提供了高质量的资源</p>
              <p><em className="em1">线下：</em><em className="em2">顺顺在全国设有16家分校，<Live800 classes={'live800 live8001'} title={'北京'} type={'a'} tips={'北京'} />、
                <Live800 classes={'live800 live8001'} title={'深圳'} type={'a'} tips={'深圳'} />、
                <Live800 classes={'live800 live8001'} title={'上海'} type={'a'} tips={'上海'} />、
                <Live800 classes={'live800 live8001'} title={'成都'} type={'a'} tips={'成都'} />、
                <Live800 classes={'live800 live8001'} title={'西安'} type={'a'} tips={'西安'} />、
                <Live800 classes={'live800 live8001'} title={'重庆'} type={'a'} tips={'重庆'} />、
                <Live800 classes={'live800 live8001'} title={'厦门'} type={'a'} tips={'厦门'} />、
                <Live800 classes={'live800 live8001'} title={'长沙'} type={'a'} tips={'长沙'} />、
                <Live800 classes={'live800 live8001'} title={'济南'} type={'a'} tips={'济南'} />、
                <Live800 classes={'live800 live8001'} title={'郑州'} type={'a'} tips={'郑州'} />、
                <Live800 classes={'live800 live8001'} title={'天津'} type={'a'} tips={'天津'} />、
                <Live800 classes={'live800 live8001'} title={'南京'} type={'a'} tips={'南京'} />、
                <Live800 classes={'live800 live8001'} title={'青岛'} type={'a'} tips={'青岛'} />、
                <Live800 classes={'live800 live8001'} title={'广州'} type={'a'} tips={'广州'} />、
                <Live800 classes={'live800 live8001'} title={'宁波'} type={'a'} tips={'宁波'} />、
                <Live800 classes={'live800 live8001'} title={'青岛'} type={'a'} tips={'青岛'} />等城市均有门店</em></p>
            </div>
            <div className="casedata-desc-query"><Live800 classes={'live800 live8001'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
          </div>
        </div>
        <div className="casedata">
          <div className="casedata-img"><img src={require('../../../../../public/img/other/service/service-unline2.png')} alt="" /></div>
          <div className="casedata-desc casedata-desc-tesu">
            <div className="casedata-desc-title">为每个家庭提供专业服务，不满意闪电退款</div>
            <div className="casedata-desc-text">
              <p>很多机构退款周期高达半年到一年，种种理由拖来拖去，交钱容易退钱难</p>
              <p>顺顺若出现顾问服务不周，或其他符合退条件的情况下，<i>先替顾问赔付</i>，在15天之内退款到账</p>
            </div>
            <div className="casedata-desc-query"><Live800 classes={'live800 live8001'} title={'咨询详情'} type={'a'} tips={'咨询详情'} /></div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Casedesc;
