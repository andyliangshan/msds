/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('../../usahot/BotForm/BotForm.less');
const React = require('react');

const PropTypes = React.PropTypes;
const regx = require('../../../core/regexp');

const Live800 = require('../../../components/Live800');
/**
 * 通过传值class参数来显示和隐藏页面的模块
 * @type {{show: string, hide: string}}
 */
const showHideModel = {
  show: 'show',
  hide: 'hide',
};

class BotFormData extends React.Component {
  /**
   * 底部表单提交
   * @returns {XML}
   */
  static defaultProps = {
    abroadData: { name: '同学', apply_contry: '英国' },
    qudao_details: 'SEM/英国名校/底部/试用名校服务',
    h2title: '加入顺顺，开启名校之旅',
    subTitle: 'Explore famous schools，now！',
    btnSubmitTitle: '试用名校服务',
    queryBtnTitle: '找顺顺·高录取留学',
    bgColor: null,
    children: null,
    childrens: null,
    bgImg: '/public/img/enAllPic/famouschool/en-famous-bot-banner.jpg',
  };

  static propTypes = {
    abroadData: PropTypes.object,
    qudao_details: PropTypes.string.isRequired,
    h2title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    btnSubmitTitle: PropTypes.string.isRequired,
    class1: PropTypes.string,
    class2: PropTypes.string,
    class3: PropTypes.string,
    class4: PropTypes.string,
    queryBtnTitle: PropTypes.string.isRequired,
    bgColor: PropTypes.node,
    children: PropTypes.element,
    childrens: PropTypes.element,
    bgImg: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      errorTips: '',
      setClose: false,
    };
  }

  resetErrorTips() {
    setTimeout(() => {
      this.setState({
        errorTips: '',
      });
    }, 2000);
  }

  submitAbroad(evt) {
    evt.preventDefault();
    const { abroadData, qudao_details } = this.props;
    const mobile = this.refs.inputMobileYuyue.value;
    if (!regx.MOBILE_REG.test(mobile)) {
      this.setState({
        errorTips: '手机号码错误',
      });
      this.resetErrorTips();
      return;
    }
    abroadData.mobile = mobile;
    abroadData.qudao_details = qudao_details; //  eslint-disable-line
    abroadData.xifenqudao = 'SEM';
    fetch('/api/abroadPlan', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(abroadData),
    }).then(res => res.json())
      .then(data => {
        if (data.code) {
          this.setState({
            errorTips: '网络异常请稍后再试！',
          });
          this.resetErrorTips();
        } else {
          this.setState({
            errorTips: '',
            setClose: true,
          });
          $('#successModal').on('hidden.bs.modal', () => {
            this.setState({ setClose: false });
          });
          $('#successModal').modal('show');
        }
      });
  }

  render() {
    const showHide0 = showHideModel[this.props.class1];
    const showHide1 = showHideModel[this.props.class2];
    const showHide2 = showHideModel[this.props.class3];
    const showHide3 = showHideModel[this.props.class4];
    const bgImg = `url(${this.props.bgImg}) no-repeat center top`;
    return (
      <div>
        <div className="rel1920 botform-Conable" style={{ background: bgImg }}>
          {this.props.bgColor}
          <div className="rel1100">
            <div className="botform">
              <h2>{this.props.h2title}</h2>
              {this.props.children}
              {this.props.childrens}
              <div className={`botform-title ${showHide2}`}>{this.props.subTitle}</div>
              <div className={`botform-desc-btn ${showHide0}`}>
                <input type="text" placeholder="手机号码" name="mobile" className="mobile" ref="inputMobileYuyue" />
                <a href="javascript:void(0)" className="famousService" onClick={evt => this.submitAbroad(evt)}>{this.props.btnSubmitTitle}</a>
              </div>
              <div className="err-tips">{this.state.errorTips}</div>
              <div className={`queybtn ${showHide1}`}><Live800 classes={'live800 live8001 redbtn'} title={this.props.queryBtnTitle} type={'a'} tips={this.props.queryBtnTitle} /></div>
            </div>
          </div>
        </div>
        <div className={`footer-list ${showHide3}`}>
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

module.exports = BotFormData;
