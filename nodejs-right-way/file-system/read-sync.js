// Async File Reading

const
  fs = require('fs'),
  fileName = process.argv[2];

if(!fileName) throw Error('file name must be specified');

let data = fs.readFileSync(fileName);

console.log(`${fileName} : ${data}`);
