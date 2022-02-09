const { mapValues } = require('lodash');

const autoRequire = require('../src/lib/autoRequire');
describe('#test lib', () => {
    before(() => {
    });
    after(() => {
    });
    mapValues(new autoRequire(__dirname, 'lib'), value => {
        describe(`#test ${'>'.repeat(20)}`, () => {
            for (const desc in value) {
                if (Object.hasOwnProperty.call(value, desc)) {
                    const func = value[desc];
                    it(desc, func);
                }
            }
        })
    })
})