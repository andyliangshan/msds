/* eslint-disable max-len */
import path from 'path';

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const debug = __DEV__;

export const rootPath = path.normalize(`${__dirname}/..`);  //  ./

export const cookieSession = {
  expire: 7 * 24 * 3600 * 1000, // 7天,
  cookieSecret: 'msds-sempc-cookie',
  sessionSecret: 'msds-sempc-session',
};
export const redis = {
  host: '127.0.0.1',
  port: 6379,
  db: 0,
};
