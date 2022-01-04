const path = require('path');

const router = require('koa-router')();


function addRoutes(router, routes) {
    routes.forEach(r => {
        console.log(`process \t${r[0]} \t${r[1]}`)
        router[r[0]](r[1], r[2]);
    })
}

let enableRoutes = [
    require('./routes/hello'),
];
enableRoutes.forEach(routes => addRoutes(router, routes));

module.exports = (dir) => {
    return router.routes();
};
