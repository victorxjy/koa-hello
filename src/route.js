const router = require('koa-router')();
const { mapValues } = require('lodash');

const autoRequire = require('./lib/autoRequire');


function addRoutes(router, routes, routeGroup) {
    routes.forEach((r, i) => {
        routeGroup && (i === 0) ? console.log(`process ${routeGroup}`) : undefined;
        console.log(`  ${r[0].padEnd(10, '.')}${r[1]}`);
        router[r[0]](r[1], r[2]);
    })
}


let enableRoutes = new autoRequire(__dirname, 'routes');
mapValues(enableRoutes, (routes, routeGroup) => addRoutes(router, routes, routeGroup));

module.exports = (dir) => {
    return router.routes();
};
