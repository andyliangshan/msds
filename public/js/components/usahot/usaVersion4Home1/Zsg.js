const React = require('react');

const PropTypes = React.PropTypes;

const Live800 = require('../../../components/Live800/Live800');

require('./zsg.less');

class Rank extends React.Component {
  static defaultProps = {
    rankData: [],
  }

  static propTypes = {
    rankData: PropTypes.array.isRequired,
  }

  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  render() {
    return (
      <div className="usaV4h1-zsg clearfix">
        <div className="each-zsg fl">
          <div className="zsg-avator">
            <img src={`${__CDN__}/public/img/usaAllPic/usaV4Home1/zsg_Erinn.png`} alt="" />
          </div>
          <div className="zsg-desc">
            <div className="zsg-name">Erinn</div>
            <div className="zsg-info">斯坦福前招生官</div>
            <div className="zsg-info">斯坦福本科、硕士</div>
            <div className="zsg-info">审阅过来自70多国家上千份申请</div>
            <Live800 classes={'live800 advisory'} title={'预约咨询'} type={'a'} tips={'预约咨询'} />
          </div>
        </div>
        <div className="each-zsg middle fl">
          <div className="zsg-avator">
            <img src={`${__CDN__}/public/img/usaAllPic/usaV4Home1/zsg_Marisa.png`} alt="" />
          </div>
          <div className="zsg-desc">
            <div className="zsg-name">Marisa</div>
            <div className="zsg-info">耶鲁大学前招生官</div>
            <div className="zsg-info">MIT前招生副主任</div>
            <div className="zsg-info">Phillips Academy Andover招生副主任</div>
            <Live800 classes={'live800 advisory'} title={'预约咨询'} type={'a'} tips={'预约咨询'} />
          </div>
        </div>
        <div className="each-zsg fl">
          <div className="zsg-avator">
            <img src={`${__CDN__}/public/img/usaAllPic/usaV4Home1/zsg_He.png`} alt="" />
          </div>
          <div className="zsg-desc">
            <div className="zsg-name">何亮</div>
            <div className="zsg-info">哈佛大学招生委员</div>
            <div className="zsg-info">哈佛大学肯尼迪学院硕士</div>
            <div className="zsg-info">第一任中国籍哈佛学生会副主席</div>
            <Live800 classes={'live800 advisory'} title={'预约咨询'} type={'a'} tips={'预约咨询'} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Rank;
