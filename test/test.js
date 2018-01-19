/* eslint-disable */
const fs = require('fs');

class PromiseA {
  constructor(executor) {
    this.queue = [];
    this.state = 'pending';
    this.promise = executor();
  }

  then(fulfilled, rejected) {
    fulfilled();
  }

}

//
// const readfile = () => new Promise((resovle, reject) => {
// });

/**
 * Promise
 * 1. 构造函数接收 一个函数，这个函数包含了 异步操作的主要代码
 */

const readfile = function (options) {
  return new PromiseA(function (resolve, reject) {
    fs.readFile('./setup.js', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};


readfile().then(function(data) {
  console.log(data);
}, function(err) {
  console.log(err);
})
