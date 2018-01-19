/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('../../usahot/OfferPrice/OfferPrice.less');
const React = require('react');
const Live800 = require('../../../components/Live800/Live800');
const offerData = require('../../../components/usahot/OfferPrice/offerData.json');


class OfferPrice extends React.Component {

  handMouseOver(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'block';
  }

  handMouseOut(evt, index) {
    const target = `desc${index}`;
    this.refs[target].style.display = 'none';
  }

  showOfferImg(evt, offerSrc) {
    this.refs.offerImageModal.src = offerSrc;
  }

  render() {
    return (
      <div className="rel1920">
        <div className="rel1100">
          <div className="offer-school">
            <h2>顺顺留学最新offer和好评</h2>
            <div className="offerschool-title">收获的不只是一份录取，更是一份信任和口碑</div>
            <div className="offerlist">
              {offerData.en.map((item, index) => {
                return (
                  <div className="offerlist-school-box" key={Math.random()} onMouseEnter={(e) => this.handMouseOver(e, index)} onMouseLeave={(e) => this.handMouseOut(e, index)}>
                    <div className="offerlist-school-box-img"><img src={`/public/img/enAllPic/offer/offer0${(index + 1)}.jpg`} alt="" /></div>
                    <div className="offerlist-school-box-desc" ref={`desc${index}`}>
                      {
                        index < 5 ? (
                          <div>
                            <div className="offerlist-desc-title">{item.offerlistTitle}</div>
                            <div className="offerlist-desc-ename">{item.offerSchool}</div>
                          </div>
                        ) : (
                          <div className="offerlist-desc-reverse">{item.offerlistReverse}</div>
                        )
                      }
                      <div className="offerlist-desc-offerbig" data-toggle="modal" data-target="#offer-image"
                           onClick={evt => this.showOfferImg(evt, `/public/img/enAllPic/offer/offer0${(index + 1)}.jpg`)}>{item.offerClickImg}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="visitor-desc-btn">
              <Live800 classes={'live800 live8001 graybtn'} title={'咨询商科最新案例'} type={'a'} tips={'顺顺留学最新offer和好评'} />
              <Live800 classes={'live800 live8001 redbtn'} title={'了解案例详情'} type={'a'} tips={'顺顺留学最新offer和好评'} />
            </div>
          </div>
        </div>
        <div className="modal fade" id="offer-image">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <img src="" alt="" ref="offerImageModal" width="100%" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = OfferPrice;
