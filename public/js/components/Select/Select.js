const React = require('react');
const classnames = require('classnames');
require('./select.less');

const PropTypes = React.PropTypes;

class Select extends React.Component {

  static defaultProps = {
    itemData: [],
    defaultFirst: '美国',
    defaultSecond: '',
    name: '',
  }

  static propTypes = {
    itemData: PropTypes.array,
    defaultFirst: PropTypes.string,
    defaultSecond: PropTypes.string,
    name: PropTypes.string,
    defaultColor: PropTypes.string,
    changeSelect: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      showlist: false,
      firstIndex: 0,
      secondIndex: 0,
      firstValue: props.defaultFirst,
      secondValue: props.defaultSecond,
      changeColor: props.defaultColor,
      children: props.itemData[0].children || [],
    };
    this.isMount = true;
  }

  componentDidMount() {
    const self = this;
    self.isMount = true;
    if (this.isMount) {
      if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('click', e => self.hideList(e), false);
      } else {
        window.attachEvent('onclick', e => self.hideList(e));
      }
    }
  }

  componentWillUnmount() {
    const self = this;
    self.isMount = false;
    if (typeof window.addEventListener !== 'undefined') {
      window.removeEventListener('click', self.hideList);
    } else {
      window.detachEvent('onclick', self.hideList);
    }
  }

  showList(e) {
    e.preventDefault();
    let { showlist } = this.state;
    showlist = !showlist;
    this.setState({
      showlist,
    });
  }

  hideList(e) {
    e.preventDefault();
    const target = e.target || e.srcElement;
    const attrName = target.getAttribute('name');
    const attrClass = target.getAttribute('class');
    if ((attrName && attrName === this.props.name) || (attrClass && attrClass === 'hasC')) {
      return;
    }
    this.setState({
      showlist: false,
    });
  }

  handleSelectFirst(e, index, name) {
    const { itemData } = this.props;
    e.preventDefault();
    // if (e.target.dataset.growingTitle) return;
    this.setState({
      firstIndex: index,
      changeColor: '#000',
      firstValue: name.name || name,
    });
    if (name.children) {
      this.setState({
        children: itemData[index].children,
      });
    } else {
      this.setState({
        showlist: false,
      });
    }
    this.props.changeSelect(this.props.name, ((name.name || name) + this.state.secondValue));
  }

  handleSelectSecond(e, index, name) {
    let { firstValue } = this.state;
    e.preventDefault();
    this.setState({
      secondIndex: index,
      secondValue: name,
      showlist: false,
      changeColor: '#000',
    });
    if (firstValue === '托福、雅思、四六级') {
      firstValue = '托福';
      this.setState({
        firstValue,
      });
    }
    this.props.changeSelect(this.props.name, firstValue + name);
  }

  render() {
    const { showlist, changeColor, secondIndex, children, firstValue, secondValue } = this.state;
    const { itemData, name } = this.props;
    return (
      <div className="select fl" >
        <div className="info" style={{ color: changeColor }} data-id={name} name={name} onClick={(e) => this.showList(e)}>
          <span className="hasC">{firstValue}</span>
          <span className="hasC">&nbsp;</span>
          <span className="hasC">{secondValue}</span>
          <a className="down" onClick={(e) => this.showList(e)}></a>
        </div>
        {
          showlist && <div className="select-wraper clearfix">
            <ul className="s-father" style={{ width: children.length > 0 ? '50%' : '100%' }}>
              {
                itemData.map((item, index) =>
                  <li key={Math.random()}
                      className={classnames({ 's-fa-active': firstValue === (item.name || item) }, { hasC: children.length > 0 })}
                      onClick={(e) => this.handleSelectFirst(e, index, item)}>{item.name || item}</li>,
                )
              }
            </ul>
            {
              children.length > 0 &&
              <ul className="children">
                {
                  children.map((item, index) =>
                    <li key={Math.random()} className={secondIndex === index ? 'ch-active' : ''} onClick={(e) => this.handleSelectSecond(e, index, item)}>{item}</li>,
                  )
                }
              </ul>
            }
          </div>
        }
      </div>
    );
  }
}

module.exports = Select;
