const React = require('react');

const PropTypes = React.PropTypes;

const Yuyue = require('../../../components/Yuyue/Yuyue1');
require('./teacher.less');

class Teacher extends React.Component {
  static defaultProps = {
    title: <div className="teacher-title">顶尖师资·前哈佛招生委员带领常青藤外教</div>,
    qudaoDetails: 'SEM/英国v2院校排名PC/外教/向他提问',
  }
  static propTypes = {
    usaV4Data: PropTypes.object,
    title: PropTypes.element,
    qudaoDetails: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      acdecindex: 0,
    };
  }
  handClickVisitor(evt, index) {
    evt.preventDefault();
    this.setState({
      acdecindex: index,
    });
  }
  render() {
    const { usaV4Data, title, qudaoDetails } = this.props;
    const { acdecindex } = this.state;
    const visitorData = usaV4Data.teacherData.listdescData[acdecindex];
    return (
      <div className="teacher">
        {title}
        <div className="teacher-list clearfix">
          <div className="listimg">
            {usaV4Data.teacherData.listimgData.map((item, index) => {
              return (
                <div className={`listddata ${index === acdecindex ? 'active' : ''}`} key={Math.random()}>
                  <div className="smallPic" ref={`smallPic${index}`} onClick={evt => this.handClickVisitor(evt, index)}>
                    <img src={`/public/img/usaAllPic/usaV4/visitor-sm${index + 1}.jpg`} alt={item.altTitle} />
                    <p>{item.schoolname}</p>
                  </div>
                  <div className={`listdesc ${index === acdecindex ? 'active' : ''}`} ref={`listdesc${index}`}>
                    <div className="listdesc-img"><img src={`/public/img/usaAllPic/usaV4/visitor${acdecindex + 1}.png`} alt="" /></div>
                    <div className="listbox">
                      <div className="listdesc-title">{visitorData.name}</div>
                      <div className="listdesc-pp">
                        {visitorData.listdescPp.map((items, dindex) => {
                          return (
                            <p key={Math.random()} className={`${dindex === (visitorData.listdescPp.length - 1) ? 'suhu' : ''}`}><em>&nbsp;</em><i>{items.p}</i></p>
                          );
                        })}
                      </div>
                      <div className="listdesc-query">
                        <Yuyue btnTitle={'向他提问'} wrapModalTitle={'向他提问'} submitBtn={'提交'} qudao_details={qudaoDetails} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Teacher;
