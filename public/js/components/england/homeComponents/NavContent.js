const React = require('react');

const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;
class NavContent extends React.Component {
  static propTypes = {
    contentData: PropTypes.array,
  };
  render() {
    const { contentData } = this.props;
    return (
      <div className="content-wraper">
        <ul className="wd1000 content">
          {
            contentData.map((item, index) =>
              <li className="content-item" key={item.id}>
                <div className="title clearfix">
                  <div className="img">
                    <img src={`${__CDN__}/public/img/enAllPic/home/${item.img}`} alt="IMG" />
                    <h3>{item.title}</h3>
                  </div>
                  <div className="intro">
                    <h4>简介</h4>
                    <p className="text" dangerouslySetInnerHTML={{ __html: item.intro }}></p>
                  </div>
                </div>
                <div className="detail clearfix">
                  <div className="detail-left">
                    <div className="piece">
                      <h4>适合人群</h4>
                      <div className="text">
                        <span>{item.suitable}&nbsp;</span>
                        {/* <a href="" dangerouslySetInnerHTML={{ __html: item.advisoryplan }}></a> */}
                        <Live800 classes={'live800 zixun'} title={`${item.advisoryplan} >>`} type={'a'} tips={item.advisoryplan} />
                      </div>
                    </div>
                    <div className="piece">
                      <h4>录取条件</h4>
                      <div className="text" dangerouslySetInnerHTML={{ __html: item.condition }}></div>
                    </div>
                    <div className="piece">
                      <h4>费用</h4>
                      <div className="text" dangerouslySetInnerHTML={{ __html: item.cost }}></div>
                    </div>
                    <div className="links clearfix">
                      <a className="detail fl" target="_blank" href={item.detailurl}>{item.detaillips}</a>
                      <Live800 classes={'live800 liaojie fl'} title={item.advisorylips} type={'a'} tips={item.advisorylips} />
                    </div>
                  </div>
                  <div className="detail-right">
                    <h4>时间规划</h4>
                    <div>
                      <img src={`${__CDN__}/public/img/enAllPic/home/icon_clock.png`} alt="clock" />
                    </div>
                    <ul>
                      {
                        item.timeplan.map((plan) =>
                          <li key={plan.id} className="clearfix">
                            <div className="list-logo">
                              <img src={`${__CDN__}/public/img/enAllPic/home/icon_list.png`} alt="list" />
                            </div>
                            <div className="main-info">
                              <div className="date">
                                <span>{plan.date}</span>
                                <span className="sanjiao-left"></span>
                              </div>
                              <div className="plan">
                                <span>{plan.content}</span>
                              </div>
                            </div>
                            <div className="url-link">
                              <span>&nbsp;</span>
                              {
                                (plan.url && index !== 2) && <a href="javascript:void(0)" className="zixun text" data-toggle="modal" data-target={plan.modelId}>{plan.url}&gt;&gt;</a>
                              }
                              {
                                (plan.url && index === 2) && <Live800 classes={'live800 zixun'} title={` ${plan.url} >>`} type={'a'} tips={plan.url} />
                              }
                            </div>
                          </li>,
                        )
                      }
                    </ul>
                    <div className="shunshun-provide">
                      <span className="symbol">※</span>
                      <span>顺顺也提供单申请、单文书、单签证服务</span>
                    </div>
                  </div>
                </div>
              </li>,
            )
          }
        </ul>
      </div>);
  }
}

module.exports = NavContent;
