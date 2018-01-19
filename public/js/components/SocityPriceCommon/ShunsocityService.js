/* eslint global-require: 0, import/no-dynamic-require: 0, no-new: 0, react/no-danger-with-children: 0 */
require('./Socityser.less');
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
    h2: <h2>顺顺留学·靠谱的留学机构</h2>,
    subtitle: '顺顺留学是上市教育集团——“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。',
    subClassTitle1: '留学资质、证书',
    subClassTitle2: '媒体的好评',
    subClassTitle3: '家长的认可',
    mainClass: '',
  };
  static propTypes = {
    h2: PropTypes.element,
    subtitle: PropTypes.string.isRequired,
    subClassTitle1: PropTypes.string,
    subClassTitle2: PropTypes.string,
    subClassTitle3: PropTypes.string,
    mainClass: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      data: [],
      crpData: [],
    };
  }

  componentDidMount() {
    const self = this;
    $('.weixinshow img').each(function () {
      const $this = $(this);
      const img = $this.attr('src');
      self.state.data.push(img);
      self.setState({
        data: self.state.data,
      });
    });
    $('.honor-list img').each(function () {
      const $this = $(this);
      const img = $this.attr('src');
      self.state.crpData.push(img);
      self.setState({
        crpData: self.state.crpData,
      });
    });
  }

  clickImgModal(evt) {
    $('#offer-image').modal('show');
    const idx = $(evt.currentTarget).data('idx');
    $('.carousel-showBigImg').carousel(idx);
  }

  clickImgModalCrp(evt) {
    $('#crp-image').modal('show');
    const idx = $(evt.currentTarget).data('idx');
    $('.carousel-showBigImgCrp').carousel(idx);
  }

  mouseOver(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'block';
  }

  mouseOut(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'none';
  }

  handerClickClose() {
    $('#offer-image').modal('hide');
  }

  handerClickCloseCrp() {
    $('#crp-image').modal('hide');
  }

  handClickShowImg(evt) {
    if ($('.wexinpic').hasClass('hide')) {
      $('.wexinpic').removeClass('hide');
    }
    $(evt.currentTarget).css('display', 'none');
  }

  render() {
    const { data, crpData } = this.state;
    return (
      <div className={`rel1920 ${this.props.mainClass}`}>
        <div className="rel1100">
          <div className="shunsocity-price">
            {this.props.h2}
            <div className="shunsocity-price-subtitle">{this.props.subtitle}</div>
            <div className="shunsocity-linebox" style={{ display: 'none' }}>
              <span>&nbsp;</span>
              <em>{this.props.subClassTitle1}</em>
              <span>&nbsp;</span>
            </div>
            <div className="honor-list clearfix" style={style}>
              {socityData.newServiceData.map((item, index) => {
                return (
                  <div className={`shunts-6 ${index === 2 ? 'end-shunts-6' : ''}`} key={Math.random()} data-idx={index} onClick={evt => this.clickImgModalCrp(evt)}>
                    <p className="showBigpic"><img src={require(`./en-famous-honor-big0${index + 1}.jpg`)} alt="" /></p>
                    <p><span>{item.items}</span></p>
                  </div>
                );
              })}
            </div>
            <div className="hovertext">
              <div className="shunsocity-linebox-tese" style={{ display: 'none' }}>
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
              <div className="shunsocity-linebox-weixin" style={{ display: 'none' }}>
                <span>&nbsp;</span>
                <em>{this.props.subClassTitle3}</em>
                <span>&nbsp;</span>
              </div>
              <div className="weixinlist">
                <div className="weixinshow">
                  {socityData.imgBotWeinxin.map((item, index) => {
                    return (
                      <div className={`wexinpic ${index > 9 ? 'hide' : ''} ${((index === 4) || (index === 9) || (index === 14) || (index === 19) || (index === 24) || (index === 29) ||
                      (index === 34) || (index === 39) || (index === 44) || (index === 49) || (index === 54) || (index === 59) || (index === 64)) ? 'enddiv' : ''}`} key={Math.random()}>
                        <img src={`http://op1szwr44.bkt.clouddn.com/public/img/other/service/service-wx${item.img}.png`} data-idx={index} alt="" onClick={evt => this.clickImgModal(evt)} />
                      </div>
                    );
                  })}
                </div>
                <div className="clickbtnshow" onClick={evt => this.handClickShowImg(evt)}><span></span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="offer-image">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="closeModal" onClick={() => this.handerClickClose()}></div>
              <div id="carousel-example-generic1" className="carousel slide carousel-showBigImg" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  {data.map((item, index) => {
                    return (
                      <div className={`item ${index === 0 ? 'active' : ''}`} key={Math.random()}>
                        <img src={item} alt="" ref="offerImageModal" width="308" height="547" />
                      </div>
                    );
                  })}
                </div>
                <a className="left carousel-control" href="#carousel-example-generic1" role="button" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic1" role="button" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="crp-image">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="closeModal" onClick={() => this.handerClickCloseCrp()}>×</div>
              <div id="carousel-example-generic2" className="carousel slide carousel-showBigImgCrp" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  {crpData.map((item, index) => {
                    return (
                      <div className={`item ${index === 0 ? 'active' : ''}`} key={Math.random()}>
                        <img src={item} alt="" ref="crpImageModal" />
                      </div>
                    );
                  })}
                </div>
                <a className="left carousel-control" href="#carousel-example-generic2" role="button" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic2" role="button" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = SocityShun2;
