/* eslint no-underscore-dangle: 0 */
import path from 'path';
// import fs from 'fs';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import compress from 'compression';
import methodOverride from 'method-override';
import session from 'express-session';
import connectRedis from 'connect-redis';
import ejsLocals from 'ejs-locals';
import cors from 'cors';
import favicon from 'serve-favicon';
import { port, redis, cookieSession, rootPath } from './config';

import midParams from './middlewares/midParams';

const app = express();
const RedisStore = connectRedis(session);


global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
// //
// // Register Node.js middleware
// // -----------------------------------------------------------------------------
app.locals.ENV = process.env.NODE_ENV;
app.locals.ENV_DEVELOPMENT = __DEV__;
app.engine('ejs', ejsLocals);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals._layoutFile = 'layout.ejs';
app.use(favicon(`${rootPath}/build/public/favicon.ico`));
app.use(compress());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(session({
  secret: cookieSession.sessionSecret,
  store: new RedisStore({
    port: redis.port,
    host: redis.host,
    db: redis.db,
  }),
  resave: false,
  saveUninitialized: true,
  name: 'pc.sem.sid',
}));

/**
 * -------------------for cors  X-Frame-Options: Allow-From http://www.growingio.com---------------------
 */
app.all('*', (req, res, next) => {
  res.header('X-Frame-Options', 'ALLOW-FROM http://www.growingio.com');
  next();
});
app.use(cors());
//  -----------------------growingio header and cors settings end----------------------------------------


if (__DEV__) {
  app.enable('trust proxy');
}
app.use(methodOverride());

app.use(midParams.midParams);
app.use('/api', require('./apis/util').default);
app.use('/', require('./controllers/home').default);
app.use('/usa', require('./controllers/usa').default);
app.use('/en', require('./controllers/en').default);
app.use('/hk', require('./controllers/hk').default);

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  res.status(err.status || 500);
  res.send(err);
});

/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
