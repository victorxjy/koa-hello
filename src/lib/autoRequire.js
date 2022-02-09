const fs = require('fs');
const path = require('path');


/**
 * scan dirs and require the modules as a array
 * @date 2022-01-11
 * @param {string} root
 * @param {string} dir
 * @returns {Object[]}
 */
class autoRequire {
    constructor(root, dir) {
        this.results = {};
        this.pathBuffer = [];
        this.key = '';
        return autoRequireFun.call(this, root, dir);
    }
}
function autoRequireFun(root, dir) {
    let dirPath = path.resolve(root, dir);
    let files = fs.readdirSync(dirPath);
    for (const f of files) {
        let fPath = path.resolve(dirPath, f);
        let stat = fs.lstatSync(fPath);
        if (stat.isDirectory()) {
            this.pathBuffer.push(f)
            autoRequireFun.call(this, dirPath, f);
        } else if (f.endsWith('.js')) {
            try {
                this.pathBuffer.push(f.slice(0, -3));
                let key = this.pathBuffer.join('/');
                this.results[key] = require(fPath);
                this.pathBuffer = [];
            } catch (error) {
                console.log('\u{1F641} auto-require fail:', error)
                continue;
            }
        }
    }
    return this.results;
}
module.exports = autoRequire;
