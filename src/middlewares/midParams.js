/**
 * Created by noodles on 2017/5/2.
 * description
 */

import _ from 'lodash';

const midParams = async (req, res, next) => {
  try {
    _.extend(res.locals, {
      __DEV__: __DEV__, //  eslint-disable-line
      title: '',
      description: '',
      keywords: '',
    });
    next();
  } catch (err) {
    next();
  }
};

export default {
  midParams,
};
