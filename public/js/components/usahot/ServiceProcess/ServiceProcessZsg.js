/**
 * Created by '苏萧' on 2017/7/27.
 */
/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('./ServiceProcess.less');
const ServiceProcessData = require('./ServiceProcess.json');
const Live800 = require('../../../components/Live800');

const React = require('react');

const style = {
  marginBottom: '10px',
};
class ServiceProcessZsg extends React.Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  textMouseover(evt, activeIndex) {
    evt.preventDefault();
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { activeIndex } = this.state;
    const sd = ServiceProcessData.listHoverContent2[activeIndex];
    return (
      <div className="rel1100">
        <div className="serviceProcess">
          <h3 className="serviceProcess-header">
            <span className="first">针对美国名校定制流程</span>
            <span className="second">提高录取率</span>
          </h3>
          <div className="serviceProcess-list clearfix">
            {ServiceProcessData.serviceProcessList2.map((service, index) => {
              return (
                <div key={Math.random()} className={`list-all ${index > 4 ? 'paddingtop' : ''} ${(index === 4 || index === 9) ? 'enddiv' : ''}`} onMouseEnter={(index === 8) ? '' : evt => this.textMouseover(evt, index)}>
                  <div className="list-text">
                    <img src={require('./zise.png')} alt="" />
                    {
                      index < 5 ?
                        <span className="number">{index + 1}</span>
                        :
                        <span className="number">{15 - index}</span>
                    }
                    <p className={(index === 4 || index === 7 || index === 8) ? 'oneLine' : ''} dangerouslySetInnerHTML={{ __html: service.text }}></p>
                  </div>
                  {(index === 4 || index === 9) ? '' : <img className="dayu" src={require(`${index < 4 ? './gray-r.png' : './gray-l.png'}`)} alt="" />}
                </div>
              );
            })}
            <div className="jiantou-down">
              <img src={require('./gray-b.png')} alt="" />
            </div>
          </div>
          <div className="list-hover-content">
            <div key={Math.random()} className="hover-text">
              <h3 style={style}>{sd.h3content}</h3>
              <p>{sd.pcontent1}</p>
              <p>{sd.pcontent2}</p>
              <p>{sd.pcontent3}</p>
              <p className="endpp">注：顺顺也提供<Live800 classes={'live800 blackbtn'} title={'语言培训'} type={'a'} tips={'语言培训'} />、
                <Live800 classes={'live800 blackbtn'} title={'单申请'} type={'a'} tips={'单申请'} />、
                <Live800 classes={'live800 blackbtn'} title={'单文书'} type={'a'} tips={'单文书'} />、
                <Live800 classes={'live800 blackbtn'} title={'单签证服务'} type={'a'} tips={'单签证服务'} /></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ServiceProcessZsg;
