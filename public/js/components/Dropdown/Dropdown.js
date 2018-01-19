require('../../../libs/bootstrap/js/dropdown');

const React = require('react');

const PropTypes = React.PropTypes;

class Dropdown extends React.Component {

  static defaultProps = {
    dropup: 'down',
    defaultSelectColor: '',
  };

  /**
   * @type {{defaultItem, items, onClick: *, classes: *}}
   * defaultItem: 默认显示的内容
   * items：显示下拉的 字符串数组
   * formKey: 资源表单对应key
   * classes：dropdown自定义类
   * dropUpDown: 下拉的朝向
   * cb: 父容器通信函数
   */
  static propTypes = {
    defaultItem: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    formKey: PropTypes.string,
    classes: PropTypes.string,
    dropUpDown: PropTypes.string,
    cb: PropTypes.func,
    defaultSelectColor: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = {
      defaultItem: props.defaultItem,
      selectedColor: '#999',
    };
  }

  itemClick = (evt) => {
    evt.preventDefault();
    const value = evt.target.innerHTML;
    this.setState({
      defaultItem: value,
      selectedColor: '#000',
    });
    this.props.cb(this.props.formKey, value);
  };

  render() {
    const { items, defaultSelectColor } = this.props;
    const initColor = defaultSelectColor || this.state.selectedColor;
    return (
      <div className={`dropdown ${this.props.classes} ${this.props.dropUpDown && 'dropup'}`}>
        <div className="div-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <p style={{ color: initColor }}>{this.state.defaultItem}</p>
          <span className="caret"></span>
        </div>
        <ul className="dropdown-menu">
          {items.map(item => {
            return (<li key={Math.random()} onClick={evt => this.itemClick(evt)}>{item}</li>);
          })}
        </ul>
      </div>);
  }
}

module.exports = Dropdown;
