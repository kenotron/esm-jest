//import * as bar from 'anotherRoot/bar';
const bar = require('anotherRoot/bar');

function addBar(y) { 
    // ESM:
    return bar.default() + y; 
}

//export default addBar;
module.exports.default = addBar;
