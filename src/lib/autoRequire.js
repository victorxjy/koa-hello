const fs = require('fs');
const path = require('path');

module.exports = (root, dir) => {
    try {
        return fs.readdirSync(path.resolve(root, dir))
            .filter(f => f.endsWith('.js'))
            .map(f => require(path.resolve(root, dir, f)));
    } catch (error) {
        console.log('\u{1F641} auto-require fail:', error)
        return []
    }

};
