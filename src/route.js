const router = require('koa-router')();

const autoRequire = require('./lib/autoRequire');


function addRoutes(router, routes) {
    routes.forEach(r => {
        console.log(`process \t${r[0]} \t${r[1]}`)
        router[r[0]](r[1], r[2]);
    })
}


let enableRoutes = autoRequire(__dirname, 'routes');
enableRoutes.forEach(routes => addRoutes(router, routes));

module.exports = (dir) => {
    return router.routes();
};
