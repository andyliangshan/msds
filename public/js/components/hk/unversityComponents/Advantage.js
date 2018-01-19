
const React = require('react');
// const IntInfo = require('../../usahot/Zhaosg/IntInfo');
const IntCRP = require('../../usahot/Zhaosg/IntCRP');
const IntInfo2 = require('../../usahot/MiddleV4/IntInfo2');
const Teacher = require('../../usahot/Teacher/Teacher');
const SocityShun = require('../../../components/SocityPriceCommon/ShunsocityTs');
// const Live800 = require('../../../components/Live800/Live800');
const usaV4Data = require('../../usahot/ExtraData/usaV4Data.json');

const PropTypes = React.PropTypes;

class Advantage extends React.Component {
  static propTypes = {
    majorTabData: PropTypes.object,
    schoolname: PropTypes.string,
  };
  render() {
    const { majorTabData, schoolname } = this.props;
    const teacherTitle = <div className="teacher-title">顶尖师资—前哈佛招生委员带领常青藤外教</div>;
    const imgSrc = `${__CDN__}/public/img/hk/v1/university/info.png`;
    return (
      <div className="content-common">
        <div className="advantage wd1000">
          <div className="title">
            <h3>
              <span className="title-name">顺顺留学的</span>
              <span className="title-desc">独特优势</span>
            </h3>
            <div className="title-icon">
              <img src={`${__CDN__}/public/img/hk/v1/university/icon_title.png`} alt="" />
            </div>
          </div>
          <div className="advantage-content">
            <div className="ex-title"><h4>互联网留学—打破传统中介限制，流程透明沟通高效</h4></div>
            <IntInfo2 imgSrc={imgSrc} />
            <Teacher usaV4Data={usaV4Data} title={teacherTitle} qudaoDetails={`SEM/香港V1名校_${schoolname}PC/顺顺优势/向他提问`} />
            <IntCRP majorTabData={majorTabData} showLive800 />
            <SocityShun mainClass={'caotese'} h2={'互联网留学—靠谱的留学机构'} subtitle={'顺顺留学是上市教育集团--“好未来”旗下的留学品牌（股票代码TAL），是国内领先的互联网教育平台。'} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Advantage;
