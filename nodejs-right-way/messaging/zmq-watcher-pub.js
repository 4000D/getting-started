'use strict';

const 
  fs = require('fs'),
  zmq = require('zmq'),

  publisher = zmq.socket('pub'),

  filename = process.argv[2];

fs.watch(filename, () => {
  
  // send message to subscriber
  publisher.send(JSON.stringify({
    type: 'changed',
    file: filename,
    timestamp: Date.now()
  }));
});

publisher.bind('tcp://*:3000', (err) => {
  console.log('Listening for zmq subscriber.... on port 3000');
});
