const React = require('react');
const Live800 = require('../../../components/Live800/Live800');

const PropTypes = React.PropTypes;

class SchoolRank extends React.Component {

  static propTypes = {
    schools: PropTypes.object,
    title: PropTypes.node,
  };
  render() {
    const { schools, title } = this.props;
    return (
      <div className="rank wd1000" id="rank">
        { title }
        <div className="school clearfix">
          <div className="lodge fl">
            <div className="school-title">
              <h4>全美私立<strong>寄宿</strong>中学排名</h4>
            </div>
            <ul className="school-list">
              {
                schools.lodge.map((item, index) =>
                  <li className={index === (schools.lodge.length) ? '' : 'noborder'} key={item.id}>
                    <div className="fl rank-num">{ index + 1 }</div>
                    <div className="fl school-name">
                      <div className="c-name"><strong>{ item.c_name }</strong></div>
                      <div className="e-name">{ item.e_name }</div>
                    </div>
                    <div className="fl test-admit" data-toggle="modal" data-target="#middleV4">测录取率</div>
                    <Live800 classes={'fl live800 school-live'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
                  </li>,
                )
              }
            </ul>
            <div className="live800-wraper">
              <Live800 classes={'live800 middlev4-live'} title={'咨询更多排名'} type={'a'} tips={'咨询更多排名'} />
            </div>
          </div>
          <div className="zoudu fr">
            <div className="school-title">
              <h4>全美私立<strong>走读</strong>中学排名</h4>
            </div>
            <ul className="school-list">
              {
                schools.zoudu.map((item, index) =>
                  <li className={index === (schools.lodge.length) ? '' : 'noborder'} key={item.id}>
                    <div className="fl rank-num">{ index + 1 }</div>
                    <div className="fl school-name">
                      <div className="c-name"><strong>{ item.c_name }</strong></div>
                      <div className="e-name">{ item.e_name }</div>
                    </div>
                    <div className="fl test-admit" data-toggle="modal" data-target="#middleV4">测录取率</div>
                    <Live800 classes={'fl live800 school-live'} title={'咨询详情'} type={'a'} tips={'咨询详情'} />
                  </li>,
                )
              }
            </ul>
            <div className="live800-wraper">
              <Live800 classes={'live800 middlev4-live'} title={'咨询更多排名'} type={'a'} tips={'咨询更多排名'} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = SchoolRank;
