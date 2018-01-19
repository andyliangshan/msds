import request from 'superagent';

require('superagent-retry')(request);

const generateError = (err) => {
  return Object.assign(err.response ? err.response.body :
    { code: err.code }, err.response ? err.response.error :
    { status: 500 }, { raw: err });
};

const timeout = 120 * 1000;

export default {
  get: (path, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = request
      .get(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json');

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),

  put: (path, data, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = request.put(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json')
      .send(data);

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),

  post: (path, data, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = request.post(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json')
      .send(data);

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),

  del: (path, query, ip = '0.0.0') => new Promise((resolve, reject) => {
    const req = request.del(path)
      .retry(5)
      .timeout(timeout)
      .set('X-Real-IP', ip)
      .accept('application/json');

    if (query) {
      req.query(query);
    }

    req.end((err, res) => {
      if (err) {
        reject(generateError(err));
      } else {
        resolve(res.body || res);
      }
    });
  }),
};
