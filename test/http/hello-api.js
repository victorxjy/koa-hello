const supertest = require('supertest');

module.exports = (server) => {
    return {
        '#test get /': async () => {
            let res = await supertest(server).get('/').expect(200, '<h1>Welcome to Koa!</h1>');
        },
        '#test get /hello': async () => {
            let res = await supertest(server).get('/hello').expect(200, '<h1>Hello, world!</h1>');
        }
    }
};
