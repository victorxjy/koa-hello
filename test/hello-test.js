const supertest = require('supertest');
const app = require('../src/app');

describe('#test app', () => {
    let server = app.listen(9900);
    describe('#test server', () => {

        before(() => { console.log('test start~') })

        after((done) => { server.close(done); console.log('test end~') })

        it('#test welcom', async () => {
            let res = await supertest(server).get('/').expect(200, '<h1>Welcome to Koa!</h1>');
        });

        it('#test hello', async () => {
            let res = await supertest(server).get('/hello').expect(200, '<h1>Hello, world!</h1>');
        });
    })
})