/**
 * Created by '苏萧' on 2017/7/26.
 */
const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

class IntGetOffer extends React.Component {

  render() {
    return (
      <div className="botbaner">
        <Live800 classes={'live800'} title={'抓住这次机会'} type={'a'} tips={'抓住这次机会'} />
      </div>
    );
  }
}

module.exports = IntGetOffer;
