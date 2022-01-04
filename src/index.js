const app = require('./app');
const { mainPort: port } = require('../config');


app.listen(port);
console.log(`Koa-hello start in http://localhost:${port}`);