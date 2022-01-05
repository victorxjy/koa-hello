const fs = require('fs');
const path = require('path');

const app = require('../src/app');
const { testPort: port } = require('../config');

describe('#test server', () => {
    let server = app.listen(port);
    before(() => { console.log('test start~') });
    after((done) => {
        server.close(done);
        console.log('test end~');
    });
    let httpDir = path.resolve(__dirname, 'http');
    fs.readdirSync(httpDir)
        .filter(f => f.endsWith('.js'))
        .forEach(f => {
            let testUnit = require(path.resolve(httpDir, f))(server);
            describe(`#test ${f}`, () => {
                for (const desc in testUnit) {
                    if (Object.hasOwnProperty.call(testUnit, desc)) {
                        const func = testUnit[desc];
                        it(desc, func);
                    }
                }
            })
        })

})