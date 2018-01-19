/**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');

class Header extends React.Component {

  render() {
    const baseurl = 'http://zt.shunshunliuxue.cn';
    const baseurlLp = 'http://lp.shunshunliuxue.cn';

    return (
      <div className="head-wraper">
        <div className="head-nav wd1000 clearfix">
          <div className="logo-wraper fl">
            <a id="huracan-nav-logo" className="navbar-brand" href="http://www.liuxue.com/" target="_blank"></a>
          </div>
          <nav className="navbar fl">
            <ul className="clearfix">
              <li className="fl"><a href={`${baseurl}/usa/version2/master/`} className="level-one" target="_blank">美国研究生</a></li>
              <li className="fl"><a href={`${baseurl}/usa/version2/undergraduate/`} className="level-one" target="_blank">美国本科</a></li>
              <li className="fl"><a href={`${baseurlLp}/usa/version3/midschool_1/`} className="level-one" target="_blank">美国中学</a></li>
              <li className="fl"><a href={`${baseurlLp}/usa/hot/home#/`} className="level-one" target="_blank">美国名校申请</a></li>
              <li className="fl"><a href={`${baseurl}/service/`} className="level-one" target="_blank">关于顺顺</a></li>
            </ul>
          </nav>
          <div className="tel-wraper fr">
            <img className="" src={require('../../../../img/usaAllPic/zhaosg/tel.png')} width="19px" height="26px" alt="" />
            <span>400-104-6661</span>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Header;
