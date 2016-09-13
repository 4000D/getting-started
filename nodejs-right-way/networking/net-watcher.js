// 'use strict';

const

  fs = require('fs'),
  net = require('net'),

  filename = process.argv[2],

  server = net.createServer( connection => {
    // callback function fires when subscriber is connected
    
    // Report
    console.log('subscriber connected!');
    // connection.write(`Now watching ${filename} for changes....\n`);
    connection.write(JSON.stringify({
      type: 'watching',
      file: filename
    }) + '\n');

    // watcher setup
    let watcher = fs.watch(filename, () => {
      // connection.write(`${filename} changed: ${Date.now()}\n`);
      connection.write(JSON.stringify({
        type: 'changed' ,
        file: filename,
        timestamp: Date.now()
      }) + '\n');
    });

    // watcher cleanup
    connection.on('close', () => {
      console.log('subscriber disconnected!');
      watcher.close();
    });
  });


if(!filename)
  throw Error('No target filename specified');

let port = 3000;
server.listen(port, () => { // TCP, port 5432
// server.listen('/tmp/watcher.sock', () => { // Unix Socket
  console.log(`Server is listening for subscriber on port ${port}`);
});
