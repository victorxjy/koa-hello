const Koa = require('koa');
const koabody = require('koa-body');

const router = require('./route');

let app = new Koa();
app.use(koabody());
app.use(router());

module.exports = app;