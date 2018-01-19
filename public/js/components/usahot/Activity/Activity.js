/* eslint global-require: 0 */

const React = require('react');
// const Link = require('../Link');
require('./Activity.less');

class Activity extends React.Component {
  render() {
    return (
      <div className="maincontent">
        <div className="rel1100 clearfix">
          <div className="hot-advertising">
            <ul>
              <li>
                <img src={require('./jyb.png')} alt="" />
                <p>教育部</p>
              </li>
              <li>
                <img src={require('./tal.png')} alt="" />
                <p>美股上市</p>
              </li>
              <li>
                <img src={require('./sina.png')} alt="" />
                <p>新浪教育</p>
              </li>
              <li>
                <img src={require('./tx.png')} alt="" />
                <p>腾讯</p>
              </li>
              <li>
                <img src={require('./for.png')} alt="" />
                <p>福布斯</p>
              </li>
              <li>
                <img src={require('./fh.png')} alt="" />
                <p>凤凰网</p>
              </li>
              <li>
                <img src={require('./fre.png')} alt="" />
                <p>峰瑞投资</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Activity;
