const app = require('./app');
const { port } = require('../config');

(async () => {
    app.listen(port);
    console.log(`Koa-hello start in http://localhost:${port}`);
})()