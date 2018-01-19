
import { Router } from 'express';

const router = new Router();
// const urls = {
//   cases: 'https://crpapi.shunshunliuxue.com/offers/list/',  //  ?offer_id__in=541,594,740,866案例
//   caseDetail: 'https://crpapi.shunshunliuxue.com/offers/detail/',
// };

// 默认为301 到语培页面
router.get('/', async (req, res, next) => {
  try {
    res.redirect('/index.html');
  } catch (err) {
    next(err);
  }
});

//  高考后留学
router.get('/gaokaohou/', async (req, res, next) => {
  try {
    res.render('gaokaohou/index', {
      title: '高考后留学',
    });
  } catch (err) {
    next(err);
  }
});

//  语培页面路由
router.get('/index.html', async (req, res, next) => {
  try {
    res.render('other/yupei', {
      title: '托福培训_雅思培训_GRE培训_SAT培训_GMAT培训-顺顺语培',
      keywords: '顺顺语培专注于各科出国考试，全方位覆盖托福、雅思、GRE、GMAT、SAT、ACT、SSAT、小托福、AEAS、AP、A-level以及各种能力提升课程,为各阶段学生提供针对性强、提分效果好的一对一及班课课程。',
      description: '托福培训,雅思培训,GRE培,SAT培训,GMAT培训',
    });
  } catch (err) {
    next(err);
  }
});

// 费用页面V2版本
router.get('/fee/v2/', async (req, res, next) => {
  try {
    res.render('fee/v2', {
      title: '留学费用一览',
    });
  } catch (err) {
    next(err);
  }
});

// service页面V2版本
router.get('/service/v2/', async (req, res, next) => {
  try {
    res.render('service/v2', {
      title: '顺顺留学-专业·透明·高效',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
