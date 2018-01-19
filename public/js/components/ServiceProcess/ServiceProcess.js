/**
 * Created by '苏萧' on 2017/7/27.
 */
/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('./serviceProcess.less');
const ProcessDataUsa = require('./serviceUsa.json');
const ProcessDataEn = require('./serviceEn.json');
const Live800 = require('../../components/Live800/Live800');

const React = require('react');
const classnames = require('classnames');

const PropTypes = React.PropTypes;

const style = {
  marginBottom: '10px',
};
class ServiceProcess extends React.Component {
  static propTypes = {
    title: PropTypes.element.isRequired,
    borderStyle: PropTypes.string,
    country: PropTypes.string.isRequired,
    circleColor: PropTypes.string.isRequired,
    arrowColor: PropTypes.string,
    arrowHidden: PropTypes.string,
  };

  static defaultProps = {
    title: <h3 className="serviceProcess-header">
      <span className="first">定制流程——针对美国的服务流程，录取不到就退款</span>
    </h3>,
    borderStyle: '',
    country: 'usa',
    circleColor: '',
    arrowColor: '',
    arrowHidden: '',
  }

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
    const { title, circleColor, arrowColor, arrowHidden, borderStyle, country } = this.props;
    const { activeIndex } = this.state;
    const ServiceProcessData = country === 'usa' ? ProcessDataUsa : ProcessDataEn;
    const sd = ServiceProcessData.listHoverContent[activeIndex];
    return (
      <div className="serviceProcess">
        {title}
        <div className="serviceProcess-list clearfix">
          {ServiceProcessData.serviceProcessList.map((service, index) => {
            return (
              <div key={service.id} className={`list-all ${index > 4 ? 'paddingtop' : ''} ${(index === 4 || index === 9) ? 'enddiv' : ''}`}>
                <div className="list-text">
                  <div className="radius-box">
                    <i className="radius" style={{ color: circleColor, backgroundColor: circleColor }}></i>
                    {
                      index < 5 ?
                        <span className="number">{index + 1}</span>
                        :
                        <span className="number">{15 - index}</span>
                    }
                  </div>
                  {
                    country === 'usa' ?
                      <p className={classnames({ oneLine: [2, 3, 7, 8, 9].indexOf(index) !== -1 }, { line3: index === 4 })}
                         dangerouslySetInnerHTML={{ __html: service.text }}
                         onClick={evt => this.textMouseover(evt, index)}></p> :
                      <p className={classnames({ oneLine: [2, 3, 7, 8, 9].indexOf(index) !== -1 }, { line3: index === 4 })}
                         dangerouslySetInnerHTML={{ __html: service.text }}
                         onMouseEnter={evt => this.textMouseover(evt, index)}></p>
                  }
                </div>
                {/* {(index === 4 || index === 9) ? '' : <img className="dayu" src={require(`${index < 4 ? './gray-r.png' : './gray-l.png'}`)} alt="" />} */}
                {
                  (index === 4 || index === 9) ? '' :
                  <div className="arrow-right arrow-box">
                    <b className={index < 4 ? 'right' : 'left'}><i className={`arrow1 ${arrowColor}`}></i><i className={`arrow2 ${arrowHidden}`}></i></b>
                  </div>
                }
              </div>
            );
          })}
          <div className="jiantou-down">
            {/* <img src={require('./gray-b.png')} alt="" /> */}
            <div className="arrow-right arrow-box">
              <b className="bottom"><i className={`arrow1 ${arrowColor}`}></i><i className={`arrow2 ${arrowHidden}`}></i></b>
            </div>
          </div>
        </div>
        <div className={`list-hover-content ${borderStyle}`}>
          <div className="hover-text">
            <h3 style={style}>{sd.h3content}</h3>
            <p dangerouslySetInnerHTML={{ __html: sd.pcontent1 }}></p>
            <p dangerouslySetInnerHTML={{ __html: sd.pcontent2 }}></p>
            <p dangerouslySetInnerHTML={{ __html: sd.pcontent3 }}></p>
            <p className="endpp">
              <span>注：顺顺也提供</span>
              <a className={classnames('live800', 'blackbtn')}>单申请、单文书、语言培训、单签证服务&nbsp;&nbsp;</a>
              <Live800 classes={'live800 bluebtn'} title={'在线咨询'} type={'a'} tips={'在线咨询'} />
            </p>
            {/* <i className="icon-back back-icon"></i> */}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ServiceProcess;
