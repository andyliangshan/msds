/* eslint global-require: 0 */
const React = require('react');
const Link = require('react-router').Link;
const Footer = require('../../components/Footer');
const Header = require('../../components/Header');
const Banner = require('../../components/Banner');
const Activity = require('../../components/usahot/Activity');
const Live800 = require('../../components/Live800');
const Xuanxiao = require('../../components/Xuanxiao');
const AbroadForm = require('../../components/AbroadForm');
const SuccessModal = require('../../components/SuccessModal');
const Yuyue = require('../../components/Yuyue');
const PageInterModals = require('../../components/PageInterModals');

const collegeData = require('./college.json');
const C = require('../../core/conf');

class CollegeDetail extends React.Component {

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  fetchData(ids) {
    let d = { results: [] };
    $.ajax({
      type: 'POST',
      url: '/api/cache',
      data: {
        api: 'https://crpapi.shunshunliuxue.com/offers/list/',
        query: { offer_id__in: ids },
        cache: { time: __DEV__ ? 60 : C.globalCacheTime },
      },
      dataType: 'json',
      async: false,
      success: data => {
        d = data;
      },
    });
    return d;
  }

  showOfferImg(evt) {
    const offerSrc = $(evt.currentTarget).data('img');
    this.refs.offerImageModal.src = offerSrc;
  }

