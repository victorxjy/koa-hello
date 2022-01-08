const Koa = require('koa');
const koabody = require('koa-body');
const logger = require('koa-logger');

const router = require('./route');

const NODE_ENV = process.env.NODE_ENV;
console.log('enviroment:', NODE_ENV);

let app = new Koa();
app.use(koabody());
NODE_ENV !== 'test' && app.use(logger());
app.use(router());

module.exports = app;