

// A callback is a function called at the completion of a given task; this prevents any blocking, and allows other code to be run in the meantime.

/**
 function processData (callback) {
  fetchData(function (err, data) {
    if (err) {
      console.log("An error has occurred. Abort everything!");
      return callback(err);
    }
    data += 1;
    callback(data);
  });
}
 */

// The first parameter of the callback is the error value. If the function hits an error, 
// then they typically call the callback with the first parameter being an Error object. 
// If it cleanly exits, then they will call the callback with the first parameter being null and the rest being the return value(s)

// Blocking - 
// Blocking is when the execution of additional JavaScript in the Node.js process must wait until a non-JavaScript operation completes. 
// This happens because the event loop is unable to continue running JavaScript while a blocking operation is occurring

// All of the I/O methods in the Node.js standard library provide asynchronous versions, which are non-blocking, and accept callback functions

// Comparing code - 
// Blocking methods execute synchronously and non-blocking methods execute asynchronously.


// Async code - 
// const fs = require('fs');
// fs.readFile('/file.md', (err, data) => {
//   if (err) throw err;
// });

// Same code in sync - 
// const fs = require('fs');
// const data = fs.readFileSync('/file.md'); // blocks here until file is read

// In the synchronous version if an error is thrown it will need to be caught or the process will crash. 
// In the asynchronous version, it is up to the author to decide whether an error should throw as shown

///////////////////////////////////////////

// Concurrency and Throughput - 
// JavaScript execution in Node.js is single threaded, so concurrency refers to the event loop's 
// capacity to execute JavaScript callback functions after completing other work

//////////////////////////////////////////////////////


// Processes vs Threads - 
// Processes - Top level execution container
// Seperate memory space
// Communicate via inter-Process communication (IPC)

// Threads - 
// Runs inside a process
// Shared memory space
// Plethora of communication options, runtime dependent

// Node JS is single threaded* - excpet when its not

// All JS, V8 and event loop run in one thread, called the main thread
// Node JS also has C++ in it,
// C++ backed Synchronous methods run in the main thread
// But C++ bakced asynchronous methods sometimes don't run in the 
// main thread

// Node JS uses a pre-allocated set of threads called the Thread Pool.
// The default is 4.

// C++ backed methods use C++ asynchronous primitives whenever possible

///////////////////////////////////////////////////////////////////

// All work is done in Node JS Process - 
// This procss has a single thread called main thread and 
// it contains the Event Loop
// Along with these, node js process also has libuv library

// Inside event loop - All the application code that is inside callback
// functions (non-top-level code) is executed here


// Some part of process which is intensive may be off-loaded
// to the Thread Pool (4 threads are present in thread pool)
// Node JS is build around callback functions
// It has event-driven architecture - events are emitted, event
// loop picks them up, callbacks are called
// Event loop  does orchestration

// Order - 
// As soon as we start our application, event loop starts running
// An event loop has multiple phases and each phase has a callback 
// queue 
// These queues store the callbacks received during processes
// running in that phase

// 1st phase - It takes care of callbacks of Expired timers  
// setTimeout(() => {
//      console.log("Expired timer")
// })
// If there are callback functions from timers that have expired, these
// are first one to be executed
// If some timer gets expired while event loop is in some other phase, then
// this callback will be executed after event loop comes back to
// this phase

// So, callbacks present in each phase's queue are executed and then
// only the event loop moves to the next phase

// 2nd Phase - Handles callbacks from I/O polling and there callbacks
// Mainly networking and file reading/writing

// 3rd phase - setImmeadiate callbacks - 

