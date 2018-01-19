/**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');
const ServiceProcessZsg = require('../ServiceProcess/ServiceProcessZsg');

class IntProcess extends React.Component {

  render() {
    return (
      <div className="process">
        <ServiceProcessZsg />
      </div>
    );
  }
}

module.exports = IntProcess;
