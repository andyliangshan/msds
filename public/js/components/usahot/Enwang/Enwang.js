/* eslint global-require: 0 */
require('./Enwang.less');
const React = require('react');

const Live800 = require('../../../components/Live800');

const EnwangData = require('../Enwang/EnwangData.json');

class Enwang extends React.Component {
  render() {
    return (
      <div className="qu">
        <div className="qu-what">
          <h3 className="repeat">你是否为准备出国的孩子担心这些？</h3>
          <div className="w-text">
            <ul className="w-left">
              {EnwangData.whatLData.map((item) => {
                return (
                  <li key={Math.random()}>
                    <img src={item.img} alt="" />
                    <Live800 classes={'live800'} title={item.title} type={'a'} tips={'question'} />
                  </li>
                );
              })}
            </ul>
            <ul className="w-right">
              {EnwangData.whatRData.map((item) => {
                return (
                  <li key={Math.random()}>
                    <img src={item.img} alt="" />
                    <Live800 classes={'live800'} title={item.title} type={'a'} tips={'question'} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="qu-result">
          <h3 className="repeat">没有妥善处理这些有哪些后果？</h3>
          <div className="w-text">
            <ul className="w-left w-138">
              {EnwangData.resultLData.map((item) => {
                return (
                  <li key={Math.random()}>
                    <img src={item.img} alt="" />
                    <Live800 classes={'live800'} title={item.title} type={'a'} tips={'question'} />
                  </li>
                );
              })}
            </ul>
            <ul className="w-right">
              {EnwangData.resultRData.map((item) => {
                return (
                  <li key={Math.random()}>
                    <img src={item.img} alt="" />
                    <Live800 classes={'live800'} title={item.title} type={'a'} tips={'question'} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Enwang;
