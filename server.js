
// const http = require('http')
import http from 'http'     // add "type":"module" in package.json
import fs from 'fs'
// 2nd way - node --experimental-modules index.js
// run file as "node --experimental-modules <filename>"

// 3rd way - Install esm module
// Now run file using command "node -r esm index.js"

const createServerCallback = (request, response) => {
    response.setHeader('Content-Type','text/html') // Type of content we want
    // to send to user as response, can be text, html, picture etc

    // response.write("<p>Welcome</p>")   // sending data to user as response
    // response.write('<h1>H1 text</h1>')

        fs.readFile('./docs/views/index.html',(err,data) => {
            if(err){
                console.log(err)
                
            }else{
                
                response.write(data)
                
            }

            response.end();
        })
    
    // console.log("Request Made")
         // Ending the response, marking that the response has ended
    // response.end();
}

const server = http.createServer(createServerCallback)

const serverListenCallback = () => {
    console.log("Listening for requests...")
}

server.listen(8000, 'localhost',serverListenCallback)