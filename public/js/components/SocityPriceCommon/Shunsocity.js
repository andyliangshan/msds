/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('./Socity.less');
const React = require('react');

const PropTypes = React.PropTypes;

const socityData = require('../../components/SocityPriceCommon/socityData.json');

/**
 * 通过传值class参数来显示和隐藏页面的模块
 * @type {{show: string, hide: string}}
 */
const showHideModel = {
  show: 'show',
  hide: 'hide',
};
class SocityShun extends React.Component {

  /**
   * 静态h2,以及附标题的内容
   * @param h2 主级标题
   * @param subtitle 副级标题
   */
  static propTypes = {
    h2: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    class1: PropTypes.string,
    class2: PropTypes.string,
  };

  mouseOver(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'block';
  }

  mouseOut(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'none';
  }

  render() {
    const showHide0 = showHideModel[this.props.class1];
    const showHide1 = showHideModel[this.props.class2];
    return (
      <div className="rel1920">
        <div className="rel1100">
          <div className="shunsocity-price">
            <h2>{this.props.h2}</h2>
            <div className="shunsocity-price-subtitle">{this.props.subtitle}</div>
            <div className={`service-list ${showHide0}`}>
              {socityData.serviceData.map((item, index) => {
                return (
                  <div className={`shunt-6 ${index === 3 ? 'end-shunt-6' : ''}`} key={Math.random()}>
                    <p><img src={require(`./common-bot${index + 1}.png`)} alt="" /></p>
                    <p><span dangerouslySetInnerHTML={{ __html: item.item1 }}></span><span dangerouslySetInnerHTML={{ __html: item.item2 }}></span></p>
                  </div>
                );
              })}
            </div>
            <div className={`honor-list ${showHide1}`}>
              {socityData.serviceSpeicalData.map((item, index) => {
                return (
                  <div className={`shunts-6 ${index === 2 ? 'end-shunts-6' : ''}`} key={Math.random()}>
                    <p className="showBigpic"><img src={require(`./en-famous-honor-big0${index + 1}.jpg`)} alt="" /></p>
                    <p><span>{item.items}</span></p>
                  </div>
                );
              })}
            </div>
            <div className="hovertext">
              {socityData.hovertextData.map((item, index) => {
                return (
                  <div key={Math.random()} className={`meitilist piv0${index + 1} ${(index === 4 || index === 9) ? 'enddiv' : ''}`} onMouseEnter={evt => this.mouseOver(evt, index)} onMouseLeave={evt => this.mouseOut(evt, index)}>
                    <h3 ref={`desc${index}`} className="footer-media">{item.h3text}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

}
module.exports = SocityShun;
