/* eslint global-require: 0 */
const React = require('react');
require('./SubActivity.less');

class SubActivity extends React.Component {
  render() {
    return (
      <div className="maincontent">
        <div className="rel1100 clearfix">
          <div className="hot-advertising">
            <ul>
              <li>
                <img src={require('./usa-midschool-meiti-icon1.png')} alt="" />
                <p>教育部</p>
              </li>
              <li>
                <img src={require('./usa-midschool-meiti-icon2.png')} alt="" />
                <p>美股上市</p>
              </li>
              <li>
                <img src={require('./usa-midschool-meiti-icon3.png')} alt="" />
                <p>新浪教育</p>
              </li>
              <li>
                <img src={require('./usa-midschool-meiti-icon4.png')} alt="" />
                <p>腾讯</p>
              </li>
              <li>
                <img src={require('./usa-midschool-meiti-icon5.png')} alt="" />
                <p>福布斯</p>
              </li>
              <li>
                <img src={require('./usa-midschool-meiti-icon6.png')} alt="" />
                <p>凤凰网</p>
              </li>
              <li>
                <img src={require('./usa-midschool-meiti-icon7.png')} alt="" />
                <p>网易</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SubActivity;
