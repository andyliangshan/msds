
/**
 * Created by noodles on 2017/4/25.
 * description
 */

require('./SuccessModal.less');

const React = require('react');

const PropTypes = React.PropTypes;

class SuccessModal extends React.Component {

  static defaultProps = {
    text: '感谢您的提交，顺顺的顾问将会立即制作您的留学规划方案，并在24小时内与您联系！',
  };

  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    return (
      <div style={{ zIndex: 8888 }} className="modal fade successModal" id="successModal" role="dialog" aria-labelledby="successModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="fork-green">
                <img className="success-icon" src={require('./icon_success.png')} alt="" />
                <img className="success-title" src={require('./title_success.png')} alt="" />
              </div>
              {/* <p>{this.props.text}</p> */}
              {/* <p>如不想等待，请直接给我们电话</p> */}
              <p className="tips">顺顺留学的<span className="red">老师24小时</span>内将会致电你，请注意接听来电</p>
              {/* <div className="phone-container">
                <span className="glyphicon glyphicon-phone-alt" aria-hidden="true"></span>
                <a className="modal-number">
                  400-104-6661
                </a>
              </div> */}
              <div className="intro">
                <div className="intro-title">
                  <h4>顺顺特色-透明、优质的服务和满意的录取</h4>
                </div>
                <ul className="intro-content clearfix">
                  <li>
                    <img src={require('./bottom1.png')} alt="" />
                    <span>透明、及时的留学信息</span>
                  </li>
                  <li>
                    <img src={require('./bottom2.png')} alt="" />
                    <span>顶尖师资、原创文书</span>
                  </li>
                  <li className="mr0">
                    <img src={require('./bottom3.png')} alt="" />
                    <span>服务细心，88.7%录取满意</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

module.exports = SuccessModal;
