/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('./ServiceProcess.less');
const ServiceProcessData = require('./ServiceProcess2.json');
const Live800 = require('../../../components/Live800');

const React = require('react');

class ServiceProcess extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  textMouseover(evt, activeIndex) {
    if (activeIndex === 3 || activeIndex === 6 || activeIndex === 10) {
      return;
    }
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { activeIndex } = this.state;
    const sd = ServiceProcessData.listHoverContent[activeIndex];
    return (
      <div className="rel1100">
        <div className="serviceProcess">
          <div className="shunDoWhat-header" id="shunDoWhat-header">
            <h3>顺顺能帮你做什么？</h3>
          </div>
          <h3 className="serviceProcess-header">
            {ServiceProcessData.serviceProcessHeader}
          </h3>
          <div className="serviceProcess-list clearfix">
            {ServiceProcessData.serviceProcessList.map((service, index) => {
              return (
                <div key={Math.random()} className={`list-all ${index > 4 ? 'paddingtop' : ''} ${(index === 4 || index === 9) ? 'enddiv' : ''}`} onMouseEnter={evt => this.textMouseover(evt, index)}>
                  <div className="list-text">
                    <span className="pink">{service.step}</span>
                    <p className={(index === 2 || index === 3 || index === 6 || index === 8) ? 'oneLine' : ''} dangerouslySetInnerHTML={{ __html: service.text }}></p>
                  </div>
                  {(index === 4 || index === 9) ? '' : <img className="dayu" src={require(`${index < 4 ? './en-sk-dayu.png' : './en-sk-xiaoyu.png'}`)} alt="" />}
                </div>
              );
            })}
            <div style={{ top: '40%' }} className="jiantou-down"><img src={require('./en-sk-xia.png')} alt="" /></div>
          </div>
          <div className="list-hover-content">
            <div key={Math.random()} className="hover-text">
              <h3>{sd.h3content}</h3>
              <p>{sd.pcontent1}</p>
              <p>{sd.pcontent2}</p>
              <p>{sd.pcontent3}</p>
              <p className="endpp">注：顺顺也提供<Live800 classes={'live800 blackbtn'} title={'单申请'} type={'a'} tips={'单申请'} />、
                <Live800 classes={'live800 blackbtn'} title={'单文书'} type={'a'} tips={'单文书'} />、
                <Live800 classes={'live800 blackbtn'} title={'单签证服务'} type={'a'} tips={'单签证服务'} />，详情可以
                <Live800 classes={'live800 bluebtn'} title={'咨询客服'} type={'a'} tips={'咨询客服'} /></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ServiceProcess;
