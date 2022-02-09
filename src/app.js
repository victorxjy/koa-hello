const Koa = require('koa');
const koabody = require('koa-body');
const logger = require('koa-logger');

const router = require('./route');
const { restify } = require('./restful');
const { restPrefix } = require('../config');
console.log("🚀 ~ file: app.js ~ line 8 ~ restPrefix", restPrefix)

const NODE_ENV = process.env.NODE_ENV;
console.log('enviroment:', NODE_ENV);

let app = new Koa();
app.use(koabody());
NODE_ENV !== 'test' && app.use(logger());
app.use(restify(restPrefix));
app.use(router());

module.exports = app;