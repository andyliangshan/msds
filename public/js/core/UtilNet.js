/**
 * 通用功能函数类
 * 目前功能
 * 1. 获取url query 参数
 * 2. 替换页面固定query链接
 */

const md5 = require('../vendor/md5');

class UtilNet {
  /**
   *
   * @param name  参数名称
   * @param url   查找的url， 默认location.href
   * @returns {*} query参数值 || null
   */
  static getUrlQueryByName = (name, url) => {
    !url && (url = window.location.href); //  eslint-disable-line
    name = name.replace(/[\[\]]/g, '\\$&'); //  eslint-disable-line
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  /**
   * 透传url utm_source参数 至 页面所有a标签
   */
  static replaceUtmSourceLink() {
    if (UtilNet.getUrlQueryByName('utm_source')) {
      $('a').each((idx, item) => {
        const itemLink = $(item).attr('href');
        if (!itemLink) return;    //  无 href 属性
        if (itemLink.indexOf('javascript:') !== -1) return;  //  href 属性 javascript:协议
        // if (itemLink.indexOf('#') !== -1) return;
        //  对于react hash路由 和 单独的 # 做区分
        if (itemLink === '#') return;

        //  百度推广参数
        const locationHref = location.href;
        const baiduQuery = locationHref.substr(locationHref.indexOf('utm_source'));
        if (itemLink.indexOf('?') === -1) {
          $(item).attr('href', itemLink + '?' + baiduQuery); //  eslint-disable-line
        } else {
          $(item).attr('href', itemLink + '&' + baiduQuery); //  eslint-disable-line
        }
      });
    }
  }

  /**
   * 生成cookie :  _pk_id，
   * 对应全局变量:  jzlvisitor_id
   */
  static generateCookiePKID() {
    /* eslint-disable */
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
          from += len;
        }
        for (; from < len; from++) {
          if (from in this && this[from] === elt) {
            return from;
          }
        }
        return -1;
      };
    }

    +(function() {
      var currDate = new Date();
      var timestamp2 = currDate.setHours(currDate.getHours() + 24);
      var host = '.liuxue.com';
      if (location.host.indexOf('shunshunliuxue.com') > -1) host = '.shunshunliuxue.com';
      else if (location.host.indexOf('shunshunliuxue.cn') > -1)  host = 'shunshunliuxue.cn';
      var cookies = 'wapSource=' + location.href + ';expires=' + new Date(timestamp2) + ';domain=' + host + ';path=/';
      document.cookie = cookies;
    })();

    if (document.cookie.indexOf('_pk_id') === -1) {
      var ua = navigator.userAgent;
      var host = '.liuxue.com';
      if (location.host.indexOf('shunshunliuxue.com') > -1) host = '.shunshunliuxue.com';
      else if (location.host.indexOf('shunshunliuxue.cn') > -1)  host = 'shunshunliuxue.cn';
      var random8 = Math.ceil(Math.random() * 100000000);
      var currDate = new Date();
      var timestamp1 = currDate.valueOf();
      var expireHour = 24;
      var timestamp2 = currDate.setHours(currDate.getHours() + 24);
      var tempid = md5(ua + host + random8) + '.' + timestamp1 + '.' + expireHour + '.' + timestamp2 + '.' + timestamp2;
      var cookies = '_pk_id=' + tempid + ';expires=' + new Date(timestamp2) + ';domain=' + host + ';path=/';
      document.cookie = cookies;
      window.jzlvisitor_id = tempid.substring(0, 16);
    } else {
      var globalCookievalue = document.cookie.split(';');
      var ll = globalCookievalue.length;
      var res = [];
      for (var i = 0; i < ll; i++) {
        var _index = globalCookievalue[i].split('=')[0];
        if (_index.indexOf('_pk_id') > -1) {
          res.push(globalCookievalue[i]);
        }
      }
      var globalValue;
      if (res.length != 0) {
        globalValue = res[0].split('=')[1];
      } else {
        globalValue = ' ';
      }
      window.jzlvisitor_id = globalValue.substring(0, 16);
    }
    /* eslint-enable */
  }
}

module.exports = UtilNet;
