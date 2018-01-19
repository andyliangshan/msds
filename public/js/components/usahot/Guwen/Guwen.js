/* eslint global-require: 0 */
require('./Guwen.less');
const React = require('react');
// const Link = require('../Link');

class Guwen extends React.Component {
  render() {
    return (
      <div className="allgu">
        <h4 className="cs-title sa-title kou">
          <span className="w308"></span>
          <p>经验丰富顾问，口碑相传</p>
          <span className="w308"></span>
        </h4>
        <ul className="guwen">
          <li><img src={require('./gu1.png')} alt="" /></li>
          <li><img src={require('./gu2.png')} alt="" /></li>
          <li><img src={require('./gu3.png')} alt="" /></li>
          <li><img src={require('./gu4.jpg')} alt="" /></li>
          <li><img src={require('./gu5.jpg')} alt="" /></li>
          <li><img src={require('./gu6.jpg')} alt="" /></li>
          <li><img src={require('./gu7.jpg')} alt="" /></li>
          <li className="last"><img src={require('./gu8.jpg')} alt="" /></li>
        </ul>
        <ul className="extra">
          <li><img src={require('./tv.png')} alt="" /><span>超过30%占比海归顾问</span></li>
          <li><img src={require('./chang.png')} alt="" /><span>常青藤毕业外籍导师</span></li>
          <li><img src={require('./zun.png')} alt="" /><span>顾问平均从业6年</span></li>
          <li><img src={require('./security.png')} alt="" /><span>中央文书处理，五层把关</span></li>
        </ul>
      </div>
    );
  }
}

module.exports = Guwen;
