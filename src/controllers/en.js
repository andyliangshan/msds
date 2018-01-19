
import { Router } from 'express';

const router = new Router();

// 英国新版首页
router.get('/v2/home/', async (req, res, next) => {
  try {
    res.render('en/enHome', {
      title: '英国留学网',
    });
  } catch (err) {
    next(err);
  }
});

// 英国留学中介机构
router.get('/agent/', async (req, res, next) => {
  try {
    res.render('en/enAgent', {
      title: '英国留学中介机构',
    });
  } catch (err) {
    next(err);
  }
});

// 英国中学
router.get('/v2/midschool/', async (req, res, next) => {
  try {
    res.render('en/enMiddle', {
      title: '英国中学',
    });
  } catch (err) {
    next(err);
  }
});

// 英国名校
router.get('/famschool/', async (req, res, next) => {
  try {
    res.render('en/enFamous', {
      title: '英国名校',
    });
  } catch (err) {
    next(err);
  }
});

// 英国商科
router.get('/v2/major/sk/', async (req, res, next) => {
  try {
    res.render('en/enshangke', {
      title: '英国商科申请计划',
    });
  } catch (err) {
    next(err);
  }
});

// 英国院校排名 url: /en/v2/schoolranking/
router.get('/v2/schoolranking/', async (req, res, next) => {
  try {
    res.render('en/schoolranking', {
      title: '英国院校排名',
    });
  } catch (err) {
    next(err);
  }
});
export default router;
