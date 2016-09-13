
const fs = require('fs');

fs.writeFile('target.txt', 'a message', (err) => {
  if (err) throw err;

  console.log('file saved');
});
