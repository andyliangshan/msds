/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('./Socity.less');
const React = require('react');

const socityData = require('../../components/SocityPriceCommon/socityData.json');

const style = {
  display: 'block',
};

class NewSocityShun extends React.Component {

  mouseOver(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'block';
  }

  mouseOut(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'none';
  }

  render() {
    return (
      <div className="rel1920">
        <div className="rel1100">
          <div className="shunsocity-price">
            <h4 className="h4-title"><span></span><p>教育部留学资质认证，媒体好评</p><span></span></h4>
            <div className="service-list" style={style}>
              {socityData.serviceData.map((item, index) => {
                return (
                  <div className={`shunt-6 ${index === 3 ? 'end-shunt-6' : ''}`} key={Math.random()}>
                    <p className="p01"><img src={require(`./common-bot${index + 1}.png`)} alt="" /></p>
                    <p><span dangerouslySetInnerHTML={{ __html: item.item1 }}></span><span dangerouslySetInnerHTML={{ __html: item.item2 }}></span></p>
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
module.exports = NewSocityShun;
