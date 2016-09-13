'use strict';

const
  events = require('events'),
  util = require('util'),

  LDJClient = function(stream) {
    events.EventEmitter.call(this);

    let 
      self = this, // to store `this` 
      buffer = ''; // to buffer raw binary input. delimiter is '\n'

    stream.on('data', (data) => {
      buffer += data; // got new input! may include '\n' or not 
      let boundary = buffer.indexOf('\n');

      while (boundary !== -1) {
        let input = buffer.substr(0, boundary); // \n delimitered
        buffer = buffer.substr(boundary + 1); // reflash buffer
        this.emit('message', JSON.parse(input)); // emitt `message` event with parsed input
        boundary = buffer.indexOf('\n'); // reflash boundary
      }
    });
  };

util.inherits(LDJClient, events.EventEmitter); // class LDJClient extends events.EventEmitter

// exporting
exports.LDJClient = LDJClient;
exports.connect = function(stream) {
  return new LDJClient(stream);
}
