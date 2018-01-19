       /**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');
const Live800 = require('../../../components/Live800/Live800');
const Yuyue = require('../../../components/Yuyue/Yuyue2');

const PropTypes = React.PropTypes;

class IntZsg extends React.Component {

  static propTypes = {
    zsgData: PropTypes.array,
    juryData: PropTypes.array,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      useragentIe8: false,
    };
  }

  componentDidMount() {
    if (navigator.appName === 'Microsoft Internet Explorer' && navigator.appVersion.match(/8./i) == '8.') { // eslint-disable-line
      const $this = this;
      $this.setState({
        useragentIe8: true,
      });
    }
  }

  handelShowJury(e, activeIndex) {
    e.preventDefault();
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { zsgData, juryData } = this.props;
    const { activeIndex, useragentIe8 } = this.state;

    return (
      <div className="zsg">
        <div className="zsg-wraper">
          <div className="zsg-content wd1000">
            <div className="title">
              <strong className="first">相约前招生官</strong>
              <strong className="second">提前锁定名校席位</strong>
            </div>
            <ul className="zsg-list clearfix">
              {
                zsgData.map((item, index) =>
                  <li key={Math.random()} className={index === (zsgData.length - 1) ? 'fl mr0' : 'fl'}>
                    <div className="img-wraper">
                      <img src={`${__CDN__}/public/img/usaAllPic/zhaosg/${item.img}`} alt="" />
                    </div>
                    <div className="zsg-name">
                      <strong>{item.name}</strong>
                    </div>
                    <div className="zsg-dsc" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                    <Live800 classes={'live800 zsg-reverse'} title={'预约咨询'} type={'a'} tips={'活动详情'} />
                  </li>,
                )
              }
            </ul>
            <div className="zhaosg-video" id="zhaosg-video">
              <div className="video">
                {useragentIe8 ? <div className="showimg"><img src="http://op1szwr44.bkt.clouddn.com/public/img/enAllPic/home/poster.png" alt="" /></div> : <video id="video" poster="http://op1szwr44.bkt.clouddn.com/public/img/enAllpic/home/poster.png" controls="true" height="100%" width="100%">
                  <source src="http://op1szwr44.bkt.clouddn.com/media/video/Erinn%20Andrews%20Case%20Study%201_1_0809-1.mp4" type="video/mp4" />
                </video> }
              </div>
              <div className="videodesc">
                <div className="videodesc-title">Erinn独家采访：中国学生申请美国名校</div>
                <div className="videodesc-ant">
                  <p>标准化成绩对结果影响多大？</p>
                  <p>课外活动重要么？</p>
                  <p>什么样的活动更受名校招生官青睐？</p>
                  <p>中国学生应该怎么提升综合竞争力？</p>
                  <Yuyue qudao_details={'SEM/美国招生官PC/视频/预约招生官'} btnTitle={'预约招生官'} wrapModalTitle={'预约招生官'} submitBtn={'提交'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="jury-wraper">
          <div className="jury-content wd1000">
            <div className="title">
              <strong className="first">名校陪审团</strong>
              <strong className="second">高能助力</strong>
            </div>
            <div className="jury-main clearfix">
              <ul className="jury-list fl">
                {
                  juryData.map((item, index) =>
                    <li key={Math.random()} className={(index + 1) % 3 === 0 ? 'fl mr0' : 'fl'} onClick={(e) => this.handelShowJury(e, index)} >
                      <div className={activeIndex === index ? 'masked dn' : 'masked db'}></div>
                      <div className="jury-head">
                        <img src={`${__CDN__}/public/img/usaAllPic/zhaosg/${item.img}`} alt="" />
                      </div>
                      <div className={activeIndex === index ? 'jury-name db' : 'jury-name dn'}>{item.name}</div>
                    </li>,
                  )
                }
              </ul>
              <div className="jury-info fr">
                <div className="info-head">
                  <img src={`${__CDN__}/public/img/usaAllPic/zhaosg/${juryData[activeIndex].img}`} alt="" />
                </div>
                <div className="zsg-name">
                  <strong>{juryData[activeIndex].name}</strong>
                </div>
                <div className="zsg-dsc" dangerouslySetInnerHTML={{ __html: juryData[activeIndex].description }}></div>
                <Live800 classes={'live800 zsg-reverse'} title={'预约咨询'} type={'a'} tips={'活动详情'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = IntZsg;
