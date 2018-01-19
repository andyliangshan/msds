/* eslint global-require: 0, import/no-dynamic-require: 0, no-new: 0, react/no-danger-with-children: 0 */
require('./Socityser.less');
require('../../../libs/bootstrap/js/carousel');

const React = require('react');

const PropTypes = React.PropTypes;

const socityData = require('../../components/SocityPriceCommon/socityData.json');
const Live800 = require('../../components/Live800/Live800');

const style = {
  display: 'block',
};
class SocityShun2 extends React.Component {
  /**
   * 静态h2,以及附标题的内容
   * @param h2 主级标题
   * @param subtitle 副级标题
   */
  static defaultProps = {
    h2: '顺顺留学·靠谱的留学机构',
    subtitle: '顺顺留学是上市教育集团——“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。',
    mainClass: '',
    bg: PropTypes.string.isRequired,
  };
  static propTypes = {
    h2: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    mainClass: PropTypes.string,
    bg: PropTypes.string.isRequired,
  };

  mouseOver(evt, index) {
    evt.preventDefault();
    const target = `desc${index}`;
    this.refs[target].style.display = 'block';
  }

  mouseOut(evt, index) {
    evt.preventDefault();
    const target = `desc${index}`;
    this.refs[target].style.display = 'none';
  }

  render() {
    const bgImg = `url(${this.props.bg}) no-repeat center top`;

    return (
      <div className={`rel1920 ${this.props.mainClass}`}>
        <div className="rel1100">
          <div className="shunsocity-price" style={{ width: '1000px', marginBottom: '10px', padding: '50px 0 10px' }}>
            <div className="shunshun" style={{ background: bgImg }}>
              <Live800 classes={'live800 live8001'} title={'咨询专业顾问'} type={'a'} tips={'咨询专业顾问'} />
              <div className="links"><Live800 classes={'live800 live8002'} title={''} type={'a'} tips={''} /></div>
            </div>
            <h2>{this.props.h2}</h2>
            <div className="shunsocity-price-subtitle">{this.props.subtitle}</div>
            <div className="honor-list" style={style}>
              {socityData.newServiceData.map((item, index) => {
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
module.exports = SocityShun2;
