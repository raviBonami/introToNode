

console.log("Program starts...")

setTimeout(() => {console.log("Timeout 1")},0)

setImmediate(() => {console.log("Immeadiate 1")})
setImmediate(() => {console.log("Immeadiate 2")})

setTimeout(() => {
    setTimeout(() => {console.log("Timeout 2")},0)
    setImmediate(() => {console.log("Immeadiate 3")})
},10)

Promise.resolve().then(() => {console.log("Promise 1")})
Promise.resolve().then(() => {console.log("Promise 2")})
process.nextTick(() => {console.log("Tick 1")})

function displayOne() {
    setTimeout(() => {
        console.log("Display func...")
    },10)
    
}
displayOne();
console.log("Program ends...")

// const fs=require("fs")
// import fs from 'fs';
// setImmediate(() => console.log('setImmediate'));
// fs.readFile('/test.txt', (err, data) => {
//   console.log('reading file');
//   process.nextTick(()=>{
//     console.log("next3");
//   })
// });
// console.log('start');
// process.nextTick(() => console.log('nextTick'));
// setTimeout(() => console.log('setTimeout 1'), 0);
// setTimeout(() => console.log('setTimeout 2'), 0);
// let counter = 0;
// const timeout = setInterval(() => {
//   console.log('setInterval');
//   if (counter >= 3) {
//     console.log('exiting setInterval');
//     clearInterval(timeout);
//   }
//   counter++;
// }, 0);
// process.nextTick(()=>{
//   console.log("next2");
// })
// new Promise((resolve, reject) => {
//   console.log('start promise 1');
//   resolve('Promise 1');
// }).then((data) => {
//   console.log(data);
// });
// console.log('end');








