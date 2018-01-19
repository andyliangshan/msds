/* eslint global-require: 0 */
require('./Live800.less');

const React = require('react');

const PropTypes = React.PropTypes;

class Live800 extends React.Component {

  /**
   * @type {{bg: *, local: *}}
   * title: 按钮内容
   * classes: 填充的内部类名
   * type: 渲染方式  ->   a  / button
   * tips: window.open 拼接的地址的提示信息
   */
  static propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
    type: PropTypes.string,
    // tips: PropTypes.string,
    'data-growing-title': PropTypes.string, // 添加growing title 字段
  };

  openPanel(evt) {
    evt.preventDefault();
    // const arrhref = ['http://localhost:3001/hk/v1/master/mq/', 'http://lp.shunshunliuxue.cn/hk/v1/master/mq/'];
    // const newhref = (window.location.href).split('?')[0];
    // if (newhref && arrhref.indexOf(newhref) !== -1) {
    const meiqia = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=72111';
    // const liveTips = this.props.tips;
    // const enterurl = encodeURIComponent(decodeURIComponent(location.href));
    // const firstEnterurl = encodeURIComponent(decodeURIComponent(location.href) + liveTips);
    const opened = `${meiqia}&clientId=${window.jzlvisitor_id.substr(0, 16)}`;
    /* eslint-disable */
    const centerWidth = window.innerWidth / 2 - 245 + 'px';
    const centerHeight = window.innerHeight / 2 - 260 + 'px';
    window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=520');
    /* eslint-enable */
      // return;
    // }
    // const liveTips = this.props.tips;
    // const base800 = 'http://webchat.shunshunliuxue.com/live800/chatClient/chatbox.jsp?companyID=8958&configID=3';
    // const enterurl = encodeURIComponent(decodeURIComponent(location.href));
    // const firstEnterurl = encodeURIComponent(decodeURIComponent(location.href) + liveTips);
    // const opened = `${base800}&enterurl=${enterurl}&firstEnterurl=${firstEnterurl}&jzl_id=${window.jzlvisitor_id}`;
    /* eslint-disable */
    // const centerWidth = window.innerWidth / 2 - 245 + 'px';
    // const centerHeight = window.innerHeight / 2 - 250 + 'px';
    // window.open(opened, '_blank', 'top=' + centerHeight + ',left=' + centerWidth + ',scrollbars=0,resizable=0,width=590,height=500');
    /* eslint-enable */
  }

  render() {
    const type = this.props.type || 'button';
    const instance = type === 'button' ? (<button className={this.props.classes} onClick={evt => this.openPanel(evt)}>
      {this.props.title}
    </button>) : (<a href="javascript:void(0)" data-growing-title={this.props['data-growing-title']} className={this.props.classes} onClick={evt => this.openPanel(evt)}>{this.props.title}</a>);
    return instance;
  }
}

module.exports = Live800;
