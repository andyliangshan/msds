/* eslint global-require: 0 import/no-dynamic-require: 0 */
require('./AbroadNatrue.less');

const React = require('react');

const PropTypes = React.PropTypes;

const Yuyue = require('../../Yuyue/Yuyue');
const dataJson = require('./dataJson');

class AbroadNatrue extends React.Component {

  static defaultProps = {
    title: '答题时，请选择孩子“最自然的、最真实的”反应，而不是思考“最应该的”',
    mainTitle: '十秒钟测试留学性格',
  };

  /**
   * @type {{title, mainTitle: string}}
   * title： modal title
   * mainTitle: main title
   */
  static propTypes = {
    title: PropTypes.string,
    mainTitle: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      flag: false,
      r1Checked: false,
    };
  }

  submitGetSexValue(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const name1 = $('[name="ques1"]:checked').val();
    const name2 = $('[name="ques2"]:checked').val();
    const constValue = (name1 + name2);
    if ((!name1) || (!name2)) {
      alert('选项不为空,请选择!');
      return false;
    }
    $('#quetionlist').modal('hide');
    $('#resultTab').modal('show');
    const $v1 = $('.resultcon-title span');
    const $v2 = $('.resultcon-title em');
    const $v3 = $('.alisysic-desc');
    $v1.empty();
    $v2.empty();
    $v3.empty();
    dataJson.map((item) => {
      const selectId = item.selectId;
      if (selectId.indexOf(constValue) !== -1) {
        $v1.html(item.style);
        $v2.html(item.styleDesc);
        $v3.html(item.styleInfo);
      }
    });
    return false;
  }

  hideClickModal(evt) {
    evt.preventDefault();
    $('#resultTab').modal('hide');
  }


  render() {
    return (
      <div>
        <div className="modal fade" id="quetionlist" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="close" data-dismiss="modal"><span>&times;</span></div>
                <h3 className="modal-mantitle">{this.props.mainTitle}</h3>
                <h4 className="modal-title"><em>*</em><span>{this.props.title}</span></h4>
              </div>
              <div className="modal-body clearfix">
                <div className="ques">
                  <div className="ques-title">1. 孩子对周围环境的感受：</div>
                  <div className="ques-keys">
                    <label htmlFor="ques1-id"><input type="radio" id="ques1-id" name="ques1" value="A" />喜欢热闹的环境，活泼好动，人越多越兴奋，善于结交朋友</label>
                    <label htmlFor="ques2-id"><input type="radio" id="ques2-id" name="ques1" value="B" />喜欢安静、独处，不愿意凑热闹</label>
                    <label htmlFor="ques3-id"><input type="radio" id="ques3-id" name="ques1" value="C" />对环境的掌控力比较强，能够迅速适应环境，并主导周围的人</label>
                    <label htmlFor="ques4-id"><input type="radio" id="ques4-id" name="ques1" value="D" />比较安静、随和，不愿意与人发生冲突，人际关系很好，不喜欢显露自己</label>
                  </div>
                </div>
                <div className="ques">
                  <div className="ques-title">2. 孩子在面对任务的时候：</div>
                  <div className="ques-keys">
                    <label htmlFor="ques5-id"><input type="radio" id="ques5-id" name="ques2" defaultValue="A" />经常拖到最后一刻才完成任务</label>
                    <label htmlFor="ques6-id"><input type="radio" id="ques6-id" name="ques2" defaultValue="B" />计划性极强，每件事都按照计划一步步完成</label>
                    <label htmlFor="ques7-id"><input type="radio" id="ques7-id" name="ques2" defaultValue="C" />一拿到任务，只要认为值得做，第一时间就完成，行动果断迅速</label>
                    <label htmlFor="ques8-id"><input type="radio" id="ques8-id" name="ques2" defaultValue="D" />善于从容面对压力，不急不慢，很少出现焦急、烦躁的情绪</label>
                  </div>
                </div>
                <div className="submitBtn"><a href="javascript:void(0)" onClick={(evt) => this.submitGetSexValue(evt)}>查看结果</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="resultTab" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="close" data-dismiss="modal"><span>&times;</span></div>
              </div>
              <div className="modal-body clearfix">
                <div className="resultcon">
                  <div className="resultcon-title"><span>&nbsp;</span><em>&nbsp;</em></div>
                  <div className="resultcon-alisysic">
                    <div className="alisysic-title">留学性格解析</div>
                    <div className="alisysic-desc">&nbsp;</div>
                  </div>
                  <div className="xinren">感谢您对顺顺的信任，我们想<em>免费送孩子一次全面的留学评估</em>，请您务必收下我们的一份心意</div>
                </div>
                <div className="submitBtn">
                  <div className="recive" onClick={evt => this.hideClickModal(evt)}><Yuyue qudao_details={'SEM/美国V3中学页PC_1/性格测试/顺顺重要客户预约表'} btnTitle={'接受'} submitBtn={'提交'} wrapModalTitle={'顺顺重要客户预约表'} /></div>
                  <a href="javascript:void(0)" className="nocase" onClick={evt => this.hideClickModal(evt)}>拒绝</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = AbroadNatrue;

