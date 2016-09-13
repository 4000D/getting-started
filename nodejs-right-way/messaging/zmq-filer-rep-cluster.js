'use strict';

const 
  zmq = require('zmq'),
  fs = require('fs'),
  cluster = require('cluster'),
  
  bindUrl = 'tcp://127.0.0.1:5555',
  // ipcUrl = 'ipc:///tmp/filer/dealer';
  ipcUrl = 'ipc:///tmp/filer-dealer2.sock';


if (cluster.isMaster) {
  let
    router = zmq.socket('router').bind(bindUrl),
    dealer = zmq.socket('dealer').bind(ipcUrl);

  // forwarding
  router.on('message', function() { // can't be arrow function
    console.log('router got message. forward it to dealer');
    let frames = Array.prototype.slice.call(arguments);
    dealer.send(frames);
  });

  // forwarding
  dealer.on('message', function() { // can't be arrow function
    console.log('dealer got message. forward it to router');
    let frames = Array.prototype.slice.call(arguments);
    router.send(frames);
  });

  // report worker is online
  cluster.on('online', worker => {
    console.log(`Worker ${worker.process.pid} is online.`);
  });

  
  for(let i=0; i<3; i++) {
    cluster.fork();
  }

} else {
  // when worker process
  
  let responder = zmq.socket('rep').connect(ipcUrl);

  if (!responder) throw Error('rep is not established');

  responder.on('message', data => {
    let request = JSON.parse(data);
    console.log(`${process.pid} received request for ${request.path}`);

    fs.readFile(request.path, (err, content) => {
      if(err) console.error(err);

      console.log(`${process.pid} sending response`);
      responder.send(JSON.stringify({
        pid: process.pid,
        data: content.toString(),
        timestamp: Date.now()
      }));
    });
  });

}
