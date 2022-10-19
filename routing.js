// add "type":"module" in package.json
import http from 'http'
import fs from 'fs'
import lodash from 'lodash'

const createServerCallback = (request, response) => {

    // lodash
    const num = lodash.random(0,20);
    console.log(num);

    response.setHeader('Content-Type', 'text/html')

    let path = './docs/views'
    switch(request.url){
        case '/':
            path += '/index.html'
            response.statusCode = 200;
            break;
           
        case '/about':
            path += '/about.html'
            response.statusCode = 200;
            break;

        case '/about-me':
            response.statusCode = 301;
            response.setHeader('Location','/about') // redirecting
            response.end();
            break;

        default:
            path += '/404.html'
            response.statusCode = 404;
            break;
    }

    fs.readFile(path,(err,data) => {
        if(err){
            console.log(err)
        }else{
            response.write(data)
        }
        response.end();
    })

    // fs.readFile('./docs/views/index.html', (err, data) => {
    //     if (err) {
    //         console.log(err)

    //     } else {

    //         response.write(data)

    //     }

    //     response.end();
    // })

}

const server = http.createServer(createServerCallback)

const serverListenCallback = () => {
    console.log("Listening for requests...")
}

server.listen(8000, 'localhost', serverListenCallback)