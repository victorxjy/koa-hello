const fs = require('fs');

const router = require('koa-router')();


function addRoutes(router, routes) {
    routes.forEach(r => {
        console.log(`process \t${r[0]} \t${r[1]}`)
        router[r[0]](r[1], r[2]);
    })
}

let enableRoutes = fs.readdirSync('./src/routes')
    .filter(f => f.endsWith('.js'))
    .map(f => require('./routes/' + f));
enableRoutes.forEach(routes => addRoutes(router, routes));

module.exports = (dir) => {
    return router.routes();
};
