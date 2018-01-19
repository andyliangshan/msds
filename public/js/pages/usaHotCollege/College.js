/* eslint global-require: 0 */
const React = require('react');
const Link = require('react-router').Link;

const Footer = require('../../components/Footer');
const Header = require('../../components/Header');
const Banner = require('../../components/Banner');
const Activity = require('../../components/usahot/Activity');
const Live800 = require('../../components/Live800');
const AbroadForm = require('../../components/AbroadForm');
const Xuanxiao = require('../../components/Xuanxiao');
const SuccessModal = require('../../components/SuccessModal');
const PageInterModals = require('../../components/PageInterModals');

class College extends React.Component {

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  render() {
    const bannerChildren = (<div className="rel1100">
      <div className="querybtn">
        <div className="xuanxiaobtn" style={{ display: 'inline-block' }}><Xuanxiao qudao_details={'SEM/美国热门院校-homePC/banner/测试选校'} /></div>
        <Live800 classes={'live800 live8001'} title={'立即咨询'} type={'a'} tips={'院校首页banner'} />
      </div>
    </div>);

    return (
      <div>
        <Header />
        <Banner bg={`${__CDN__}/public/img/list-banner.png`} childrens={bannerChildren} />
        <Activity />
        <div className="rel1100">
          <div className="ivy-school">
            <div className="ivy-school-title clearfix">
              <span><img src={require('../../../img/usa-hot/cct.png')} alt="" /></span>
              <h2>常青藤</h2>
            </div>
            <ul className="ivy-school-list clearfix list-unstyled">
              <li className="first-li">
                <img src={require('../../../img/usa-hot/hf.png')} alt="" />
                <p>哈佛</p>
                <Link to="harvard" target="_blank"></Link>
              </li>
              <li>
                <img src={require('../../../img/usa-hot/yl.png')} alt="" />
                <p>耶鲁</p>
                <Link to="yale" target="_blank"></Link>
              </li>
              <li>
                <img src={require('../../../img/usa-hot/plsd.png')} alt="" />
                <p>普林斯顿</p>
                <Link to="princeton" target="_blank"></Link>
              </li>
              <li>
                <img src={require('../../../img/usa-hot/glby.png')} alt="" />
                <p>哥伦比亚</p>
                <Link to="columbia" target="_blank"></Link>
              </li>
              <li>
                <img src={require('../../../img/usa-hot/stf.png')} alt="" />
                <p>斯坦福</p>
                <Link to="stanford" target="_blank"></Link>
              </li>
              <li>
                <img src={require('../../../img/usa-hot/bl.png')} alt="" />
                <p>布朗</p>
                <Link to="brown" target="_blank"></Link>
              </li>
              <li>
                <img src={require('../../../img/usa-hot/kne.png')} alt="" />
                <p>康奈尔</p>
                <Link to="cornell" target="_blank"></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="rel1920">
          <div className="rel1100">
            <div className="hot-school ivy-school">
              <div className="hot-school-title clearfix">
                <span><img src={require('../../../img/usa-hot/fire.png')} alt="" /></span>
                <h2>热门录取院校</h2>
              </div>
              <ul className="hot-school-list ivy-school-list clearfix list-unstyled">
                <li className="first-li">
                  <img src={require('../../../img/usa-hot/ny.png')} alt="" />
                  <p>纽约大学</p>
                  <Link to="nyu" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/hsd.png')} alt="" />
                  <p>华盛顿大学</p>
                  <Link to="uw" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/bsd.png')} alt="" />
                  <p>波士顿大学</p>
                  <Link to="bu" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/bxfny.png')} alt="" />
                  <p>宾夕法尼亚</p>
                  <Link to="upenn" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/yhhpjs.png')} alt="" />
                  <p>约翰霍普金斯</p>
                  <Link to="hopkins" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/kndg.png')} alt="" />
                  <p>康涅狄格大学</p>
                  <Link to="uconn" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/xc.png')} alt="" />
                  <p>雪城大学</p>
                  <Link to="syracuse" target="_blank"></Link>
                </li>
              </ul>
              <ul className="hot-school-list ivy-school-list clearfix list-unstyled">
                <li className="first-li">
                  <img src={require('../../../img/usa-hot/pd.png')} alt="" />
                  <p>普渡大学</p>
                  <Link to="purdue" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/knjml.png')} alt="" />
                  <p>卡内基梅隆</p>
                  <Link to="cmu" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/dk.png')} alt="" />
                  <p>杜克大学</p>
                  <Link to="duke" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/pzb.png')} alt="" />
                  <p>匹兹堡大学</p>
                  <Link to="pitt" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/ehe.png')} alt="" />
                  <p>俄亥俄州立大学</p>
                  <Link to="osu" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/lqst.png')} alt="" />
                  <p>罗切斯特大学</p>
                  <Link to="rochester" target="_blank"></Link>
                </li>
                <li >
                  <img src={require('../../../img/usa-hot/jz.png')} alt="" />
                  <p>加州大学</p>
                  <Link to="uc" target="_blank"></Link>
                </li>
              </ul>
              <div className="hot-school-buttoon">
                <p className="po"><a href="http://zt.shunshunliuxue.cn/usa/version3/schoolranking_1/" target="_blank">热门院校排名</a></p>
                <p><Live800 classes={'live800 live8001'} title={'问问专家怎么选'} type={'a'} tips={'热门院校排名'} /></p>
              </div>
            </div>
          </div>
        </div>
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国热门院校-homePC/底部/获得申请方案'} />
        <Footer qudao_details={'SEM/美国热门院校-homePC/底部/在线预约'} />
        <SuccessModal />
        <PageInterModals circle={2} time1={10000} time2={10000} time3={10000} time4={23000} />
      </div>
    );
  }
}

module.exports = College;
