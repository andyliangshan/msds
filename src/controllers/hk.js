/**
 * Created by andy on 17/8/28.
 */
import { Router } from 'express';

const router = new Router();

// 香港研究生
router.get('/v1/master/', async (req, res, next) => {
  try {
    res.render('hk/v1/master', {
      title: '香港研究生-专业 · 高效 · 透明',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/v1/fam/:name', async (req, res, next) => {
  console.log(req.params.name);
  const name = req.params.name;
  let title = '';
  switch (name) {
    case 'hku':
      title = '香港大学';
      break;
    case 'hkust':
      title = '香港科技大学';
      break;
    case 'cuhk':
      title = '香港中文大学';
      break;
    case 'cityu':
      title = '香港城市大学';
      break;
    case 'polyu':
      title = '香港理工大学';
      break;
    case 'hkbu':
      title = '香港浸会大学';
      break;
    case 'lingnan':
      title = '香港岭南大学';
      break;
    case 'eduhk':
      title = '香港教育学院';
      break;
    default:
      title = '香港大学';
  }
  try {
    res.render('hk/v1/university', {
      title: `${title}-专业 · 高效 · 透明`,
    });
  } catch (err) {
    next(err);
  }
});

// 香港研究生 美洽
router.get('/v1/master/mq/', async (req, res, next) => {
  try {
    res.render('hk/v1/masterMeiqia', {
      title: '香港研究生-专业 · 高效 · 透明',
    });
  } catch (err) {
    next(err);
  }
});
export default router;
