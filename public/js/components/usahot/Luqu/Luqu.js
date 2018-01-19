/* eslint global-require: 0 */
require('./Luqu.less');
const React = require('react');

const LuquData = require('../Luqu/LuquData.json');

class Luqu extends React.Component {

  render() {
    return (
      <div className="cs-content">
        <h3 className="tt-title">顺顺最新录取榜</h3>
        <ul className="student">
          {LuquData.studentData.map((item, index) => {
            return (
              <li key={Math.random()}>
                <span className="circle" >{item.item1}</span>
                <span className="name">{`${item.item1}同学`}</span>
                <span>{item.item2}</span>
                <span className="last">{item.item3}</span>
                <span className={`Top ${(index === 0 || index === 1 || index === 6 || index === 10 || index === 14) ? '' : 'active'}`}>{item.topscore}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Luqu;
