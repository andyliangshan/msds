const React = require('react');
require('./selectTwo.less');

const PropTypes = React.PropTypes;

class SelectTwo extends React.Component {

  static defaultProps = {
    countryAll: [],
    projectAll: [],
    showSelect: false,
  }

  static propTypes = {
    countryAll: PropTypes.array,
    projectAll: PropTypes.array,
    showSelect: PropTypes.bool,
    // project: PropTypes.string,
    // country: PropTypes.string,
    selectCountry: PropTypes.func,
    selectProject: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      countryIndex: -1,
      projectIndex: 0,
    };
  }

  handleMouseOver(e) {
    e.preventDefault();
    this.setState({
      countryIndex: -1,
    });
  }

  handleSelectCountry(e, name, index) {
    e.preventDefault();
    this.setState({
      countryIndex: index,
    });
    this.props.selectCountry('country', name);
  }

  handleSelectProject(e, name) {
    e.preventDefault();
    this.props.selectProject('project', name);
  }

  render() {
    // const { countryAll, projectAll, project, showSelect } = this.props;
    const { countryAll, projectAll, showSelect } = this.props;
    const { countryIndex } = this.state;
    return (
      showSelect && <div className="select-wraper clearfix">
        <ul className="father">
          {
            countryAll.map((item, index) =>
              <li key={`${item.id}stfa`} className={countryIndex === index ? 'fa-active no-hide' : 'no-hide'} onMouseEnter={(e) => this.handleMouseOver(e)} onClick={(e) => this.handleSelectCountry(e, item.name, index)}>{item.name}</li>,
            )
          }
        </ul>
        <ul className="children">
          {
            projectAll.map((item) =>
              <li key={`${item.id}stch`} onClick={(e) => this.handleSelectProject(e, item.name)}>{item.name}</li>,
            )
          }
          {/* <li key={item.id} className={project === item.name ? 'ch-active' : ''} onClick={(e) => this.handleSelectProject(e, item.name)}>{item.name}</li>, */}
        </ul>
      </div>
    );
  }
}

module.exports = SelectTwo;
