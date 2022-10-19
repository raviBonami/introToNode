
// To read and write files, fs module is used

const fs = require('fs')

// Read file
// This is synchronous code
// fs.readFile('./people.js',(err,data) => {
//     // Will fire when reading file is complete
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })

// console.log("I am running before read file") // Executed before
// read file as read file is async task

// Wrting files
fs.writeFile('./test.txt',"new content",(err,data) => {
    if(err){
        console.log(err)
    }else{
        console.log("Writing succesful")
        console.log(data);
    }
})

// if file doesn't exist, it will create it
fs.writeFile("./test2.txt","new file created",(err,data) => {
    if(err){
        console.log(err)
    }else{
        console.log("Write successful")
    }
})


/////////////////////////////////////////////

// Directories - 

// Will create a folder - but can't run it again, as this 
// folder is already created so can't create again
// fs.mkdir('./assets', (err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Folder created")
//     }
// })

// Better would be to check if folder exists or not
if(fs.existsSync('./assets')){
    console.log("Can't make more assets")
}

// To remove directory - 
// fs.rmdir("./assets",(err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("removed successfully")
//     }
// })

// Delete files
if(fs.existsSync('./test2.txt')){
    fs.unlink('./test2.txt',(err) => {
        if(err){
            console.log(err)
        }else{
            console.log("Deleted successfully")
        }
    })
}