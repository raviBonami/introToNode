
const people = ["ABC","XYZ","JKL","MNO"]
const num = [1,2,5,6,9,7]
console.log(people)

// Export items - 
// module.exports = people

// Export multiple items = 
module.exports = {
    people: people,
    num: num
}