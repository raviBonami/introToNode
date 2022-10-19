
// console.log(process)
// const readlineModule = require('readline');
import readlineModule from 'readline';
import http from 'http'
// Process is an object which allows us to get info related to processes, like process ID, architecture, platform, version
// release, uptime etc.
// It can also be used to create a process , set uid, set processes etc

// Only one process is present in one node js script
// process.argv => gives access to arguments passed to our script
// node <filename> <param1>     => argv will contain param1

// process.stdout - for outputting in console
// process.stdin - for taking input from console
// process.stderr - gives error description

// const fs = require('fs')
// fs.createReadStream(__filename).pipe(process.stdout) => prints our script in console

readlineModule.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// const stdin = process.openStdin();
// stdin.resume();

// stdin.on('data', (keydata) => {
//     process.stdout.write('output : ' + keydata)
// })


const createServerCallback = (request,response) => {
    response.write("Hello");
    response.end();
}

const server = http.createServer(createServerCallback);

const listenServerCallback = () => {
    console.log("Listening on port 8000 ...")
}

server.listen(8000,"localhost",listenServerCallback)

process.stdin.on('keypress', (character, key) => {
    // console.log(character)
    // console.log(key)    // output : { sequence: '\x03', name: 'c', ctrl: true, meta: false, shift: false }

    // When both - 
    // output : 
    // { sequence: '\x03', name: 'c', ctrl: true, meta: false, shift: false }
    if(key.name === 'd' && key.ctrl){
        console.log("Closing server ...")
        server.close();
        process.exit();
    }
  })



// Dependencies of Node JS - 
// 1. V8 - The V8 library provides Node.js with a JavaScript engine,
//  which Node.js controls via the V8 C++ API. V8 is maintained by Google, for use in Chrome.

// 2. libuv - Another important dependency is libuv, a C library that is used to abstract 
//  non-blocking I/O operations to a consistent interface across all supported platforms. 
// It provides mechanisms to handle file system, DNS, network, child processes, pipes, 
// signal handling, polling and streaming. It also includes a thread pool for offloading work 
// for some things that can't be done asynchronously at the operating system level.

// 3. llhttp - HTTP parsing is handled by a lightweight TypeScript and C library called llhttp. 
// It is designed to not make any syscalls or allocations, so it has a very small per-request memory footprint.

// 4. c-ares - For some asynchronous DNS requests, Node.js uses a C library called c-ares. 
// It is exposed through the DNS module in JavaScript as the resolve() family of functions. 
// The lookup() function, which is what the rest of core uses, makes use of threaded getaddrinfo(3) 
// calls in libuv. The reason for this is that c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, 
// but not things like mDNS.

// 5. OpenSSL - OpenSSL is used extensively in both the tls and crypto modules. 
// It provides battle-tested implementations of many cryptographic functions that the modern web relies on for security.

// 6. zlib - For fast compression and decompression, Node.js relies on the industry-standard zlib library, 
// also known for its use in gzip and libpng. Node.js uses zlib to create sync, async and 
// streaming compression and decompression interfaces.





