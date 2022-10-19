
// Data files sometimes can be large, so reading-writing on them
// can be very slow
// So, we can use Streams
// Start using data before it has finished loading

// We send data in small packets called buffers
// This is how youtube works


const fs = require('fs')

const readStream = fs.createReadStream('./docs/test3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/test4.txt')
// {encoding: 'utf8'} => Makes the data chunk in UTF-8 format

readStream.on('data', (chunk) => {
    console.log('----------New Chunk-------')
    console.log(chunk)
    writeStream.write('\n New Chunk \n')
    writeStream.write(chunk)
})

// Piping - 
readStream.pipe(writeStream);
// Above line is same as code written inside readStream, 
// Pipe allows us to send (pipe) the data being received
// from readStream directly into writeStream

