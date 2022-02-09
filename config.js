const autoRequire = require('./src/lib/autoRequire');

let config = new autoRequire(__dirname, 'config');

module.exports = config[process.env.NODE_ENV || 'test'];
