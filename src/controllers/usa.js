
import { Router } from 'express';

const router = new Router();

router.get('/hot/home', async (req, res, next) => {
  try {
    res.render('usa/hotCollegeList', {
      title: '美国热门院校首页',
    });
  } catch (err) {
    next(err);
  }
});

// 美国留学中介机构
router.get('/agent/', async (req, res, next) => {
  try {
    res.render('usa/usaAgent', {
      title: '美国留学中介机构',
    });
  } catch (err) {
    next(err);
  }
});

// 美国院校排名 usa/version3/schoolranking_2/
router.get('/version3/schoolranking_2/', async (req, res, next) => {
  try {
    res.render('usa/schoolranking_2', {
      title: '美国大学最新排名',
    });
  } catch (err) {
    next(err);
  }
});

// 美国院校排名 usa/version4/schoolranking/
router.get('/version4/schoolranking/', async (req, res, next) => {
  try {
    res.render('usa/schoolrankingV4', {
      title: '美国大学最新排名',
    });
  } catch (err) {
    next(err);
  }
});

// 美国version3_1中学 usa/version3/midschool_1
router.get('/version3/midschool_1/', async (req, res, next) => {
  try {
    res.render('usa/midschoolV1', {
      title: '美国中学',
    });
  } catch (err) {
    next(err);
  }
});
// 美国version4_1中学 usa/version4/midschool
router.get('/version4/midschool/', async (req, res, next) => {
  try {
    res.render('usa/usaMiddleV4', {
      title: '美国中学',
    });
  } catch (err) {
    next(err);
  }
});

// 美国version4_1中学 usa/version4/midschool_1
router.get('/version4/midschool_1/', async (req, res, next) => {
  try {
    res.render('usa/usaVersion4_1', {
      title: '美国中学',
    });
  } catch (err) {
    next(err);
  }
});

// 美国热门专业 usa/version3/major
router.get('/version3/major/', async (req, res, next) => {
  try {
    res.render('usa/usaMajor', {
      title: '美国热门专业',
    });
  } catch (err) {
    next(err);
  }
});

// 美国本科 usa/version3/undergraduate
router.get('/version3/undergraduate/', async (req, res, next) => {
  try {
    res.render('usa/undergraduateV3', {
      title: '美国本科',
    });
  } catch (err) {
    next(err);
  }
});

// 美国V4-聚合页 usa/version4/home
router.get('/version4/home/', async (req, res, next) => {
  try {
    res.render('usa/usaVersion4', {
      title: '美国留学新手必读',
    });
  } catch (err) {
    next(err);
  }
});

// 美国V4-聚合页 usa/version4/home
router.get('/version4/home_1/', async (req, res, next) => {
  try {
    res.render('usa/usaVersion4Home1', {
      title: '美国留学新手必读',
    });
  } catch (err) {
    next(err);
  }
});

// 名校招生官巡回评审会 usa/zhaosg/
router.get('/zhaosg/', async (req, res, next) => {
  try {
    res.render('usa/usaZhaosg', {
      title: '名校招生官巡回评审会',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
