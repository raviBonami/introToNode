console.log("start")

const func = async() => {
    console.log("Inside async")
    const res = await 3*3;
    console.log(res)
    console.log("after await")

}

// func();
new Promise((res,rej) => {
    console.log("Inside promise")
    console.log("Inside promise2")
    res(89)
}).then((val) => {
    console.log(val);
})

// setTimeout(() => {
//     console.log("hello")
// },0)

console.log("end")