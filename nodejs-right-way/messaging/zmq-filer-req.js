'use strict';

const
  zmq = require('zmq'),
  filename = process.argv[2],

  REQ = zmq.socket('req'); // request endpoint

REQ.on('message', (data) => {
  let response = JSON.parse(data);
  console.log('response: ' + JSON.stringify(response));
});

REQ.connect('tcp://127.0.0.1:3001');

console.log('Sending request for ' + filename);
REQ.send(JSON.stringify({
  path: filename  
}));
