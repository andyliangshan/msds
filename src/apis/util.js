import { Router } from 'express';
import fetch from '../core/fetch';
import agent from '../core/agent';

const router = new Router();


router.get('/', (req, res) => {
  res.json({
    name: 'abc',
  });
});

router.post('/post', (req, res) => {
  res.json({
    msg: 'ok',
  });
});

router.post('/phoneCode/', async (req, res, next) => {
  try {
    res.json({
      msg: '获取成功',
      errorcode: 0,
      timeout: 60,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/abroadPlan', async (req, res, next) => {
  const datas = req.body;
  fetch('http://cache.lp.liuxue.com/api/util/abroadPlan', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(datas),
    headers: {
      'Content-Type': 'application/json',
      referer: req.headers.referer,
      cookie: req.headers.cookie, //  string
    },
  }).then(resp => resp.json()).then(data => {
    res.json(data);
  }).catch(err => {
    next(err);
  });
});

router.post('/cache', async (req, res, next) => {
  try {
    const body = req.body;
    const data = await agent.post('http://cache.lp.shunshunliuxue.com/api/cache', body, {});
    res.json(data);
  } catch (err) {
    next(err);
  }
  // const body = req.body;
  // fetch('http://cache.lp.liuxue.com/api/cache', {
  //   method: 'post',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data);
  //     res.json(data);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});
// 请求offers数量
router.post('/offers', async (req, res, next) => {
  try {
    const data = await agent.get('https://crpapi.shunshunliuxue.com/offers/count/', {});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
