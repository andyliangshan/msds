/* eslint global-require: 0 */
require('./Header.less');

const React = require('react');

const PropTypes = React.PropTypes;

class Header extends React.Component {

  static defaultProps = {
    headClass: '', // 黑色的头部
  };

  static propTypes = {
    headClass: PropTypes.string, // 黑色头部。。默认值为 className = blackHead
  };


  render() {
    const baseurl = 'http://www.liuxue.com';
    const ztbase = 'http://zt.liuxue.com';
    return (
      <div className={`navbar-fixed-top ${this.props.headClass}`} id="newSemPc">
        <div className="container navbar-wrap">
          <div className="navbar-header">
            <a id="huracan-nav-logo" className="navbar-brand" href="http://www.liuxue.com/"></a>
          </div>
          <div id="navbar">
            <ul className="nav navbar-nav navbar-content-list">
              <li className="dropdown J_hover_select">
                <a href="javascript:void(0)" className="allow-dp dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
                >留学申请</a><span className="slide-down"></span>
                <ul className="dropdown-menu apply-study">
                  <span className="dropslide-icon ie8-icon-fixed"></span>
                  <li>
                    <p><a href={`${ztbase}/usa/`} target="_blank">美国</a></p>
                    <p><a href={`${ztbase}/en/`} target="_blank">英国</a></p>
                  </li>
                  <li>
                    <p><a href={`${ztbase}/au/`} target="_blank">澳大利亚</a></p>
                    <p><a href={`${ztbase}/ca/`} target="_blank">加拿大</a></p>
                  </li>
                  <li>
                    <p><a href={`${ztbase}/hk/`} target="_blank">香港</a></p>
                    <p><a href={`${ztbase}/sg/`} target="_blank">新加坡</a></p>
                  </li>
                  <li>
                    <p><a href={`${ztbase}/jp/`} target="_blank">日本</a></p>
                    <p><a href={`${ztbase}/kor/`} target="_blank">韩国</a></p>
                  </li>
                  <li>
                    <p><a href={`${ztbase}/nz/`} target="_blank">新西兰</a></p>
                    <p><a href={`${ztbase}/eur/`} target="_blank">欧洲</a></p>
                  </li>
                </ul>
              </li>
              <li><a href={`${baseurl}/consultant`} className="level-one" target="_blank">找顾问</a></li>
              <li><a href={`${baseurl}/case`} className="level-one" target="_blank">留学案例</a></li>
              <li><a href={`${baseurl}/college/us/`} className="level-one" target="_blank">院校排名</a></li>
              <li><a href={`${baseurl}/question`} className="level-one" target="_blank">问答社区</a></li>
              <li className="dropdown nav-select J_hover_select">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">专项服务</a>
                <span className="slide-down"></span>
                <ul className="dropdown-menu apply-study">
                  <span className="dropslide-icon ie8-icon-fixed"></span>
                  <li><a href="http://argo.liuxue.com/" className="" target="_blank">尊享服务</a>
                  </li>
                  {/* <li><a href="http://art.shunshunliuxue.com/" className="" target="_blank">艺术留学</a></li> */}
                  <li><a href="http://activities.liuxue.com/" target="_blank" rel="external nofollow">课外活动</a>
                  </li>
                  {/* <li className="level-one"><a href="http://sihaiyimin.liuxue.com/" className="level-one" target="_blank">四海移民</a></li>*/}
                </ul>
              </li>
              <li className="menu-line"><a href="http://ab.lp.shunshunliuxue.cn/service/" className="level-one" target="_blank">关于顺顺</a></li>
            </ul>
            <div className="phone-download">
              <a href="javascript:void(0);" className="ie8-phone-line">
                <img className="phone-download-icon download-icon1" src={require('./phone1.png')} width="19px" height="26px" alt="" />
                <img className="phone-download-icon download-icon2" src={require('./phone2.png')} width="19px" height="26px" alt="" />
              </a>
              <div className="phone-slide-wrap">
                <span className="ie8-icon-fixed"></span>
                <ul className="list-inline">
                  <li className="qr"><img src={require('./qr-shun.png')} alt="" /></li>
                  <li className="phone"><img src={require('./qr-huodong.png')} alt="" /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Header;
