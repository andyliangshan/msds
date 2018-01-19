/* eslint global-require: 0 */
require('./Footer.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Live800 = require('../../components/Live800');
const Yuyue = require('../../components/Yuyue');

class Footer extends React.Component {

  static defaultProps = {
    defaultShowCountry: '美国',
  };

  static propTypes = {
    qudao_details: PropTypes.string.isRequired,
    defaultShowCountry: PropTypes.string, //  下拉国家默认选项
  };

  render() {
    return (
      <div id="footer-container">
        <div className="footer-banner">
          <img src={require('../Footer/footer-banner.png')} alt="" width="100%" />
          <div className="rel1100">
            <div className="footer-button">
              <p>现在加入顺顺，和我们一起让申请更有效</p>
              <Yuyue defaultShowCountry={this.props.defaultShowCountry} qudao_details={this.props.qudao_details} />
              <Live800 classes={'footer-button-a'} title={'立即咨询'} type={'a'} tips={'院校底部banner'} />
            </div>
          </div>
        </div>
        <div className="footer-list">
          <div className="wrapper">
            <div className="site-address">
              <ul className="list-inline">
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="北京市朝阳区工体北路甲2号盈科中心A座22层" className="hmtHelp" data-hmt="页面底部-北京">北京总部
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="上海市黄浦区西藏中路268号来福士广场11楼" className="hmtHelp" data-hmt="页面底部-上海">上海
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="广州市天河区林和西路9号耀中广场A座4201-05" className="hmtHelp" data-hmt="页面底部-广州">广州
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="锦江区红星路三段1号IFS国际金融中心1号办公楼1901室" className="hmtHelp" data-hmt="页面底部-成都">成都
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="高新技术开发区科技路33号高新国际商务中心17楼1703" className="hmtHelp" data-hmt="页面底部-西安">西安
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="重庆市渝中区民生路235号附1号海航保利国际中心42-6" className="hmtHelp" data-hmt="页面底部-重庆">重庆
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="武汉市硚口区解放大道新世界中心A座1603-1605 </br>武汉市武昌区中北路楚河汉街总部国际C座3层" className="hmtHelp"
                     data-hmt="页面底部-武汉">武汉
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="厦门市思明区鹭江道8号国际银行大厦14楼F单元" className="hmtHelp" data-hmt="页面底部-厦门">厦门
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="湖南省长沙市万达广场写字楼A座30楼003室" className="hmtHelp" data-hmt="页面底部-长沙">长沙
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="山东省济南市市中区共青团路25号绿地普利中心2605室" className="hmtHelp" data-hmt="页面底部-济南">济南
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="郑州市经三路东风路招商银行大厦2101室" className="hmtHelp" data-hmt="页面底部-郑州">郑州
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="天津市和平区南京路131号富玛特大厦24层" className="hmtHelp" data-hmt="页面底部-天津">天津
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="宁波市灵桥路777号中国人寿大厦18楼" className="hmtHelp" data-hmt="页面底部-宁波">宁波
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="南京市鼓楼区中央路1号紫峰大厦1703,1704" className="hmtHelp" data-hmt="页面底部-南京">南京
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="深圳市福田区深南大道4013号兴业银行大厦3A层-A" className="hmtHelp" data-hmt="页面底部-深圳">深圳
                  </a >
                </li>
                <li>
                  <a data-toggle="tooltip" data-placement="bottom"
                     title="青岛数码港旗舰大厦16F" className="hmtHelp" data-hmt="页面底部-青岛">青岛
                  </a >
                </li>
              </ul>
            </div>
            <p>北京市朝阳区工体北路甲2号盈科中心A座22层</p>
            <p>咨询热线：400-104-6661 服务时间：全天9:00-18:00
              <a href="http://www.liuxue.com/about/" target="_blank" style={{ color: '#d3e2fb', fontSize: '13px' }}>关于东方人力</a>
            </p>
            <p>Copyright ©2015-2017 shunshunliuxue.com- 京ICP备15014913号-1&nbsp;北京东方人力科贸发展有限公司</p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Footer;
