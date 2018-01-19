const React = require('react');
const Live800 = require('../../../components/Live800/Live800');
require('../../../../libs/slick-carousel/slick/slick');
require('../../../../libs/slick-carousel/slick/slick.less');
require('../../../../libs/slick-carousel/slick/slick-theme.less');

const PropTypes = React.PropTypes;

class Case extends React.Component {
  static defaultProps = {
    schoolname: '香港大学',
    offers: [],
  }
  static propTypes = {
    schoolname: PropTypes.string.isRequired,
    offers: PropTypes.array,
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    $('.case-list').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
    });
  }
  componentWillUpdate() {
    $('.case-list').slick('unslick'); // remove the added dom elements
  }
  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip({ html: true });
    $('.case-list').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
    });
  }
  componentWillUnmount() {
    $('.case-list').slick('unslick'); // remove the added dom elements
  }
  render() {
    const { schoolname, offers } = this.props;
    return (
      <div className="content-common">
        <div className="case wd1000">
          <div className="title">
            <h3>
              <span className="title-name">{schoolname}</span>
              <span className="title-desc">成功录取案例</span>
            </h3>
            <div className="title-icon">
              <img src={`${__CDN__}/public/img/hk/v1/university/icon_title.png`} alt="" />
            </div>
          </div>
          <div className="case-content">
            <div className="list-box">
              <div className="slick-box">
                <div className="case-list clearfix">
                  {offers && offers.map(item =>
                    <div key={`${item.id}case1`} className="item">
                      <div className="item-title">
                        <h4>「{item.major_detail.slice(0, 7)}」录取</h4>
                        <span className="title-line"></span>
                      </div>
                      <div className="student-info">
                        <div className="name common-mg">{item.student.name}</div>
                        <div className="score common-mg">
                          {
                            item.student.exams.length > 0 ?
                            item.student.exams.map(exam =>
                              <div key={`${exam.id}case2`}>{exam.exam_type}：{exam.score}</div>,
                            ) :
                            <div>暂无成绩</div>
                          }
                        </div>
                        <div className="basic">
                          <div>学生情况:</div>
                          {item.student.admission.student_cons && <p>{item.student.admission.student_cons.slice(0, 75)}{item.student.admission.student_cons.length >= 75 ? '...' : '' }</p>}
                          {(!item.student.admission.student_cons && item.student.admission.student_pros) && <p>{item.student.admission.student_pros}</p>}
                          {(!item.student.admission.student_cons && !item.student.admission.student_pros) && <p>暂无介绍</p>}
                        </div>
                      </div>
                      <div className="teacher-info">
                        <div className="avatar fl">
                          <img src={item.student.advops.avatar || `${__CDN__}/public/img/hk/v1/university/icon_avatar.png`} alt="" />
                        </div>
                        <div className="name fl">{item.student.advops.user_name}</div>
                        <Live800 classes={'live800 live fl'} title={'免费咨询'} type={'a'} tips={'免费咨询'} />
                      </div>
                    </div>,
                  )}
                </div>
              </div>
              {/* <div className="prev" data-slide="prev"></div>
              <div className="next" data-slide="next"></div> */}
            </div>
            <div className="live">
              <Live800 classes={'live800 live-case'} title={'咨询香港顾问'} type={'a'} tips={'咨询香港顾问'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Case;
