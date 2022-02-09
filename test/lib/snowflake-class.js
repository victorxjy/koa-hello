const Snowflake = require('../../src/lib/snowflake');
const assert = require('assert');


module.exports = {
    '#test snowflake \'s\' ID to be /^\\d{16}$/ number': () => {
        let snowflake = new Snowflake(1);
        let id = snowflake.generate();
        assert.equal(typeof id, 'number');
        assert.match(id + '', /^\d{16}$/);
        assert.notEqual(id, snowflake.generate());
    },
    '#test snowflake \'ms\' ID to be /^\\d{19}$/ string': () => {
        let snowflake = new Snowflake(1, undefined, 'ms', 10, 12);
        let id = snowflake.generate();
        assert.equal(typeof id, 'string');
        assert.match(id, /^\d{19}$/);
        assert.notEqual(id, snowflake.generate());
    }
};
