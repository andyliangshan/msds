module.exports = {
  bannerTest: {
    country: [
      { id: '901', name: '美国' },
      { id: '902', name: '英国' },
      { id: '903', name: '加拿大' },
      { id: '904', name: '澳大利亚' },
      { id: '905', name: '香港' },
      { id: '906', name: '韩国' },
      { id: '907', name: '日本' },
      { id: '908', name: '新加坡' },
      { id: '909', name: '新西兰' },
      { id: '9010', name: '德国' },
      { id: '9011', name: '法国' },
      { id: '9012', name: '意大利' },
      { id: '9013', name: '荷兰' },
      { id: '9014', name: '澳门' },
      { id: '9015', name: '爱尔兰' },
      { id: '9016', name: '马来西亚' },
      { id: '9017', name: '西班牙' },
      { id: '9018', name: '俄罗斯' },
      { id: '9019', name: '丹麦' },
      { id: '9020', name: '奥地利' },
      { id: '9021', name: '挪威' },
      { id: '9022', name: '瑞士' },
      { id: '9023', name: '比利时' },
      { id: '9024', name: '其他国家' },
    ],
    project: [
      { id: '11', name: '中学' },
      { id: '12', name: '本科' },
      { id: '13', name: '硕士' },
      { id: '14', name: '博士' },
      { id: '15', name: '语言课' },
      { id: '16', name: '签证' },
    ],
  },
  nav: {
    table: [
      { id: '21', name: '排名', ref: 'rank' },
      { id: '22', name: '录取条件', ref: 'admis' },
      { id: '23', name: '成功案例', ref: 'case' },
      { id: '24', name: '热门专业推荐', ref: 'recomend' },
      { id: '25', name: '顺顺优势', ref: 'advantage' },
    ],
    university: [
      { id: '31', name: '香港大学', url: '/hk/v1/fam/hku', logo: 'hku.png' },
      { id: '32', name: '香港科技大学', url: '/hk/v1/fam/hkust', logo: 'hkust.png' },
      { id: '33', name: '香港中文大学', url: '/hk/v1/fam/cuhk', logo: 'cuhk.png' },
      { id: '34', name: '香港城市大学', url: '/hk/v1/fam/cityu', logo: 'cityu.png' },
      { id: '35', name: '香港理工大学', url: '/hk/v1/fam/polyu', logo: 'polyu.png' },
      { id: '36', name: '香港浸会大学', url: '/hk/v1/fam/hkbu', logo: 'hkbu.png' },
      { id: '37', name: '香港岭南大学', url: '/hk/v1/fam/lingnan', logo: 'lingnan.png' },
      { id: '38', name: '香港教育学院', url: '/hk/v1/fam/eduhk', logo: 'eduhk.png' },
    ],
  },
  rankInfo: {
    hku: {
      name: '香港大学',
      ranks: [
        {
          id: '41',
          type: 'QS World  UniversityRanking',
          ranking: '26',
        },
        {
          id: '42',
          type: 'Times World  UniversityRanking',
          ranking: '43',
        },
        {
          id: '43',
          type: 'Asian UniversityRanking',
          ranking: '2',
        },
      ],
    },
    hkust: {
      name: '香港科技大学',
      ranks: [
        {
          id: '44',
          type: 'QS World  UniversityRanking',
          ranking: '30',
        },
        {
          id: '45',
          type: 'Times World  UniversityRanking',
          ranking: '49',
        },
        {
          id: '46',
          type: 'Asian UniversityRanking',
          ranking: '4',
        },
      ],
    },
    cuhk: {
      name: '香港中文大学',
      ranks: [
        {
          id: '47',
          type: 'QS World  UniversityRanking',
          ranking: '46',
        },
        {
          id: '48',
          type: 'Times World  UniversityRanking',
          ranking: '76',
        },
        {
          id: '211',
          type: 'Asian UniversityRanking',
          ranking: '8',
        },
      ],
    },
    cityu: {
      name: '香港城市大学',
      ranks: [
        {
          id: '410',
          type: 'QS World  UniversityRanking',
          ranking: '49',
        },
        {
          id: '412',
          type: 'Times World  UniversityRanking',
          ranking: '119',
        },
        {
          id: '413',
          type: 'Asian UniversityRanking',
          ranking: '26',
        },
      ],
    },
    polyu: {
      name: '香港理工大学',
      ranks: [
        {
          id: '414',
          type: 'QS World  UniversityRanking',
          ranking: '95',
        },
        {
          id: '415',
          type: 'Times World  UniversityRanking',
          ranking: '192',
        },
        {
          id: '416',
          type: 'Asian UniversityRanking',
          ranking: '29',
        },
      ],
    },
    hkbu: {
      name: '香港浸会大学',
      ranks: [
        {
          id: '417',
          type: 'QS World  UniversityRanking',
          ranking: '299',
        },
        {
          id: '418',
          type: 'Times World  UniversityRanking',
          ranking: '351',
        },
        {
          id: '419',
          type: 'Asian UniversityRanking',
          ranking: '64',
        },
      ],
    },
    lingnan: {
      name: '香港岭南大学',
      ranks: [
        {
          id: '420',
          type: 'QS World  UniversityRanking',
          ranking: '551',
        },
        {
          id: '421',
          type: 'Times World  UniversityRanking',
          ranking: '',
        },
        {
          id: '422',
          type: 'Asian UniversityRanking',
          ranking: '109',
        },
      ],
    },
    eduhk: {
      name: '香港教育学院',
      ranks: [
        {
          id: '423',
          type: 'QS World  UniversityRanking',
          ranking: '',
        },
        {
          id: '424',
          type: 'Times World  UniversityRanking',
          ranking: '',
        },
        {
          id: '425',
          type: 'Asian UniversityRanking',
          ranking: '',
        },
      ],
    },
  },
  condition: {
    hku: {
      name: '香港大学',
      program1: '香港大学的授课型硕士（TPG）<span class="ps">是以课程作业为基础</span>的学位课程，从1年到4年不等，接受全日制和兼职申请人',
      program2: '香港大学提供研究型研究生（RPg）学位，即哲学硕士（MPhil）以及3年制和4年制哲学博士（PhD）',
      master: [
        '本科毕业时可获得国内认可的本科毕业证和学士学位证',
        '雅思成绩不低于6.5及以上或新托福80分以上，(部分商科专业要求GMAT成绩，部分工科雅思要求是6，单项不低于5.5)',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '国家高考一本录取线以上最少60分左右',
        '优秀的英语单科成绩，一般是不低于130(单科总分150)，90(单科总分100)',
        '雅思成绩6分及以上(其中写作、口语不低于6;听力阅读不低于5.5)',
        '根据高考成绩和英语成绩进行英语面试',
      ],
    },
    hkust: {
      name: '香港科技大学',
      program1: '研究生（TPG）教育是香港科技大学学术规定结构的重要组成部分，其考虑了大学的研究优势和资源配置，以及当前社区和市场需求',
      program2: '香港科技大学提供研哲学硕士（MPhil）和哲学博士（PhD）学位，除了编写研究论文外，还完成课程作业。 MPhil论文报告工作是一个重要课题',
      master: [
        '毕业时可获得国内认可的本科毕业证及学位证',
        '托福成绩80分或以上雅思成绩6.5分或以上(各单项成绩不低于5.5分)',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '毕业时可获得国内认可的本科毕业证及学位证',
        '托福成绩80分或以上雅思成绩6.5分或以上(各单项成绩不低于5.5分)',
        '成绩单',
        '申请文书',
      ],
    },
    cuhk: {
      name: '香港中文大学',
      program1: '98%学生选择授课型研究生（TPG），其通常为1-2年学制，以修读学分的形式完成学院开设的专业课程，毕业需要完成论文',
      program2: '研究型，通常2-3年，以助教的身份攻读部分专业课程，协助研究院完成项目研究，同时应学院要求承担一部分本科教学任务，对研究能力和学生背景要求较高',
      master: [
        '本科毕业时可获得国内认可的本科毕业证和学士学位证',
        '托福成绩80分或以上;雅思成绩6.5分或以上，不再承认六级英语成绩',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '国家统一高考成绩一本分数线以上',
        '学生在本校英语面试合格',
      ],
    },
    cityu: {
      name: '香港城市大学',
      program1: '98%学生选择授课型研究生（TPG），其通常为1-2年学制，以修读学分的形式完成学院开设的专业课程，毕业需要完成论文',
      program2: '研究型，通常2-3年，以助教的身份攻读部分专业课程，协助研究院完成项目研究，同时应学院要求承担一部分本科教学任务，对研究能力和学生背景要求较高',
      master: [
        '毕业时可获得国内认可的本科毕业证及学位证',
        '托福成绩80分或以上雅思成绩6.5分或以上(各单项成绩不低于5.5分)',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '国家统一高考成绩一本分数线以上',
        '学生在本校英语面试合格',
      ],
    },
    polyu: {
      name: '香港理工大学',
      program1: '98%学生选择授课型研究生（TPG），其通常为1-2年学制，以修读学分的形式完成学院开设的专业课程，毕业需要完成论文',
      program2: '研究型，通常2-3年，以助教的身份攻读部分专业课程，协助研究院完成项目研究，同时应学院要求承担一部分本科教学任务，对研究能力和学生背景要求较高',
      master: [
        '本科毕业时可获得国内认可的本科毕业证和学士学位证',
        '托福成绩80分或以上，雅思成绩6.5分及以上',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '国家统一高考成绩一本分数线以上',
        '雅思成绩6分及以上',
        '学生在本校英语面试合格',
      ],
    },
    hkbu: {
      name: '香港浸会大学',
      program1: '98%学生选择授课型研究生（TPG），其通常为1-2年学制，以修读学分的形式完成学院开设的专业课程，毕业需要完成论文',
      program2: '研究型，通常2-3年，以助教的身份攻读部分专业课程，协助研究院完成项目研究，同时应学院要求承担一部分本科教学任务，奖学金可供学术优秀学生使用',
      master: [
        '本科毕业时可获得国内认可的本科毕业证和学士学位证',
        '托福成绩80分或以上，雅思成绩6.5分及以上',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '国家统一高考成绩一本分数线以上',
        '雅思成绩6分及以上',
        '学生在本校英语面试合格',
      ],
    },
    lingnan: {
      name: '香港岭南大学',
      program1: '98%学生选择授课型研究生（TPG），其通常为1-2年学制，以修读学分的形式完成学院开设的专业课程，毕业需要完成论文   ',
      program2: '研究型，通常2-3年，以助教的身份攻读部分专业课程，协助研究院完成项目研究，同时应学院要求承担一部分本科教学任务，对研究能力和学生背景要求较高 ',
      master: [
        '一批、二批认可本科毕业本科毕业证和学士学位证（或其它同等学历）',
        '托福成绩80分或以上，雅思成绩6.5分及以上',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '国家统一高考成绩一本分数线左右',
        '学生在本校英语面试合格',
      ],
    },
    eduhk: {
      name: '香港教育学院',
      program1: '98%学生选择授课型研究生（TPG），其通常为1-2年学制，以修读学分的形式完成学院开设的专业课程，毕业需要完成论文',
      program2: '研究型，通常2-3年，以助教的身份攻读部分专业课程，协助研究院完成项目研究，同时应学院要求承担一部分本科教学任务，对研究能力和学生背景要求较高',
      master: [
        '一批、二批认可本科毕业本科毕业证和学士学位证（或其它同等学历）',
        '托福成绩80分或以上，雅思成绩6.5分及以上',
        '成绩单',
        '申请文书',
      ],
      undergrade: [
        '国家统一高考成绩一本分数线左右',
        '学生在本校英语面试合格',
      ],
    },
  },
};
