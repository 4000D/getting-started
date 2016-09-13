const
  fs = require('fs'),
  spawn = require('child_process').spawn,
  filename = process.argv[2];

if (!filename)
  throw Error('A file to watch must be specified!');

fs.watch(filename, () => {
  let ls = spawn('ls', ['-lh', filename]); 
  // spanw() return `ChildProceess` Object (with stdin, stdout, stderr `Streams` properties)
  
  ls.stdout.pipe(process.stdout); 
  // pipe Child process's stdout to Parent process's stdout

  console.log(`File ${filename} just changed!`);
});

console.log(`Watching ${filename} for changes...`);
