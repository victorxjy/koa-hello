const { mapValues } = require('lodash');

const app = require('../src/app');
const { port } = require('../config');
const autoRequire = require('../src/lib/autoRequire');

describe('#test server', async () => {
    var server;
    server = app.listen(port);
    before(() => {
        // console.log('test start~');
    });
    after((done) => {
        server.close(done);
        console.log('server close~');
    });
    mapValues(new autoRequire(__dirname, 'http'), (value) => {
        let testUnit = value(server);
        describe(`#test ${'>'.repeat(20)}`, () => {
            for (const desc in testUnit) {
                if (Object.hasOwnProperty.call(testUnit, desc)) {
                    const func = testUnit[desc];
                    it(desc, func);
                }
            }
        })
    })
})