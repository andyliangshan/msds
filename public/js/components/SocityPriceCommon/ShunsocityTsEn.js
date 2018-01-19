/* eslint global-require: 0, import/no-dynamic-require: 0, no-new: 0, react/no-danger-with-children: 0 */
require('./Socity.less');
require('../../../libs/bootstrap/js/carousel');

const React = require('react');

const PropTypes = React.PropTypes;

const socityData = require('../../components/SocityPriceCommon/socityData.json');

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
    h2: '顺顺是一个靠谱的留学机构么？',
    subtitle: '顺顺留学是上市教育集团 —“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。',
    subClassTitle1: '留学资质、证书',
    subClassTitle2: '媒体的好评',
    subClassTitle3: '家长的认可',
    mainClass: '',
  };
  static propTypes = {
    h2: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    subClassTitle1: PropTypes.string,
    subClassTitle2: PropTypes.string,
    subClassTitle3: PropTypes.string,
    mainClass: PropTypes.string,
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
    return (
      <div className={`rel1920 ${this.props.mainClass}`}>
        <div className="rel1100">
          <div className="shunsocity-price">
            <h2>{this.props.h2}</h2>
            <div className="shunsocity-price-subtitle">{this.props.subtitle}</div>
            <div className="shunsocity-linebox">
              <span>&nbsp;</span>
              <em>{this.props.subClassTitle1}</em>
              <span>&nbsp;</span>
            </div>
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
              <div className="shunsocity-linebox-tese">
                <span>&nbsp;</span>
                <em>{this.props.subClassTitle2}</em>
                <span>&nbsp;</span>
              </div>
              {socityData.hovertextData.map((item, index) => {
                return (
                  <div key={Math.random()} className={`meitilist piv0${index + 1} ${(index === 4 || index === 9) ? 'enddiv' : ''}`} onMouseEnter={evt => this.mouseOver(evt, index)} onMouseLeave={evt => this.mouseOut(evt, index)}>
                    <h3 ref={`desc${index}`} className="footer-media">{item.h3text}</h3>
                  </div>
                );
              })}
            </div>
            <div className="weixin">
              <div className="shunsocity-linebox-weixin">
                <span>&nbsp;</span>
                <em>{this.props.subClassTitle3}</em>
                <span>&nbsp;</span>
              </div>
              <div className="col-xs-12 activity-wrap swiper-container">
                <div className="activity-info activity-info-et2 swiper-wrapper" dangerouslySetInnerHTML={{
                  __html: `
                    <div class="row">
                      <div id="carousel-example-generic" class="carousel slide carousel-img" data-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                          <div class="item active">
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-1.png" data-idx="0" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-2.png" data-idx="1" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-3.png" data-idx="2" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-4.png" data-idx="3" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-5.png" data-idx="4" ></span>
                          </div>
                          <div class="item">
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-6.png" data-idx="5" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-7.png" data-idx="6" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-8.png" data-idx="7" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-9.png" data-idx="8" ></span>
                            <span><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/schoolranking/en-offer-10.jpg" data-idx="9" ></span>
                          </div>
                        </div>
                        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                          <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                          <span class="sr-only">Next</span>
                        </a>
                      </div>
                    </div>
                  ` }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = SocityShun2;
