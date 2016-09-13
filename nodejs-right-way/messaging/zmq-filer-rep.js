'use strict';

const
  fs = require('fs'),
  zmq = require('zmq'),

  REP = zmq.socket('rep'); // Socket to reply to client request

REP.on('message', (data) => {
  let request = JSON.parse(data);
  console.log(`request: ${request}`);

  fs.readFile(request.path, (err, content) => {
    console.log('Sending response content');
    REP.send(JSON.stringify({
      content: content,
      timestamp: Date.now(),
      pid: process.pid
    }));
  });
});

REP.bind('tcp://127.0.0.1:3001', (err) => {
  if(err) console.error(err);
  console.log('Listing for zmq REQUESTERS..');
});

process.on('SIGINT', () => {
  console.log('Shutting down..');
  REP.close();
});
