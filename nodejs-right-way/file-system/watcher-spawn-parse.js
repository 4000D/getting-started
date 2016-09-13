const
  fs = require('fs'),
  spawn = require('child_process').spawn,
  filename = process.argv[2];

if (!filename)
  throw Error('A file to watch must be specified!');

fs.watch(filename, () => {
  let 
    output = '',
    ls = spawn('ls', ['-lh', filename]); 
  // spanw() return `ChildProceess` Object (with stdin, stdout, stderr `Streams` properties)
  
  ls.stdout.on('data', (chunk) => {
    // `data` event occurs whenever Child process stdout stream is flushed
    // chunk is buffer refresenting binary data outside JS engine. It point to a blob of memory allocated by Node's native core 
    // Using buffer directly is faster, but not convenient
    console.log(`ls.stdout.on.data : ${chunk}`);
    output += chunk.toString();
  });

  ls.on('close', () => {
    // `ls` process emit `close` event after all stdout flushed
    console.log('ls.on.close');
    let parts = output.split(/\s+/); // `\s+` matchs any whitespace
    console.dir([parts[0], parts[4], parts[8]]);
  });
});


console.log(`Watching ${filename} for changes...`);
