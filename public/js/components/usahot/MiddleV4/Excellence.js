const React = require('react');
const IntInfo = require('../Zhaosg/IntInfo');
const IntCRP = require('../Zhaosg/IntCRP');
const IntInfo2 = require('./IntInfo2');
const SocityShun = require('../../../components/SocityPriceCommon/ShunsocityTs');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class Excellence extends React.Component {
  static propTypes = {
    majorTabData: PropTypes.object,
  };
  render() {
    const { majorTabData } = this.props;
    return (
      <div className="excellence wd1000" id="excellence">
        <div>
          <div className="title-top"></div>
          <div className="title">
            <h3>
              <span className="first">顺顺</span>
              <span>独特优势</span>
            </h3>
          </div>
        </div>
        <div>
          <div className="ex-title"><h4>背景活动—为简历加分，更高名校录取</h4></div>
          <IntInfo />
        </div>
        <div className="crp-wrapper">
          <IntCRP majorTabData={majorTabData} />
          <Live800 classes={'live800 middlev4-live'} title={'了解全程透明的顺顺系统'} type={'a'} tips={'了解全程透明的顺顺系统'} />
        </div>
        <div className="ex-title"><h4>互联网留学—打破传统中介限制，流程透明沟通高效</h4></div>
        <IntInfo2 />
        <SocityShun mainClass={'caotese'} h2={'互联网留学—靠谱的留学机构'} subtitle={'顺顺留学是上市教育集团--“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。'} />
      </div>
    );
  }
}

module.exports = Excellence;
