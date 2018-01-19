/**
 * Created by andy on 17/6/13.
 */
/* eslint global-require: 0 */
const React = require('react');
require('./ServiceTese.less');

const gaokaoData = require('../ExtraData/gaokaoData.json');

class ServiceTese extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  handMouseover(evt, activeIndex) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { activeIndex } = this.state;
    const currentServiceData = gaokaoData.arr[activeIndex];

    return (
      <div className="rel1920 servicebg">
        <div className="rel1100">
          <div className="servicebox">
            <h2>顺顺留学服务特色</h2>
            <div className="servicestype">
              <ul className="iconlist">
                {gaokaoData.arr.map((item, index) => {
                  return (
                    <li className={`li0${index + 1} ${index === activeIndex ? 'active' : ''}`} key={Math.random()} onMouseEnter={evt => this.handMouseover(evt, index)} onMouseLeave={evt => this.handMouseover(evt, index)}>&nbsp;</li>
                  );
                })}
              </ul>
              <div className="realvistor">
                <div className="showdesc">
                  <h3>{currentServiceData.h3}</h3>
                  <p>{currentServiceData.pp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ServiceTese;
