// Variables - containers that store values

var name; //a declared variable, but not initialize (no value) and it's in the "global scope" (BAD)

let foo; //a declared ES 6 variable that can be changed - still no value however

const bar = "Bar"; // a declared ES 6 constant thatt cannot be changed
// '=' is the assignment operator, read it as "is assigned the value of..."

const ANSWER = 42; 

// Strings - a set of string of characters

let string1 = "Hello World!"

let string2 = "Hello Utah!"

let string3 = new String("Hello New World!") // using a String constructor

// Numbers

let myNum = 23908749287;

let myNum2 = 75.25;

"1" // is not a number! It is a string.
// "==" a loose equality check
"1" == 1; // evaluates to true because of type coercion and loose equality checking
"1" === 1; // false because this is strict equality checking

// Boolean

let myBool = false;

// need to look further into "truthy" and "falsy" values

// Arrays - hold sets of items of any data type

let myArray = [];  // this is an empty array - notice the square brackets

//ordering      0     1       2       3      4
let myArray2 = [42, "Bob", myBool, ANSWER, true]

let secondElement = myArray2[1]; // retreive the item at the 1 or second position of the array

myArray2.length; // the length roperty of an array is very handy

let lastItem = myArray2[myArray2.length - 1];

// Objects

let minObject = {}; // the most minimal object possible

let myCar = { // objects are made of properties which are key:value pairs
    make: 'Chevrolet',
    color: 'Green',
    year: '1964',
    vin: '29384732874329874'
}

myCar.numDoors = 4; // a new property can be simply added to an existing object using dot notation

const anotherObject = { // objects can contain just about anything, including arrays, other objects, etc.
    wordz: ['foo', 'bar', 'baz'],
    car: {
        make: 'McLaren',
        model: '720s'
    },
    awesomeness: true
}; 

// Functions

function myFunction() { // this is a named function definition
    return "My greeting to you is what I return to you!"; // doesn't do much. Only returns a string.
}

function sumTwoThings(thingOne, thingTwo) {
    return thingOne + thingTwo;
}

// Filter method example, filter returns an array  of all elements that 'pass the test'

const pilots = [
    {
        id: 2,
        name: "wedge Antiles",
        faction: "Rebels"
    },
    {
        Id: 8,
        name: "clena Ree",
        faction: "Empire"
    },
    {
        id: 40,
        name: "Iden Versio",
        faction: "Empire"
    },
    {
        id: 66,
        name: "Thane Kyrell",
        faction: "Rebels"
    }
];

const rebels = pilots.filter(pilot => pilot.faction === "Rebels") 

const empire = pilots.filter((pilot) => {
    return pilot.faction === 'Empire'
})

// Array helper method 'map' example

let filmURLs = [
    "https://swapi.co/api/films/",
    "https://swapi.co/api/films/5/",
    "https://swapi.co/api/films/4/this one is longer... even longer",
    "https://swapi.co/api/films/6/",
    "https: ",
    "https://swapi.co/api/films/1/"
]

const filmLengths = filmURLs.map(filmURL => filmURL.length)

const filmPlusMore = filmURLs.map(filmURL => {
    let filmObj = {
        url: filmURL,
        createdDate: Date.now()
    }
    return filmObj
})

const pilotNames = pilots.map(pilot => pilot.name) // new array just contains pilot names

// Ternary operator system: condition 7 exprIfTrue : exprIfFalse

 const swpilots = [
     {
         id: 10,
         name: "Poe Dameron",
         years: 14
     },
     {
         id: 2,
         name: "Temmin 'Snap' Wexley",
         years: 30
     },
     {
         id: 41,
         name: "Tallissan Lintra",
         years: 16,
     },
     {
         id: 99,
         name: "Ello Asty",
         years: 22
     },
 ];

 const totalYears = swpilots.reduce((acc, pilot) => acc + pilot.years, 0)

 const mostExpPilot = swpilots.reduce((oldest, pilot) => {
     return (oldest.years || 0) > pilot.years ? oldest : pilot 
 }, {})