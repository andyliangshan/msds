/* eslint no-underscore-dangle: 0 */
require('./CommonModal.less');
require('../../../libs/bootstrap/js/modal');

const React = require('react');
const ReactOverLays = require('react-overlays');

const Modal = ReactOverLays.Modal;
const PropTypes = React.PropTypes;

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5,
};

class CommonModal extends React.Component {

  static defaultProps = {
    isTitle: true,
    isFooter: true,
    title: 'title',
    callStateFunc: () => null,
  };

  /**
   * @type {{title, id: string}}
   * id: modal id
   * title： modal title
   * btnTitle: button show title
   * isTitle: if modal title
   * isFooter: if modal footer
   */
  static propTypes = {
    title: PropTypes.string,
    btnTitle: PropTypes.string,
    isTitle: PropTypes.bool,
    isFooter: PropTypes.bool,
    children: PropTypes.node,
    btnclasses: PropTypes.string,
    modalclasses: PropTypes.string,
    //    父容器通知modal关闭 true -> 关闭
    setClose: PropTypes.bool,  // eslint-disable-line
    //  父容器直接控制modal 显示和隐藏， true -> 显示， false -> 隐藏
    selfshow: PropTypes.bool,  // eslint-disable-line
    callStateFunc: PropTypes.func,  //  通知父容器 改变setClose 或者selfShow 状态， 用于多个modal场景
  };

  constructor() {
    super();
    this.state = {
      showModal: false,
      validateMsg: '',
    };
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setClose) {
      this.setState({ showModal: false });
    }
    if (!nextProps.setClose && nextProps.selfshow) {
      this.setState({ showModal: true });
    }
  }

  close() {
    this.setState({ showModal: false });
    this.props.callStateFunc('close');
  }

  open() {
    this.setState({ showModal: true });
    this.props.callStateFunc('open');
  }

  render() {
    return (
      <div className="static-modal">
        <div className={this.props.btnclasses} onClick={() => this.open()}>
          {this.props.btnTitle}
        </div>
        <Modal
          aria-labelledby="modal-label"
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.state.showModal}
          onHide={() => this.close()}
          className={this.props.modalclasses}
          backdropClassName="backdrop-class"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {this.props.isTitle && (<div className="modal-header">
                <div className="close" onClick={() => this.close()}><span>&times;</span></div>
                <h4 className="modal-title">{this.props.title}</h4>
              </div>)}
              <div className="modal-body clearfix">
                {this.props.children}
                <CommonModal />
              </div>
              {this.props.isFooter && (<div className="modal-footer">
                <div data-dismiss="modal" onClick={() => this.close()}>
                  Cancel
                </div>
                <button type="button" className="btn btn-default">提交</button>
              </div>)}
            </div>
          </div>
        </Modal>
      </div>);
  }
}

module.exports = CommonModal;
