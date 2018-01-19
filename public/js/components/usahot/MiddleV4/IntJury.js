const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class IntJury extends React.Component {

  static propTypes = {
    juryData: PropTypes.array,
    title: PropTypes.node,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  handelShowJury(e, activeIndex) {
    e.preventDefault();
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { juryData, title } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="jury-wraper" id="jury">
        <div className="jury-content wd1000">
          { title }
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
              <Live800 classes={'live800 middlev4-live'} title={'预约咨询'} type={'a'} tips={'活动详情'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = IntJury;
