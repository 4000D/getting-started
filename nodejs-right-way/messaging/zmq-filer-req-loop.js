'use strict';

const
  zmq = require('zmq'),
  filename = process.argv[2],

  REQ = zmq.socket('req'); // request endpoint

REQ.on('message', (data) => {
  let response = JSON.parse(data);
  console.log('Received response: ' + JSON.stringify(response));
});

REQ.connect('tcp://127.0.0.1:5555');
for (let i=0; i<3; i++) {
  console.log('Sending request for ' + filename);
  REQ.send(JSON.stringify({
    path: filename  
  }));
}
