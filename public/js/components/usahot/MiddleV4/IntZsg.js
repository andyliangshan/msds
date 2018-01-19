const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class IntZsg extends React.Component {

  static propTypes = {
    zsgData: PropTypes.array,
  };

  render() {
    const { zsgData } = this.props;
    return (
      <div className="zsg-wrapper" id="zsg">
        <div className="zsg wd1000">
          <div className="title-top"></div>
          <div className="title">
            <h3>
              <span className="first">『前招生官』</span>
              <span>解读美国中学录取</span>
            </h3>
          </div>
          <ul className="zsg-list">
            {
              zsgData.map((item, index) =>
                <li className={(index === zsgData.length - 1) ? 'clearfix mrb0' : 'clearfix'} key={item.id}>
                  <div className="fl zsg-basic">
                    <div className="head-img">
                      <img src={`${__CDN__}/public/img/usaAllPic/middleV4/${item.img}`} alt="" />
                    </div>
                    <div className="name">{item.name}</div>
                    {
                      item.label.map((label) =>
                        <div className="label" key={Math.random()}>{label}</div>,
                      )
                    }
                    <Live800 classes={'live800 middlev4-live'} title={'预约咨询'} type={'a'} tips={'立即咨询'} />
                  </div>
                  <div className="fl zsg-words">
                    <div className="zsg-info">
                      <h4>{item.desTitle}</h4>
                      {
                        item.description.map(desc =>
                          <p key={Math.random()}>{desc}</p>,
                        )
                      }
                    </div>
                    <div className="zsg-say">
                      <h4>{item.sugTitle}</h4>
                      {
                        item.suggestion.map(suges =>
                          <p key={Math.random()} className={index === 0 ? 'first-zsg clearfix' : 'clearfix'}>
                            {
                              index !== 0 && <a>·</a>
                            }
                            <span dangerouslySetInnerHTML={{ __html: suges }}></span>
                          </p>,
                        )
                      }
                    </div>
                  </div>
                </li>,
              )
            }
          </ul>
        </div>
      </div>
    );
  }

}

module.exports = IntZsg;
