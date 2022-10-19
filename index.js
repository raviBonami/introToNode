
const http  = require('http')

// Global = global object and other diff b/w global and browser
// console.log(global)  = returns the global object (similar to browser)

// Node's own methods - same as browser
// setTimeout(() => {
//     console.log("in timeout")
//     clearInterval(id)
// },3000)

// const id = setInterval(() => {
//     console.log('In the interval')
// },1000)


// console.log(__dirname)  => Gives absolute path of the current directory
// console.log(__filename) => Gives absolute path of the current file


// console.log(document.querySelector) => Will give error as document object is not available to us in Node, it is only
// available in browser

////////////////////////////////////////////////////////////////////

// Modules and Require - 
const items = require('./people') 
// Node looks for file people and executes it

// How to access - make whichever thing you want from different filea as module.exports
// Whatever is required here will then take the value of the thing that was exported
const newPeople = items.people;
console.log(newPeople)
const newNum = items.num;
console.log(newNum)

/////////

const os = require('os')
console.log(os)




// create a server object:  
// http.createServer((request,response) => {
//     response.writeHead(200, {'Content-Type': 'text/html'})
//     response.write("Hello World");   //write a response to the client
//     response.write(request.url)
//     response.end();          //end the response
// }).listen(8000);         //the server object listens on port 8000


// Splitting the query - 


// http.createServer((request,response) => {
//     response.writeHead(200, {'Content-Type': 'text/html'})
//     // let q = url.parse(req.url, true).query;
//     // let text = q.year + " " + q.
//     response.write("Hello World");
//     response.write(request.url)
//     response.end();
// }).listen(8000);
