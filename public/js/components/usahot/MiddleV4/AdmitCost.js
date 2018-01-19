const React = require('react');
const Live800 = require('../../../components/Live800/Live800');
const Yuyue = require('../../../components/Yuyue/Yuyue2');
// const YuyueDIY = require('../../../components/Yuyue/YuyueDIY');

class AdmitCost extends React.Component {

  render() {
    return (
      <div className="admit-cost wd1000" id="admitCost">
        <div className="title-top"></div>
        <div className="title">
          <h3>
            <span className="first">录取公式和费用介绍</span>
          </h3>
        </div>
        <ul className="list">
          <li className="admit clearfix">
            <div className="left fl">
              <div className="img-label">
                <img src={`${__CDN__}/public/img/usaAllPic/middleV4/admit.png`} alt="" />
                <Live800 classes={'live800 ac-live'} title={''} type={'a'} tips={''} />
              </div>
              <div className="img-title">录取公式</div>
            </div>
            <div className="right fl">
              <h4>经常有中国家长会问被美国名校录取的公式是什么？</h4>
              <p>顶尖大学录取学生是全方位综合的招生评审方式，主要从学术(成绩、推荐信)、个性品行、课外活动三块综合来看</p>
              <p>当然面对全球顶尖的申请者，优秀成绩仅是进入名校的最低门槛，招生评审委员们会更加着重课外活动，看学生之前经历了些什么</p>
              <ul className="ability-list">
                <li className="clearfix">
                  <div className="fl ability-name clearfix"><a>•</a>学术能力：</div>
                  <div className="fl ability-desc">知道孩子的学术兴趣（学生喜欢在课外无限制花时间钻研的方面）在哪儿？但是这里的学术成绩不等于学科兴趣，即使是打游戏也可以打出花样</div>
                </li>
                <li className="clearfix">
                  <div className="fl ability-name clearfix"><a>•</a>课外活动：</div>
                  <div className="fl ability-desc">新三样——支教、机器人、非洲动物保护；老三样——模联、种树、敬老院</div>
                </li>
                <li className="clearfix">
                  <div className="fl ability-name clearfix"><a>•</a>品行和思维：</div>
                  <div className="fl ability-desc">文书素材中，不要让孩子去编，一定让孩子有挫折有体会有责任感</div>
                </li>
              </ul>
              {/* <Live800 classes={'live800 middlev4-live'} title={'预约招生官评审'} type={'a'} tips={'预约招生官评审'} /> */}
              <Yuyue qudao_details={'SEM/美国V4中学PC/录取公式/预约招生官'} btnTitle={'预约招生官评审'} wrapModalTitle={'预约招生官'} btnClass="middlev4-live" submitBtn={'提交'} />
              {/* <YuyueDIY qudao_details={'SEM/美国V4中学PC/录取公式/预约招生官'} btnTitle={'预约招生官评审'} wrapModalTitle={'预约招生官'} btnClass="middlev4-live" submitBtn={'提交'} /> */}
            </div>
          </li>
          <li className="clearfix">
            <div className="left fl">
              <div className="img-label">
                <img src={`${__CDN__}/public/img/usaAllPic/middleV4/cost.png`} alt="" />
                <Live800 classes={'live800 ac-live'} title={''} type={'a'} tips={''} />
              </div>
              <div className="img-title">中学费用</div>
            </div>
            <div className="right fl">
              <h4>去美国读中学，建议家庭每年至少准备30万人民币</h4>
              <div className="cost-info">
                <div className="info-name">留学前期费：</div>
                <div className="info-desc">主要是托福考试费、送分费、培训费等，多在1-5万人民币之间</div>
              </div>
              <div className="cost-info">
                <div className="info-name">学费：</div>
                <div className="info-desc">走读中学一年约20万人民币</div>
                <div className="info-desc">寄宿中学至少25万人民币一年</div>
              </div>
              <div className="cost-info">
                <div className="info-name">生活费：</div>
                <div className="info-desc">美国大城市约4000-10000人民币/月</div>
                <div className="info-desc">南部、较偏远的州，约2000-4000人民币/月</div>
              </div>
              <Live800 classes={'live800 middlev4-live'} title={'咨询详细费用'} type={'a'} tips={'咨询详细费用'} />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

module.exports = AdmitCost;
