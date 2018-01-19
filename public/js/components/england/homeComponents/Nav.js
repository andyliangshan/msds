const React = require('react');

const PropTypes = React.PropTypes;

class Nav extends React.Component {
  static propTypes = {
    navData: PropTypes.array,
  };
  constructor() {
    super();
    this.state = {
      navIndex: 0,
    };
  }

  switchNav(index, top) {
    this.setState({
      navIndex: index,
    });
    $('html,body').animate({
      scrollTop: top,
    }, 1000);
  }
  render() {
    const { navData } = this.props;
    const { navIndex } = this.state;
    return (
      <nav className="nav-wraper">
        <ul className="nav wd1000">
          {
            navData.map((item, index) =>
              <li key={item.id} className={navIndex === index ? 'active' : ''} onClick={() => this.switchNav(index, item.top)}>{item.name}</li>,
            )
          }
        </ul>
      </nav>);
  }
}

module.exports = Nav;
