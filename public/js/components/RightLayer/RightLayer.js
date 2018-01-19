/**
 * Created by andy on 17/6/15.
 */
/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('./RightLayer.less');
const React = require('react');

const propTypes = React.PropTypes;
const pageData = require('./RightLayer.json');
const Live800 = require('../../components/Live800');

class RightLayer extends React.Component {

  static defaultProps = {
    tipss: '高考',
  };

  static propTypes = {
    tipss: propTypes.string,
  };

  queryBtnClick(evt) {
    evt.preventDefault();
    // const liveTips = this.props.tipss;
    // const base800 = 'http://webchat.shunshunliuxue.com/live800/chatClient/chatbox.jsp?companyID=8958&configID=3';
    // const enterurl = encodeURIComponent(decodeURIComponent(location.href));
    // const firstEnterurl = encodeURIComponent(decodeURIComponent(location.href) + liveTips);
    // const opened = `${base800}&enterurl=${enterurl}&firstEnterurl=${firstEnterurl}&jzl_id=${window.jzlvisitor_id}`;
    const base800 = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=72111';
    const opened = `${base800}&clientId=${window.jzlvisitor_id.substr(0, 16)}`;
    /* eslint-disable */
    const centerWidth = window.innerWidth / 2 - 245;
    const centerHeight = window.innerHeight / 2 - 260;
    window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=520');
  }

  closeLayer(evt) {
    evt.preventDefault();
    $('.right_flow').animate({
      right: -300
    },1000)
  }

  render() {
    return (
      <div className="right_flow">
        <div className="close_layer" onClick={evt => this.closeLayer(evt)}>×</div>
        <div className="countrylogo">
          <img src={require('./leftlogo.png')} className="logo" alt="" />
          <img src={require('./other.png')} className="img2" alt="" />
        </div>
        <div className="aabox">
          {pageData.gaokao.pageData.map((item, index) => {
            return (
              <div key={Math.random()}>
                <Live800 classes={`live800 aa${index + 1}`} title={item.item} type={'a'} tips={item.item} />
              </div>
            );
          })}
        </div>
        <div className="phone_layer">
          <a href="javascript:void(0)" onClick={evt => this.queryBtnClick(evt)}>
            <img src={require('./leftphone.png')} alt="" />
          </a>
        </div>
      </div>
    );
  }
}

module.exports = RightLayer;
