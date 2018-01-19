// c          | { 'x-real-ip': '106.38.227.27',
// 0|pc       |   host: '127.0.0.1:3000',
// 0|pc       |   connection: 'close',
// 0|pc       |   'user-agent': 'z1-qiniu-imgstg-spider-1.0',
// 0|pc       |   'accept-encoding': 'gzip',
// 0|pc       |   'x-qiniu-src-host': 'cdn.lp.liuxue.com',
// 0|pc       |   'x-reqid': '4X8AAF62LOEsMrkU',
// 0|pc       |   'x-trace': '2a5e872d18a90e33/aff25c3a03348db9/7653420e92a0e49|0' }
/* eslint-disable */
const filterQiniu = async (req, res, next) => {
  try {
    const x_from_cdn = req.headers['x-from-cdn'];
    const x_tencent_ua = req.headers['x-tencent-ua'];

    const originUA = req.headers['user-agent'];
    console.log(req.originalUrl);
    //  对七牛静态资源 回源 时 区分UA信息 转发到对应3008 端口的ie8 进程
    if (x_from_cdn === 'QCloud' &&  x_tencent_ua === 'Qcloud') {
      if (originUA.indexOf('MSIE 8.0')) {
        const path = req.originalUrl;
        return res.redirect('http://101.200.163.125:3008/' + path);
      }
    }
    next();
  } catch (err) {
    next();
  }
};

export default {
  filterQiniu,
};
