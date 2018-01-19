/* eslint global-require: 0 */
require('./Banner.less');

const React = require('react');

const PropTypes = React.PropTypes;

class Banner extends React.Component {

  /**
   * @type {{bg: *, local: *}}
   * bg: banner背景图片
   * childrens：自定义banner上显示的内容
   */
  static propTypes = {
    bg: PropTypes.string.isRequired,
    childrens: PropTypes.element.isRequired,
  };

  render() {
    const bgImg = `url(${this.props.bg}) no-repeat center top`;
    return (
      <div className="warpbanner" style={{ background: bgImg }}>
        {this.props.childrens}
      </div>
    );
  }
}

module.exports = Banner;
