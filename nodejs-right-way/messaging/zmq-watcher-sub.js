'use strict';

const
  zmq = require('zmq'),

  subscriber = zmq.socket('sub');

subscriber.subscribe(""); // receive all message!

// handle `message` event from publisher
subscriber.on('message', (data) => {
  let
    message = JSON.parse(data),
    date = new Date(message.timestamp);
  console.log(`File ${message.file} changed at ${date}`);
});

// connect to publisher
subscriber.connect('tcp://localhost:3000', () => {
  console.log('Subscribing localhost:3000');
});
