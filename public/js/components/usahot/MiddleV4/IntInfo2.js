const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

require('./intInfo2.less');

const PropTypes = React.PropTypes;
class IntInfo2 extends React.Component {
  static defaultProps = {
    imgSrc: `${__CDN__}/public/img/usaAllPic/zhaosg/activity-imgs.png`,
  }
  static propTypes = {
    imgSrc: PropTypes.string,
  }
  render() {
    const { imgSrc } = this.props;
    return (
      <div className="info">
        <div className="servicestudent-box wd1000">
          <div className="servicestudent-img"><img src={imgSrc} alt="" /></div>
          <div className="servicestudent-con">
            <div className="servicestudent-title">线上+线下留学，互联网留学更专业省时</div>
            <div className="servicestudent-desc">
              <p className="first-desc">线上：留学全程实现线上操作，避免双方的来回奔波，更为异地学生提供了高质量的资源</p>
              <p>
                <i>线下：顺顺在全国设有16家分校，</i>
                <Live800 classes={'live800 blue'} title={'北京'} type={'a'} tips={'北京'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'深圳'} type={'a'} tips={'深圳'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'上海'} type={'a'} tips={'上海'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'成都'} type={'a'} tips={'成都'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'西安'} type={'a'} tips={'西安'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'重庆'} type={'a'} tips={'重庆'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'厦门'} type={'a'} tips={'厦门'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'长沙'} type={'a'} tips={'长沙'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'济南'} type={'a'} tips={'济南'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'郑州'} type={'a'} tips={'郑州'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'天津'} type={'a'} tips={'天津'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'南京'} type={'a'} tips={'南京'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'青岛'} type={'a'} tips={'青岛'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'广州'} type={'a'} tips={'广州'} /><i>、</i>
                <Live800 classes={'live800 blue'} title={'宁波'} type={'a'} tips={'宁波'} />
                <i>等城市均有门店</i>
              </p>
            </div>
            <div className="servicestudent-btn">
              <Live800 classes={'live800 blue'} title={'咨询活动详情'} type={'a'} tips={'咨询活动详情'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = IntInfo2;
