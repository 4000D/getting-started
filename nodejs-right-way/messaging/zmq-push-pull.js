const
  fs = require('fs'),
  zmq = require('zmq'),
  cluster = require('cluster')
  q = require('q'),

  masterPullIPC = 'ipc://master-pull.ipc',
  masterPushIPC = 'ipc://master-push.ipc',
  
  filename = process.argv[2];

if(cluster.isMaster) {
  let
    pusher = zmq.socket('push'),
    puller = zmq.socket('pull'),
    readyWorkerNum = 0,
    
    jobReady = true;
  const totalWorkerNum = 8;
  
  pusher.bind(masterPushIPC);
  puller.bind(masterPullIPC);



  puller.on('message', function(data) {
    let message = JSON.parse(data);

    console.log(`Master received message from ${message.pid} : ${data}`)

    if(message.type === 'ready') {
      if(readyWorkerNum + 1 <= totalWorkerNum) { 

        readyWorkerNum += 1;
        console.log(`process ${message.pid} is ready :: readyNum(${readyWorkerNum}) / totalNum(${totalWorkerNum})`);

        if(jobReady && readyWorkerNum == totalWorkerNum) {
          // push some works
          for (let i=0; i<totalWorkerNum; i++) {
            pusher.send(JSON.stringify({
              type: 'job',
              path: filename
            }));
          }
          jobReady = false;
        }

      }
    } else if (message.type === 'done') {
      if (readyWorkerNum > 0) {

        readyWorkerNum -= 1;
        console.log(`process ${message.pid} is ready :: readyNum(${readyWorkerNum}) / totalNum(${totalWorkerNum})`);
        console.log(`done message from process ${message.pid} : content: ${message.content}`);

        if (readyWorkerNum === 0)
          jobReady = true;

      }
    } else {
      throw Error('unrecognized message type by master');
    }
  });

  for (let i=0; i<totalWorkerNum; i++)
    cluster.fork();

} else {
  let
    pusher = zmq.socket('push'),
    puller = zmq.socket('pull');

  pusher.connect(masterPullIPC);
  puller.connect(masterPushIPC);

  console.log(`Worker ${process.pid} is ready`);

  pusher.send(JSON.stringify({
    type: 'ready',
    pid: process.pid
  }));

  puller.on('message', function(data) {
    let message = JSON.parse(data);

    console.log(`Worker ${process.pid} got message : ${data}`);

    if (message.type === 'job') {
      fs.readFile(message.path, function(err, content) {
        if(err) throw Error(err);

        q.fcall(function() {
          pusher.send(JSON.stringify({
            type: 'done',
            pid: process.pid,
            content: content
          }))
        }).then(function() {
          pusher.send(JSON.stringify({
            type: 'ready',
            pid: process.pid
          }));
        });

      });
    } else {
      throw Error('unrecognized message type by worker')
    }
  });
}
