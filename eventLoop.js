

// Event Loop - 
// The event loop is what allows Node.js to perform non-blocking I/O 
// operations — despite the fact that JavaScript is single-threaded — by 
// offloading operations to the system kernel whenever possible.

// Since most modern kernels are multi-threaded, they can 
// handle multiple operations executing in the background. 
// When one of these operations completes, the kernel tells 
// Node.js so that the appropriate callback may be added to 
// the poll queue to eventually be executed

// Working - 
// When Node.js starts, it initializes the event loop, 
// processes the provided input script which may make async API calls, 
// schedule timers, or call process.nextTick(), then begins processing the event loop.

// Timers 

// Pending callbacks 

// IdleDeadline, prepare 

// poll               <-- Incoming: connections, data etc 

// check 

// close callbacks

//// Each line above is a phase of event loop

// Each phase has a FIFO queue of callbacks to execute. While each phase 
// is special in its own way, generally, when the event loop enters a given 
// phase, it will perform any operations specific to that phase, then execute 
// callbacks in that phase's queue until the queue has been exhausted or the maximum 
// number of callbacks has executed. When the queue has been exhausted or the callback 
// limit is reached, the event loop will move to the next phase, and so on

// Phases overview - 
// 1. timers - 
// A timer specifies the threshold after which a provided callback 
// may be executed rather than the exact time a person wants it to 
// be executed. Timers callbacks will run as early as they can be 
// scheduled after the specified amount of time has passed; however, 
// Operating System scheduling or the running of other callbacks may delay them.

// For example, say you schedule a timeout to execute after a 100 ms 
// threshold, then your script starts asynchronously reading a file which takes 95 ms

// When the event loop enters the poll phase, it has an empty queue (fs.readFile() has not completed), 
// so it will wait for the number of ms remaining until the soonest timer's 
// threshold is reached. While it is waiting 95 ms pass, fs.readFile() finishes 
// reading the file and its callback which takes 10 ms to complete is added to the poll 
// queue and executed. When the callback finishes, there are no more 
// callbacks in the queue, so the event loop will see that the threshold of the 
// soonest timer has been reached then wrap back to the timers phase to execute the 
// timer's callback. In this example, you will see that the total delay between the 
// timer being scheduled and its callback being executed will be 105ms.

// 2. Pending callbacks - 
// This phase executes callbacks for some system operations such as types of TCP errors. 
// For example if a TCP socket receives ECONNREFUSED when attempting to connect, 
// some *nix systems want to wait to report the error. This will be queued to execute 
// in the pending callbacks phase.


// 3. Poll phase - 
// The poll phase has two main functions:
// 1. Calculating how long it should block and poll for I/O, then
// 2. Processing events in the poll queue

// When the event loop enters the poll phase and there are no 
// timers scheduled, one of two things will happen:
// 1. If the poll queue is not empty, the event loop will iterate 
// through its queue of callbacks executing them synchronously 
// until either the queue has been exhausted, or the system-dependent 
// hard limit is reached.

// 2. f the poll queue is empty, one of two more things will happen:
// a) If scripts have been scheduled by setImmediate(), 
// the event loop will end the poll phase and continue to the 
// check phase to execute those scheduled scripts.

// b) If scripts have not been scheduled by setImmediate(), 
// the event loop will wait for callbacks to be added to the queue, 
// then execute them immediately.

// Once the poll queue is empty the event loop will check for timers 
// whose time thresholds have been reached. If one or more timers are ready, 
// the event loop will wrap back to the timers phase to execute those timers' callbacks.

// 4. check phase - 
// This phase allows a person to execute callbacks immediately after 
// the poll phase has completed. If the poll phase becomes idle and 
// scripts have been queued with setImmediate(), the event loop may 
// continue to the check phase rather than waiting.

// setImmediate() is actually a special timer that runs in a separate 
// phase of the event loop. It uses a libuv API that schedules callbacks 
// to execute after the poll phase has completed.

// Generally, as the code is executed, the event loop will eventually 
// hit the poll phase where it will wait for an incoming connection, 
// request, etc. However, if a callback has been scheduled with setImmediate() 
// and the poll phase becomes idle, it will end and continue to the check phase 
// rather than waiting for poll events.

// 5. close callbacks - 
// If a socket or handle is closed abruptly (e.g. socket.destroy()), 
// the 'close' event will be emitted in this phase. Otherwise it 
// will be emitted via process.nextTick().


///////////////////

// setImmeadiate() vs setTimeout() - 
// setImmediate() is designed to execute a script once the current poll phase completes.
// setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.

// The order in which the timers are executed will vary depending 
// on the context in which they are called. If both are called 
// from within the main module, then timing will be bound by the 
// performance of the process 

// For example, if we run the following script which is not 
// within an I/O cycle (i.e. the main module), the order in which 
// the two timers are executed is non-deterministic, as it is bound 
// by the performance of the process

// However, if you move the two calls within an I/O cycle, 
// the immediate callback is always executed first

// The main advantage to using setImmediate() over setTimeout() is 
// setImmediate() will always be executed before any timers if scheduled 
// within an I/O cycle, independently of how many timers are present

///////////////////////

// process.nextTick() 
// You may have noticed that process.nextTick() was not displayed 
// in the diagram, even though it's a part of the asynchronous API. 
// This is because process.nextTick() is not technically part of 
// the event loop. Instead, the nextTickQueue will be processed after 
// the current operation is completed, regardless of the current phase of 
// the event loop. Here, an operation is defined as a transition from the 
// underlying C/C++ handler, and handling the JavaScript that needs to be executed

// Looking back at our diagram, any time you call process.nextTick() 
// in a given phase, all callbacks passed to process.nextTick() will be 
// resolved before the event loop continues. This can create some bad situations 
// because it allows you to "starve" your I/O by making recursive process.nextTick() 
// calls, which prevents the event loop from reaching the poll phase

// function apiCall(arg, callback) {
//     if (typeof arg !== 'string')
//       return process.nextTick(
//         callback,
//         new TypeError('argument should be string')
//       );
//   }

// The snippet does an argument check and if it's not correct, it will pass 
// the error to the callback. The API updated fairly recently to allow passing 
// arguments to process.nextTick() allowing it to take any arguments passed after 
// the callback to be propagated as the arguments to the callback so you don't have to nest functions.

// process.nextTick() vs setImmeadiate() -
// process.nextTick() fires immediately on the same phase
// setImmediate() fires on the following iteration or 'tick' of the event loop


// Why use process.nextTick() -
// There are two main reasons:

// Allow users to handle errors, cleanup any then unneeded resources, or 
// perhaps try the request again before the event loop continues.

// At times it's necessary to allow a callback to run after the 
// call stack has unwound but before the event loop continues.