  render() {
    const pageData = collegeData[this.props.params.name || 'nyu']; //  eslint-disable-line
    const { title, bannerimg, rank, money, major, about, cases } = pageData;

    document.title = title;

    const ids = pageData.cases.block.join(',');
    const casesApi = this.fetchData(ids);

    const pathName = this.props.params.name;  //  eslint-disable-line
    const pl400 = { paddingLeft: (pathName === 'duke' || pathName === 'purdue' || pathName === 'pitt' || pathName === 'uc') ? '400px' : '' };


    const bannerChildren = (<div className="rel1100 banner-title" style={pl400}>
      <h4>去{bannerimg.title}留学</h4>
      <h3>首选顺顺</h3>
      <p className="banner-text">
        <img src={require('../../../img/usa-hot/right.png')} width="30px" height="30px" alt="" />独家资料提高录取率
        <img src={require('../../../img/usa-hot/right.png')} width="30px" height="30px" alt="" />招生官带队模拟面试
        <img src={require('../../../img/usa-hot/right.png')} width="30px" height="30px" alt="" />不满意闪电退款</p>
      <div className="querybtn">
        <Xuanxiao className="querybtn" qudao_details={'SEM/美国热门院校-nyuPC/banner/测试选校'} />
        <Live800 classes={'live800 live8001'} title={'立即咨询'} type={'a'} tips={'院校首页banner'} />
      </div>
    </div>);

    return (
      <div>
        <Header />
        <Banner bg={__CDN__ + bannerimg.image} childrens={bannerChildren} />
        <Activity />
        <div className="rel1100 clearfix">
          <div className="rel1100-left">
            <div className="college-rank">
              <div className="college-rank-title clearfix">
                <span><img src={require('../../../img/usa-hot/flag.png')} alt="" /></span>
                <h2>{rank.title}</h2>
              </div>
              <ul className="college-rank-list list-unstyled clearfix">
                {rank.block.slice(0, 3).map((item, idx) => {
                  return (
                    <li className={idx === 2 && 'no-margin'} key={Math.random()}>
                      <img src={__CDN__ + item.image} alt="" />
                      <div className="profession-name">
                        <h3><small>#</small>{item.number}</h3>
                        <p className="tow-line">{item.title}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <ul className="college-rank-list list-unstyled clearfix">
                {rank.block.slice(3).map((item, idx) => {
                  return (
                    <li className={idx === 2 && 'no-margin'} key={Math.random()}>
                      <img src={__CDN__ + item.image} alt="" />
                      <div className="profession-name">
                        <h3><small>#</small>{item.number}</h3>
                        <p className="tow-line">{item.title}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="two-button college-rank-button">
                <p className="po"><a href="http://zt.shunshunliuxue.cn/usa/version3/schoolranking_1/">查看更多排名</a></p>
                <p><Live800 classes={'live800 live8001'} title={'咨询院校顾问'} type={'a'} tips={'咨询院校顾问'} /></p>
              </div>
            </div>
            <div className="college-fee college-rank">
              <div className="college-fee-title clearfix">
                <span><img src={require('../../../img/usa-hot/money.png')} alt="" /></span>
                <h2>{money.title}</h2>
              </div>
              <ul className="college-fee-list college-rank-list list-unstyled clearfix">
                {money.block.map((item, idx) => {
                  return (
                    <li className={idx === 2 && 'no-margin'} key={Math.random()}>
                      <img src={__CDN__ + item.image} alt="" />
                      <div className="profession-name">
                        <p className="tow-line">{item.title}</p>
                        <h3 style={{ fontSize: money.title === '加州大学费用' ? '20px' : '22px' }}><small>$</small>{item.number} </h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="two-button college-rank-button">
                <p className="po"><Live800 classes={'live800 live8001'} title={'了解更多费用'} type={'a'} tips={'了解更多费用'} /></p>
                <p><Live800 classes={'live800 live8001'} title={'咨询费用专员'} type={'a'} tips={'咨询费用专员'} /></p>
              </div>
            </div>
            <div className="college-profession college-rank">
              <div className="college-profession-title college-rank-title clearfix">
                <span><img src={require('../../../img/usa-hot/fire.png')} alt="" /></span>
                <h2>{major.title}</h2>
              </div>
              <ul className="college-rank-list college-profession-list list-unstyled clearfix">
                {major.block.map((item, idx) => {
                  return (
                    <li className={idx === 2 && 'no-margin'} key={Math.random()}>
                      <img src={__CDN__ + item.image} alt="" />
                      <div className="profession-name">
                        <p className="first-show">{item.title}</p>
                        <p className="first-hide"><Live800 classes={'live800 live8001'} title={'了解详情'} type={'a'} tips={'院校首页banner'} /></p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="two-button college-rank-button">
                <p className="po"><Live800 classes={'live800 live8001'} title={'获取专业内部资料'} type={'a'} tips={'院校首页banner'} /></p>
                <p><Live800 classes={'live800 live8001'} title={'咨询择业顾问'} type={'a'} tips={'院校首页banner'} /></p>
              </div>
            </div>
          </div>
          <div className="rel1100-right">
            <div className="related-search">
              <h2>相关搜索大学</h2>
              <span className="mid-time-titlecolor"></span>
              <ul className="related-search-list list-unstyled clearfix">
                {about.block.map(item => {
                  return (
                    <li key={Math.random()}><Link to={item.link} target="_blank">{item.title} &gt;&gt;</Link></li>
                  );
                })}
                <li><Link to="/" target="_blank">查看全部热门院校  &gt;&gt;</Link></li>
              </ul>
            </div>
            <div className="latest-admission">
              <h2>{cases.title}</h2>
              {casesApi.results.map((offer) => {
                return (
                  <div className="latest-admission-list" key={Math.random()}>
                    <div className="latest-admission-top">
                      <div className="latest-admission-title clearfix">
                        <img src={offer.badge.image} alt="" />
                        <div className="latest-admission-text">
                          <h3>{offer.chinese_name}</h3>
                          <p className="text-over-ellipsis">{offer.major || offer.major_type}&nbsp;&nbsp;{offer.degree || offer.project}</p>
                          <p className="eye-icon" data-toggle="modal" data-target="#offer-image"
                             onClick={evt => this.showOfferImg(evt)} data-img={offer.offer_image ? offer.offer_image.image : `${__CDN__}/public/img/offer.png`}>
                            <span><img src={require('../../../img/usa-hot/usaProfession/eye-icon.png')} alt="" /></span>
                            查看offer</p>
                        </div>
                      </div>
                      <div className="offer-introduction clearfix">
                        <div className="offer-introduction-left">
                          <h3>背景</h3>
                          <p>{offer.school_name}</p>
                          <p>{offer.project}</p>
                          <p>{offer.offer_major}</p>
                        </div>
                        <div className="offer-introduction-right">
                          <h3>成绩</h3>
                          {offer.exams.map(exam => {
                            return (<p key={Math.random()}>{exam.exam_type}：{exam.score}</p>);
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="semicircle">
                      <div className="left-circle"></div>
                      <div className="dotted-line"></div>
                      <div className="right-circle"></div>
                    </div>
                    <div className="latest-admission-bottom clearfix">
                      <div className="consultant-name clearfix">
                        <img src={offer.advisor.avatar} alt="" />
                        <h3>{offer.advisor.user_name}</h3>
                      </div>
                      <div className="admission-two-button">
                        <Yuyue qudao_details={'SEM/美国热门院校-nyuPC/案例/预约老师'} btnTitle={'预约老师'} />
                        <p className="two-button-yuyue"><Live800 classes={'live800 live8001'} title={'在线咨询'} type={'a'} tips={'院校首页banner'} /></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="two-button college-rank-button">
              <p><Live800 classes={'live800 live8001'} title={'了解更多案例'} type={'a'} tips={'了解更多案例'} /></p>
            </div>
          </div>
        </div>
        <AbroadForm apply_contry={'美国'} qudao_details={'SEM/美国热门院校-nyuPC/底部/获得申请方案'} />
        <Footer qudao_details={'SEM/美国热门院校-nyuPC/底部/在线预约'} />
        <SuccessModal />
        <PageInterModals circle={2} time1={10000} time2={10000} time3={10000} time4={23000} />
        <div className="modal fade" id="offer-image">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <img src="" alt="" ref="offerImageModal" width="100%" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = CollegeDetail;
