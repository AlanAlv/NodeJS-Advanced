const { createReadStream, createWriteStream} = require('fs');
const { PassThrough, Duplex } = require('stream');

const readStream = createReadStream('./powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4');

const report = new PassThrough();

class Throttle extends Duplex {
    constructor(ms){
        super();
        this.delay = ms;
    }

    
}

let total= 0;
report.on('data', chunk => {
    total += chunk.length;
    console.log('bytes: ', total);
})
readStream.pipe(report).pipe(writeStream).on('error', console.error);
/* const writeStream = createWriteStream('./copy.mp4', 
    { highWaterMark: 100000});

readStream.on('data', (chunk => {
     const result = writeStream.write(chunk);
     if(!result){
        console.log('backpressure');
        readStream.pause();
     }
}));


readStream.on('end', () => {
    writeStream.end();
})

readStream.on('error', error => {
    console.log(`An error ocurred ${error}`);
})

writeStream.on('drain', () => {
    console.log('drained');
    readStream.resume();
})

writeStream.on('close', () => {
    process.stdout.write('file copied')
}) */